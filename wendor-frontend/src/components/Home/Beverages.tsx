import { SmallProductCard } from '../ProductCards';
import { InventoryItem } from '../../types/Inventory';
import { useFetchInventory } from '../../hooks/fetchInventoryData';

export default function Beverages() {
  const { inventory, loading } = useFetchInventory({
    category: 'Beverages'
  });

  return (
    <div className='w-full h-full flex my-10 flex-col gap-5'>
      <div className='w-full'>
        <h1 className="font-bold text-3xl">
          Beverages
        </h1>
      </div>
      <div className='w-full grid grid-cols-5 gap-5'>
        {loading ? Array(5).fill(1).map((_, index) => (
          <div key={index} className='w-full h-[200px] rounded-xl bg-gray-400 animate-pulse' />
        )) : inventory.inventory.length > 0 ?
          inventory.inventory.map((data: InventoryItem) => (
            <SmallProductCard key={data.productId} product={data} />
          )) : <div className='w-full flex justify-center items-center h-56 col-span-5 text-2xl'>No Products Found</div>
        }
      </div>
    </div>
  )
}
