import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [uploadError, setImageUploadError] = useState(null);
    const [upLoading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 0,
    });

    const handleImgSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = `${Date.now()}-${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }
                , (error) => {
                    reject(error);
                }
                , () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };
    const deleteImg = (index) => {
        setFormData({
            ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    }

    const handleChange = (e) => {
        if (e.target.id === 'rent' || e.target.id === 'sell') {
            setFormData({ ...formData, type: e.target.id });
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({ ...formData, [e.target.id]: e.target.checked });
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({ ...formData, [e.target.id]: e.target.value });
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

    return (
        <main className='flex justify-center items-center'>
            <div className="item md:max-w-[1200px] w-full md-auto flex flex-col">
                <div className="title text-center my-5">
                    <h1 className='md:text-3xl font-semibold uppercase'>create a listing</h1>
                </div>
                <form onSubmit={handleSubmit} className="md:flex w-full gap-5 md:space-y-0 space-y-5 p-5">
                    <div className="form-item-1 flex flex-col md:w-1/2 gap-5">
                        <div className="details flex flex-col gap-5">
                            <input onChange={handleChange} value={formData.name} className='p-3 rounded focus:outline-none' type="text" placeholder='Name' id='name' minLength={10} maxLength={60} required />
                            <textarea onChange={handleChange} value={formData.description} className='p-3 rounded focus:outline-none' placeholder='Description' id="description" required />
                            <input onChange={handleChange} value={formData.address} className='p-3 rounded focus:outline-none' type="text" placeholder='Address' id='address' required />
                        </div>
                        <div className="facilities flex flex-wrap gap-3">
                            <div className="flex gap-3">
                                <input className='w-5' onChange={handleChange} checked={formData.type === 'sell'} type="checkbox" name="sell" id="sell" />
                                <label>Sell</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' onChange={handleChange} checked={formData.type === 'rent'} type="checkbox" name="rent" id="rent" />
                                <label>Rent</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' onChange={handleChange} checked={formData.parking} type="checkbox" name="paroking spot" id="parking" />
                                <label>Parking Spot</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' onChange={handleChange} checked={formData.furnished} type="checkbox" name="furnished" id="furnished" />
                                <label>Furnished</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' onChange={handleChange} checked={formData.offer} type="checkbox" name="offer" id="offer" />
                                <label>Offer</label>
                            </div>
                        </div>
                        <div className="price-features flex flex-wrap gap-3">
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' onChange={handleChange} type="number" min={1} max={10} id="beds" value={formData.bedrooms} />
                                <label>Beds</label>
                            </div>
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' onChange={handleChange} type="number" min={1} max={10} id="baths" value={formData.bathrooms} />
                                <label>Baths</label>
                            </div>
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' onChange={handleChange} type="number" min={50} max={1000000} id="regularPrice" value={formData.regularPrice} />
                                <label>Regular Price <span>($ / Month)</span></label>
                            </div>
                            {formData.offer &&
                                <div className="flex items-center text-sm gap-3">
                                    <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' onChange={handleChange} type="number" min={0} max={1000000} id="discountedPrice"
                                        value={formData.discountedPrice} />
                                    <label>Discounted Price <span>($ / Month)</span></label>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-item-2 flex flex-col md:w-1/2 gap-8">
                        <div className="img-title flex flex-wrap">
                            Images:<span className='text-zinc-500 text-sm'>The first image will be the cover (max 6)</span>
                        </div>
                        <div className="image flex flex-wrap md:justify-between justify-center items-center gap-3">
                            <input onChange={(e) => setFiles(e.target.files)} className='border p-2 rounded ' type="file" id="images" required multiple />
                            <button onClick={handleImgSubmit} type='button' className='bg-green-500 text-white rounded p-3 uppercase'>
                                {upLoading ? 'Uploading...' : 'Upload'}
                            </button>
                            {uploadError && <p className='text-red-500'>{uploadError}</p>}
                            {formData.imageUrls.length > 0 &&
                                formData.imageUrls.map((url, index) => (
                                    <div key={index}
                                        className='flex justify-between p-3 border w-full items-center'>
                                        <img
                                            src={url}
                                            alt='listing image'
                                            className='w-20 h-20 object-cover rounded-lg'
                                        />
                                        <button onClick={() => deleteImg(index)}
                                            type='button'
                                            className='p-2 px-3 bg-red-600 text-white rounded uppercase hover:opacity-75'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <button disabled={loading || upLoading} className='bg-black text-white p-3 rounded uppercase disabled:bg-zinc-700'>
                            {loading ? 'Creating...' : 'Create Listing'}
                        </button>
                        {error && <p className='text-red-600'>{error}</p>}
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateListing
