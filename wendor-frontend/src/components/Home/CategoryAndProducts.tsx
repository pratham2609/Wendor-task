import { Categories } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

export default function CategoryAndProducts() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full mb-16'>
            <div className='w-full flex gap-5 overflow-x-hidden items-center'>
                <p className='text-xl font-bold'>
                    Categories: 
                </p>
                <ul className='flex w-full items-center overflow-x-auto gap-4 scrollbar-hide'>
                    {Categories.map((category, index) => (
                        <li onClick={() => navigate("/products?category=" + category)} key={index}
                            className=' bg-zinc-200 text-black whitespace-nowrap flex items-center justify-center rounded-lg px-4 py-1 cursor-pointer text-lg '>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
