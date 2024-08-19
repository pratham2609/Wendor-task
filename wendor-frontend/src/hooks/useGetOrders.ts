/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { OrdersRes } from '../types/Sales';


interface UseGetOrdersParams {
    page?: number;
    pageSize?: number;
    reload?: boolean;
}

export const useGetOrders = ({ page, pageSize, reload }: UseGetOrdersParams) => {
    const [orders, setOrders] = useState<OrdersRes>({
        orders: [],
        totalCount: 0
    });
    const [loading, setLoading] = useState(false);

    const fetchOrders = async (): Promise<void> => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: (page ?? 1).toString(),
                pageSize: (pageSize ?? 10).toString(),
            });

            const res = await axiosInstance.get(`/sales?${params.toString()}`);
            setOrders({
                orders: res.data.data.sales,
                totalCount: res.data.data.totalCount
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [reload])
    return {
        orders,
        loading
    };
};
