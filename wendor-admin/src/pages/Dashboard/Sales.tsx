/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import TableContainer from "../../components/Dashboard/containers/TableContainer";
import { SaleProduct, Sales, SalesRes } from "../../types/Sales";
import { TableColums } from "../../types/Table";
import { IoReload } from "react-icons/io5";
import ReloadBtn from "../../components/Dashboard/ReloadBtn";

export default function Companies() {
    const columns: TableColums[] = [
        { name: "SNo.", uid: "sno" },
        { name: "Date", uid: "createdAt" },
        { name: "Total Price", uid: "totalPrice" },
        { name: "Products", uid: "products" },
    ];
    const [loading, setLoading] = React.useState(false);
    const [reload, setReload] = React.useState(false);
    const [salesRes, setsalesRes] = React.useState<SalesRes>({
        sales: [],
        totalCount: 0,
    });
    const [filter, setFilter] = React.useState({
        page: 1,
        limit: 14,
    })
    const setPage = (val: number) => {
        setFilter({ ...filter, page: val });
    }
    const update = () => setReload(!reload);
    React.useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/sales/all?page=${filter.page}&limit=${filter.limit}`)
            .then((res) => {
                setsalesRes({
                    sales: res.data.data.sales.map((item: Sales, index: number) => ({ ...item, sno: index + 1 })),
                    totalCount: res.data.totalCount,
                });
                setLoading(false);
            })
            .catch((error) => console.log(error.message))
            .finally(() => setLoading(false));
    }, [reload, filter.page]);

    React.useEffect(() => {
        document.title = "Wendor | Sales"
    }, []);

    const renderCell = React.useCallback((sale: Sales, columnKey: string) => {
        const cellValue = sale[columnKey];
        switch (columnKey) {
            case "sno":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "createdAt":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{new Date(sale.createdAt).toLocaleDateString()}</p>
                    </div>
                );
            case "totalPrice":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "products":
                return (
                    <div className="flex flex-col">
                        {sale.products.map((prod: SaleProduct, index: number) =>
                            <p key={index} className="text-bold text-sm capitalize">{prod.name} x {prod.quantity}</p>
                        )}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    return (
        <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-10 items-center'>
            <div className='flex items-center w-full justify-between'>
                <h2 className='urbanist font-medium text-4xl'>
                    Sales
                </h2>
                <ReloadBtn action={update} />
            </div>
            <TableContainer
                columns={columns}
                id={"sno"}
                page={filter.page}
                setPage={setPage}
                totalCount={salesRes?.totalCount}
                isLoading={loading}
                data={salesRes.sales ?? []}
                renderCell={renderCell}
            />
        </section>
    )
}
