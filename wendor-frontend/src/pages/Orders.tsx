import { useGetOrders } from "../hooks/useGetOrders"
import OrderCard from "../components/OrderCard";
import { Order } from "../types/Sales";
import { useNavigate } from "react-router-dom";
import ContainerWrapper from "../components/Global/ContainerWrapper";


export default function Orders() {
    const navigate = useNavigate();
    const { orders, loading } = useGetOrders({})
    return (
        <ContainerWrapper>
            <div className='w-full min-h-[90vh] pt-10 flex flex-col gap-10'>
                <div className='flex justify-between w-full items-center'>
                <h1 className="font-bold xl:text-4xl lg:text-[32px] text-[28px]">
                        Orders
                    </h1>
                    <p className="mr-10 text-xl text-black/70 font-medium">Your latest {orders.totalCount} orders</p>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-10 mx-auto">
                    {loading ?
                        <div className='w-full cols h-[300px] rounded-xl bg-gray-400 animate-pulse' />
                        : orders.totalCount > 0 ?
                            orders.orders.map((data: Order) => (
                                <OrderCard key={data.id} order={data} />
                            )) : <div className="w-full justify-center col-span-4 gap-5 flex flex-col items-center">
                                <p className="font-semibold text-xl">
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
