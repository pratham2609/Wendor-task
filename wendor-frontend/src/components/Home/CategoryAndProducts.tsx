import { Categories } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

export default function CategoryAndProducts() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full lg:mb-16 md:mb-12 mb-6'>
            <div className='w-full flex md:flex-row flex-col gap-5 overflow-x-hidden items-center'>
                <p className='xl:text-xl md:text-lg text-base font-bold'>
                    Categories
                </p>
                <ul className='flex w-full items-center overflow-x-auto lg:gap-4 md:gap-3 gap-2 scrollbar-hide'>
                    {Categories.map((category, index) => (
                        <li onClick={() => navigate("/products?category=" + category)} key={index}
                            className=' bg-zinc-200 text-black whitespace-nowrap flex items-center justify-center rounded-md px-4 py-1 cursor-pointer xl:text-lg md:text-base text-sm '>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
