import { InventoryItem } from '../types/Inventory';
import { useNavigate } from 'react-router-dom';
import AddToCartBtn from './AddToCartBtn';

export default function ProductCard({ product }: { product: InventoryItem }) {
    return (
        <div className='w-full bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full h-[250px] '>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-cover' />
            </div>
            <div className='w-full p-3 flex gap-3 flex-col'>
                <div className='flex flex-col gap-1'>
                    <h4 className='text-gray-600'>{product.companyName}</h4>
                    <h2 className='font-semibold text-xl truncate'>{product.productName}</h2>
                </div>

                <p className='text-xl font-medium'>
                    1 for ₹{product.productPrice}
                </p>
                <p className='text-lg font-medium'>
                    Total Available: <span className={`${product.totalQuantity < 10 ? "text-danger" : "text-gray-600"}`}>{product.totalQuantity}</span>
                </p>
                <AddToCartBtn product={product} />
            </div>
        </div>
    );
}

export function SmallProductCard({ product }: { product: InventoryItem }) {
    return (
        <div className='w-full flex flex-col h-full bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full h-[150px]'>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-cover' />
            </div>
            <div className='p-3 flex flex-col items-start'>
                <h4 className='font-semibold'>{product.productName}</h4>
                <p className='font-medium'>₹{product.productPrice}</p>
            </div>
            <div className='px-3 pb-3 w-full'>
                <AddToCartBtn product={product} />
            </div>
        </div>
    )
}
