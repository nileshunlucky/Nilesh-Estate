import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const params = useParams()

    let settings = {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId])

    return (
        <div className="overflow-hidden">
            {loading && <h1 className="text-3xl text-center my-12">Loading...</h1>}
            {error && <h1 className="text-3xl text-red-700 text-center my-12">Something went wrong...</h1>}
            {listing && !loading && !error && (
                <div key={listing._id} className="border">
                    {listing.imageUrls.map((url, index) => (
                        <Slider {...settings}>
                            <div key={index} >
                                <img className="h-[500px] w-full object-cover bg-no-repeat" src={url} alt={`listing image ${index + 1}`} />
                            </div>
                        </Slider>
                    ))}
                    <div className="p-4 flex flex-col justify-center items-center gap-5 my-12">
                        <span className="flex gap-5 text-xl items-center text-semibold">
                            <h1 className="text-3xl font-bold">{listing.name}</h1>
                            <h1 className="text-lg font-bold"> - ${listing.regularPrice}/Month</h1>
                        </span>
                        <span className="flex gap-3 justify-between items-center">
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="text-lg">{listing.address}</p>
                        </span>
                        <span><button className="bg-black text-white px-6 py-2 rounded-md">{listing.type}</button></span>
                        <span><p>Description - {listing.description}</p></span>
                        <div className="flex gap-5 text-xl">
                            <span className="flex justify-between items-center gap-2">
                                <i className="fa-solid fa-bed" /><p>{listing.bedrooms} Beds</p>
                            </span>
                            <span className="flex justify-between items-center gap-2">
                                <i className="fa-solid fa-bath" /><p>{listing.bathrooms} Baths</p>
                            </span>
                            <span className="flex justify-between items-center gap-2">
                                <i className="fa-solid fa-square-parking" /><p>{listing.parking ? 'Parking' : 'No Parking'}</p>
                            </span>
                            <span className="flex justify-between items-center gap-2">
                                <i className="fa-solid fa-couch" /><p>{listing.furnished ? 'Furnished' : 'Not furnished'}</p>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Listing
