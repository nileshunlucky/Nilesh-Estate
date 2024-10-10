import React from 'react'

const CreateListing = () => {
    return (
        <main className='flex justify-center items-center'>
            <div className="item md:max-w-[1200px] w-full md-auto flex flex-col">
                <div className="title text-center my-5">
                    <h1 className='md:text-3xl font-semibold uppercase'>create a listing</h1>
                </div>
                <form className="md:flex w-full gap-5 md:space-y-0 space-y-5 p-5">
                    <div className="form-item-1 flex flex-col md:w-1/2 gap-5">
                        <div className="details flex flex-col gap-5">
                            <input className='p-3 rounded focus:outline-none' type="text" placeholder='Name' id='name' />
                            <textarea className='p-3 rounded focus:outline-none' placeholder='Description' id="description"></textarea>
                            <input className='p-3 rounded focus:outline-none' type="text" placeholder='Address' id='address' />
                        </div>
                        <div className="facilities flex flex-wrap gap-3">
                            <div className="flex gap-3">
                                <input className='w-5' type="checkbox" name="sell" id="sell" />
                                <label>Sell</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' type="checkbox" name="rent" id="rent" />
                                <label>Rent</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' type="checkbox" name="paroking spot" id="paroking spot" />
                                <label>Parking Spot</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' type="checkbox" name="furnished" id="furnished" />
                                <label>Furnished</label>
                            </div>
                            <div className="flex gap-3">
                                <input className='w-5' type="checkbox" name="offer" id="offer" />
                                <label>Offer</label>
                            </div>
                        </div>
                        <div className="price-features flex flex-wrap gap-3">
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' type="number" minLength={1} maxLength={10} id="beds" />
                                <label>Beds</label>
                            </div>
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' type="number" minLength={1} maxLength={10} id="baths" />
                                <label>Baths</label>
                            </div>
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' type="number" minLength={1} maxLength={10} id="regularPrice" />
                                <label>Regular Price <span>($ / Month)</span></label>
                            </div>
                            <div className="flex items-center text-sm gap-3">
                                <input className='w-[100px] p-2 px-3 rounded focus:outline-none border' type="number" minLength={1} maxLength={10} id="discountedPrice" />
                                <label>Discounted Price <span>($ / Month)</span></label>
                            </div>
                        </div>
                    </div>
                    <div className="form-item-2 flex flex-col md:w-1/2 gap-8">
                        <div className="img-title flex flex-wrap">
                            Images:<span className='text-zinc-500 text-sm'>The first image will be the cover (max 6)</span>
                        </div>
                        <div className="image flex flex-wrap md:justify-between justify-center items-center gap-3">
                            <input className='border p-2 rounded ' type="file" id="images" />
                            <button className='bg-green-500 text-white rounded p-3 uppercase'>Upload</button>
                        </div>
                        <button className='bg-black text-white p-3 rounded uppercase'>Create listing</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateListing
