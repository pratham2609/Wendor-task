/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCompanies } from "../../types/Product";
import _ from "lodash";

export default function ProductDropdown({ items, setProduct }: { product: string, items: ProductCompanies[], setProduct: (product: ProductCompanies) => void }) {
    const [search, setSearch] = useState("");
    const searchBoxRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState<ProductCompanies[]>(null);

    function filterProducts(search: string): ProductCompanies[] {
        if (!search) {
            return items;
        }
        const lowerCaseSearch = search.toLowerCase();
        return items.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearch)
        );
    }

    const throttledFilter = useCallback(
        _.throttle((input: string) => {
            const filtered = filterProducts(input);
            setFilteredItems(filtered);
        }, 500),
        []
    );


    const handleClickOutside = (event) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setFilteredItems(null);
        }
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        throttledFilter(value);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={searchBoxRef} className="w-full relative">
            <input
                value={search}
                className="w-full h-10 rounded-md px-2 focus:outline-none border"
                onChange={handleSearchInputChange}
            />

            {filteredItems && <div className="absolute max-h-60 overflow-auto top-[110%] rounded-lg shadow-sm border p-3 bg-white w-full left-0">
                {filteredItems.length > 0 ?
                    <ul>{filteredItems.map((product: ProductCompanies) =>
                    (<li className="cursor-pointer" key={product.id} onClick={() => {
                        setProduct(product);
                        setSearch(product.name);
                        setFilteredItems(null);
                    }}>
                        {product.name}
                    </li>))}
                    </ul> : <p>No results found</p>}
            </div>
            }
        </div>
    );
}
