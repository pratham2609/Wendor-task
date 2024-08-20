import { useNavigate } from "react-router-dom";
import hero_person from "../../assets/hero-person.svg"
export default function Hero() {
    const navigate = useNavigate();
    return (
        <div className='w-screen relative bg-[#F8EDE3] h-[80vh] bg-no-repeat bg-cover bg-hero'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
                <div className="w-full flex flex-col items-center">
                    <h1 className="font-extrabold 2xl:text-6xl text-center xl:text-[50px] lg:text-[45px] text-4xl">Delicious Moments Await</h1>
                    <p className='xl:text-lg lg:text-base md:text-sm text-xs md:w-full w-[70%] text-center font-medium'>Indulge in your cravings with a wide variety of delicious snacks and treats</p>
                </div>
                <button onClick={() => navigate("/products")}
                    className='text-black bg-white xl:px-5 lg:px-4 px-3 xl:py-3 lg:py-2.5 py-2 xl:text-[22px] lg:text-xl md:text-lg text-sm rounded-lg font-medium w-max'>
                    Browse products
                </button>
            </div>
            <div className="absolute z-10 left-0 bottom-0">
                <img src={hero_person} alt="hero Person" className="xl:h-[55vh] md:h-[40vh] h-[30vh]" />
            </div>
        </div>
    )
}
