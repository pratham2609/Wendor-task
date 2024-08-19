import { useNavigate } from "react-router-dom";
import hero_person from "../../assets/hero-person.svg"
export default function Hero() {
    const navigate = useNavigate();
    return (
        <div className='w-screen relative bg-[#F8EDE3] h-[80vh] bg-no-repeat bg-hero'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
                <div className="w-full flex flex-col items-center">
                    <h1 className="font-extrabold text-6xl">Delicious Moments Await</h1>
                    <p className='text-lg font-medium'>Indulge in your cravings with a wide variety of delicious snacks and treats</p>
                </div>
                <button onClick={() => navigate("/products")} className='text-black bg-white px-5 py-3 text-[22px] rounded-md font-medium w-max'>
                    Browse products
                </button>
            </div>
            <div className="absolute z-10 left-0 bottom-0">
                <img src={hero_person} alt="hero Person" className="h-full" />
            </div>
        </div>
    )
}
