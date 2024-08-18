/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProductCompanies } from "../../types/Product";

export default function ProductDropdown({ product, items, setProduct }: { product: string, items: ProductCompanies[], setProduct: (product: ProductCompanies) => void }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [search, setSearch] = useState(product);
    const [filteredItems, setFilteredItems] = useState(items);
    function filterProducts(search: string): ProductCompanies[] {
        if (!search) {
            return items;
        }
        const lowerCaseSearch = search.toLowerCase();
        return items.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearch)
        );
    }
    useEffect(() => {
        const handleFilterProducts = (input: string) => {
            const filtered = filterProducts(input);
            setFilteredItems(filtered);
        };
        handleFilterProducts(search);
        console.log(filteredItems)
    }, [search]);

    return (
        <div className="w-full relative" onClick={() => setShowDropDown(false)}>
            <input
                value={search}
                className="w-full h-10 rounded-md px-2 focus:outline-none border"
                onChange={(e) => {
                    const inputValue = e.target.value;
                    setShowDropDown(true);
                    setSearch(inputValue);
                    filterProducts(inputValue);
                }}
            />
            <div className={"absolute border rounded-lg z-10 max-h-56 min-h-24 h-full overflow-x-hidden overflow-y-auto p-2 shadow-lg origin-top transition ease-linear bg-white min-w-full max-w-[20vw] top-full left-0 " + (showDropDown ? "scale-100" : "scale-0")}>
                <ul>
                    {filteredItems.length > 0 ? filteredItems.map((product: ProductCompanies) => (
                        <li className="cursor-pointer" key={product.id} onClick={() => {
                            setProduct(product);
                            setSearch(product.name);
                            setShowDropDown(false);
                        }}>
                            {product.name}
                        </li>
                    )) : (
                        <li className="text-center">No products found</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
