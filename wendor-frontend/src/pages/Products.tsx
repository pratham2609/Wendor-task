import { useSearchParams } from "react-router-dom"
import { useFetchInventory } from "../hooks/fetchInventoryData";
import ProductCard from "../components/ProductCards";
import { InventoryItem } from "../types/Inventory";
import { useEffect, useState } from "react";
import { Categories } from "../utils/constants";
import ContainerWrapper from "../components/Global/ContainerWrapper";


export default function Products() {
    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState({
        category: searchParams.get('category'),
        company: searchParams.get('company'),
    });
    const { inventory, loading } = useFetchInventory({ category: filter.category, company: filter.company, pageSize: 40 });
    useEffect(() => {
        document.title = "Wendor Shop | Products"
    }, [])
    return (
        <ContainerWrapper>
            <div className='w-full min-h-screen h-full flex flex-col xl:gap-10 md:gap-8 gap-6 lg:pt-10 md:pt-8 pt-0'>
                <div className="w-full flex justify-between items-center">
                    <div className=''>
                        <h1 className="font-bold xl:text-4xl lg:text-[32px] text-[28px]">
                            Products
                        </h1>
                        <h4 className="font-semibold text-3xl">
                            {searchParams ? searchParams.get('category') && <p> Category - {searchParams.get('category')}</p>
                                : searchParams.get('company') && <p> Category - {searchParams.get('company')}</p>
                            }
                        </h4>
                    </div>
                    <select value={filter.category} onChange={(e) => setFilter({
                        ...filter,
                        category: e.target.value,
                    })} className="border-[1.5px] focus:outline-none border-gray-600 rounded-lg px-2 py-1">
                        <option value={"all"}>
                            All
                        </option>
                        {Categories.map((category) => (<option key={category}>{category}</option>))}
                    </select>
                </div>
                <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                    {loading ? Array(4).fill(1).map((_, index) => (
                        <div key={index} className='w-full h-[450px] rounded-xl bg-gray-400 animate-pulse' />
                    )) : inventory.inventory.length > 0 ?
                        inventory.inventory.map((data: InventoryItem) => (
                            <ProductCard key={data.productId} product={data} />
                        )) : <div className="w-full justify-center col-span-4 pt-24 flex items-center">No products found</div>
                    }
                </div>
            </div>
        </ContainerWrapper >
    )
}
