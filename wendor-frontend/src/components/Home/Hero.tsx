import { useNavigate } from "react-router-dom";
import machine from "../../assets/machine.png";
export default function Hero() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full'>
            <div className='w-full grid h-full grid-cols-2'>
                <div className='w-full h-full flex flex-col justify-center gap-10'>
                    <div className='flex flex-col'>
                        <h3 className='text-5xl font-bold'>Welcome to</h3>
                        <h1 className='text-7xl font-bold text-red-700'>Wendor</h1>
                    </div>
                    <div className=' flex flex-col gap-5'>
                        <p className='text-3xl font-bold leading-relaxed'>Making your life easier by giving out <br />
                            <span className='text-5xl text-red-700'>The Best</span> to you</p>
                        <button onClick={() => navigate("/products")} className='text-white bg-black px-5 py-3 text-xl rounded-2xl font-medium w-max'>
                            Browse products
                        </button>
                    </div>
                </div>
                <div className='w-full h-full flex justify-end'>
                    <img src={machine} alt='Vending Machine' className=' w-full h-[90vh] object-contain ' />
                </div>
            </div>
        </div>
    )
}
