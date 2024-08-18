import { Categories } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

export default function CategoryAndProducts() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full'>
            <ul className='flex w-full items-center gap-4'>
                {Categories.slice(2, 7).map((category, index) => (
                    <li onClick={() => navigate("/products?category=" + category)} key={index} className={'w-1/4 h-20 text-white flex items-center justify-center rounded-md font-bold cursor-pointer text-2xl ' + (
                        index === 0 ? ' bg-pink' : index === 2 ? 'bg-gray-500' : index === 3 ? ' bg-teal' : "bg-lightBlue"
                    )}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}
