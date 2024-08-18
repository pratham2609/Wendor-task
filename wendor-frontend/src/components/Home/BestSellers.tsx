import { useInventoryContext } from '../../context/InventoryContext';
import ProductCard from '../ProductCards';
import { InventoryItem } from '../../types/Inventory';

export default function BestSellers() {
    const { inventory, loading } = useInventoryContext();
    return (
        <div className='w-full h-full flex flex-col gap-5'>
            <div className='w-full'>
                <h1 className="font-bold text-4xl">
                    Best Sellers
                </h1>
            </div>
            <div className='w-full grid grid-cols-4 gap-5'>
                {loading ? Array(4).fill(1).map((_, index) => (
                    <div key={index} className='w-full h-[450px] rounded-xl bg-gray-400 animate-pulse' />
                )) : inventory.inventory.length > 0 ?
                    inventory.inventory.map((data: InventoryItem) => (
                        <ProductCard key={data.productId} product={data} />
                    )) : <div className="w-full justify-center col-span-4 h-72 flex items-center text-2xl">No products found</div>
                }
            </div>
        </div>
    )
}
