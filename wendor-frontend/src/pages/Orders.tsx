import { useGetOrders } from "../hooks/useGetOrders"
import OrderCard from "../components/OrderCard";
import { Order } from "../types/Sales";
import { useNavigate } from "react-router-dom";
import ContainerWrapper from "../components/Global/ContainerWrapper";
import { useEffect } from "react";


export default function Orders() {
    const navigate = useNavigate();
    const { orders, loading } = useGetOrders({});
    useEffect(() => {
        document.title = "Wendor Shop | Orders"
    }, [])
    return (
        <ContainerWrapper>
            <div className='w-full min-h-[90vh] flex flex-col xl:gap-10 md:gap-8 gap-6 lg:pt-10 md:pt-8 pt-0'>
                <div className='flex justify-between w-full items-center'>
                    <h1 className="font-bold xl:text-4xl lg:text-[32px] md:text-[28px] text-2xl">
                        Orders
                    </h1>
                    {orders.totalCount > 0 && <p className="md:mr-10 xl:text-xl lg:text-lg text-base text-black/70 font-medium">Your latest {orders.totalCount} orders</p>}
                </div>
                <div className="xl:w-1/2 md:w-2/3 w-full h-full flex flex-col gap-10 mx-auto">
                    {loading ?
                        <div className='w-full cols xl:h-[300px] lg:h-[270px] h-[250px] rounded-xl bg-gray-400 animate-pulse' />
                        : orders.totalCount > 0 ?
                            orders.orders.map((data: Order) => (
                                <OrderCard key={data.id} order={data} />
                            )) : <div className="w-full justify-center col-span-4 gap-5 flex flex-col items-center">
                                <p className="font-semibold xl:text-xl lg:text-lg text-base">
                                    No Orders placed till now🤷🏻‍♂️
                                </p>
                                <button onClick={() => navigate("/products")} className="w-max py-2 px-4 bg-blue bg-opacity-65 text-white font-semibold rounded-xl">Explore All products</button>
                            </div>
                    }
                </div>
            </div>
        </ContainerWrapper>
    )
}
