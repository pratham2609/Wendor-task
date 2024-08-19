/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { InventoryItem } from '../types/Inventory';


export const useGetProductById = (id: string) => {
    const [product, setProduct] = useState<InventoryItem>(null);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/inventory/product/one/${id}`);
            setProduct(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id])
    return {
        product,
        loading
    };
};
