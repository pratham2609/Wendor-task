import { InventoryItem } from '../types/Inventory';
import AddToCartBtn from './AddToCartBtn';

export default function ProductCard({ product }: { product: InventoryItem }) {
    return (
        <div className='w-full bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full xl:h-[250px] lg:h-[220px] overflow-hidden h-[180px] '>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-contain' />
            </div>
            <div className='w-full xl:p-3 lg:p-2.5 p-2 justify-between flex xl:gap-3 md:gap-2 gap-1 flex-col'>
                <div className='flex flex-col lg:gap-1 capitalize'>
                    <h4 className='text-gray-600 xl:text-sm text-xs'>{product.companyName}</h4>
                    <h2 className='font-semibold xl:text-xl lg:text-lg text-base truncate'>{product.productName}</h2>
                </div>

                <p className='xl:text-xl lg:text-lg md:text-base text-sm font-medium'>
                    1 for ₹{product.productPrice}
                </p>
                <p className='xl:text-lg lg:text-base md:text-sm text-xs font-medium'>
                    Total Available: <span className={`${product.totalQuantity < 10 ? "text-danger" : "text-gray-600"}`}>{product.totalQuantity}</span>
                </p>
                <AddToCartBtn product={product} />
            </div>
        </div>
    );
}

export function SmallProductCard({ product }: { product: InventoryItem }) {
    return (
        <div className='w-full flex flex-col h-full justify-between bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full xl:h-[150px] lg:h-[130px] h-[120px] overflow-hidden'>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-contain' />
            </div>
            <div className='xl:p-3 lg:p-2.5 p-2 flex flex-col items-start'>
                <h4 className='font-semibold sm:text-base text-sm'>{product.productName}</h4>
                <p className='font-medium sm:text-base text-sm'>₹{product.productPrice}</p>
            </div>
            <div className='xl:px-3 lg:px-2.5 p-2 xl:pb-3 lg:pb-2.5 pb-2 w-full'>
                <AddToCartBtn product={product} />
            </div>
        </div>
    )
}
