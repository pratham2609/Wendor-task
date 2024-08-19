import { SmallProductCard } from '../ProductCards';
import { InventoryItem } from '../../types/Inventory';
import { useFetchInventory } from '../../hooks/fetchInventoryData';

export default function Snacks() {
    const { inventory, loading } = useFetchInventory({
        category: 'Snacks'
    });

    return (
        <div className='w-full h-full flex flex-col my-10 gap-5'>
            <div className='w-full'>
                <h1 className="font-bold xl:text-3xl lg:text-[26px] text-2xl">
                    Snacks
                </h1>
            </div>
            <div className='w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5'>
                {loading ? Array(5).fill(1).map((_, index) => (
                    <div key={index} className='w-full xl:h-[200px] lg:h-[180px] h-[160px] bg-gray-400 rounded-xl animate-pulse' />
                )) : inventory.inventory.length > 0 ?
                    inventory.inventory.map((data: InventoryItem) => (
                        <SmallProductCard key={data.productId} product={data} />
                    )) : <div className='w-full flex justify-center items-center  h-56 col-span-5 text-2xl'>No Products Found</div>
                }
            </div>
        </div>
    )
}
