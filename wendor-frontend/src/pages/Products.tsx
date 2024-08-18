import { useSearchParams } from "react-router-dom"
import { useFetchInventory } from "../hooks/fetchInventoryData";
import ProductCard from "../components/ProductCards";
import { InventoryItem } from "../types/Inventory";
import { useEffect, useState } from "react";


export default function Products() {
    const [filter, setFilter] = useState({
        category: null,
        company: null
    });
    const [searchParams] = useSearchParams();
    useEffect(() => {
        setFilter({
            category: searchParams.get('category'),
            company: searchParams.get('company')
        })
    }, [searchParams])
    const { inventory, loading } = useFetchInventory({ category: filter.category, company: filter.company });
    return (
        <div className='w-full min-h-screen h-full'>
            <div className='my-10'>
                <h1 className="font-bold text-4xl">
                    Products
                </h1>
                <h4 className="font-semibold text-3xl">
                    {searchParams ? searchParams.get('category') && <p> Category - {searchParams.get('category')}</p>
                        : searchParams.get('company') && <p> Category - {searchParams.get('company')}</p>
                    }
                </h4>
            </div>
            <div className='w-full grid grid-cols-4 gap-5'>
                {loading ? Array(4).fill(1).map((_, index) => (
                    <div key={index} className='w-full h-[450px] rounded-xl bg-gray-400 animate-pulse' />
                )) : inventory.inventory.length > 0 ?
                    inventory.inventory.map((data: InventoryItem) => (
                        <ProductCard key={data.productId} product={data} />
                    )) : <div className="w-full justify-center col-span-4 flex items-center">No products found with associated category</div>
                }
            </div>
        </div >
    )
}
