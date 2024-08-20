/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import { FaSearch } from 'react-icons/fa';
import { SearchProduct } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const searchBoxRef = useRef(null);
    const navigate = useNavigate();
    const [searchedProducts, setSearchedProducts] = useState<SearchProduct[]>(null);
    const searchProducts = async (query: string) => {
        try {
            const res = await axiosInstance.get("/inventory/search?name=" + query);
            setSearchedProducts(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const throttledSearch = useCallback(_.throttle((query) => {
        searchProducts(query);
    }, 1000), []);

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        throttledSearch(value);
    };

    const handleClickOutside = (event) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setSearchedProducts(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={searchBoxRef} className='flex relative items-center border md:w-1/2 w-2/3 px-3 gap-3 bg-white rounded-lg'>
            <FaSearch />
            <input placeholder='Search for products' value={searchQuery}
                onChange={handleSearchInputChange} className='xl:py-2 py-1.5 lg:text-base text-sm w-full focus:outline-none' />
            {searchedProducts && <div className="absolute max-h-60 overflow-auto top-[110%] rounded-lg shadow-xl p-3 bg-white w-full left-0">
                {searchedProducts.length > 0 ?
                    <ul>{searchedProducts.map((item, index) => (<li key={index}>
                        <button className="w-full text-left p-2 hover:bg-gray-100" onClick={() => {
                            navigate("/product/" + item?.productId)
                            setSearchedProducts(null);
                        }}>{item?.productName}</button>
                    </li>))}</ul>
                    : <p>No match</p>}
            </div>}
        </div>
    )
}
