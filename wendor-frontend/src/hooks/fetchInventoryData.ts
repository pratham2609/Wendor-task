/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { InventoryRes } from '../types/Inventory';

interface UseFetchInventoryParams {
    page?: number;
    pageSize?: number;
    category?: string;
    company?: string;
}

export const useFetchInventory = ({ page, pageSize, category, company }: UseFetchInventoryParams) => {
    const [inventory, setInventory] = useState<InventoryRes>({
        inventory: [],
        totalCount: 0
    });
    const [loading, setLoading] = useState(false);

    const fetchInventory = async (): Promise<void> => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: (page ?? 1).toString(),
                pageSize: (pageSize ?? 10).toString(),
            });

            if (category) {
                params.append('category', category);
            }

            if (company) {
                params.append('company', company);
            }

            const res = await axiosInstance.get(`/inventory?${params.toString()}`);
            setInventory({
                inventory: res.data.data.inventory,
                totalCount: res.data.data.totalCount
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [])
    return {
        inventory,
        fetchInventory,
        loading
    };
};
