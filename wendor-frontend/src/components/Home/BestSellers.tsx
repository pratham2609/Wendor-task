import { useInventoryContext } from '../../context/InventoryContext';
import ProductCard from '../ProductCards';
import { InventoryItem } from '../../types/Inventory';

export default function BestSellers() {
    const { inventory, loading } = useInventoryContext();
    return (
        <div className='w-full h-full flex flex-col my-10 gap-5'>
            <div className='w-full'>
                <h1 className="font-bold xl:text-3xl lg:text-[26px] text-2xl">
                    Best Sellers
                </h1>
            </div>
            <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                {loading ? Array(4).fill(1).map((_, index) => (
                    <div key={index} className='w-full xl:h-[450px] lg:h-[400px] h-[380px] rounded-xl bg-gray-400 animate-pulse' />
                )) : inventory.inventory.length > 0 ?
                    inventory.inventory.slice(0,8).map((data: InventoryItem) => (
                        <ProductCard key={data.productId} product={data} />
                    )) : <div className="w-full justify-center col-span-4 h-72 flex items-center text-2xl">No products found</div>
                }
            </div>
        </div>
    )
}
