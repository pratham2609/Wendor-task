import { useGetOrders } from "../hooks/useGetOrders"
import OrderCard from "../components/OrderCard";
import { Order } from "../types/Sales";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../context/ModalsContext";
import OrderModal from "../components/Modals/OrderModal";


export default function Orders() {
    const navigate = useNavigate();
    const { orders, loading } = useGetOrders({})
    const { orderModalOpen } = useModalContext();
    return (
        <>
            <div className='w-full min-h-[90vh] pt-10 flex flex-col gap-10'>
                <div className=''>
                    <h1 className="font-bold text-4xl">
                        Orders
                    </h1>
                </div>
                <div className="w-full h-full grid grid-cols-4 gap-5">
                    {loading ? Array(4).fill(1).map((_, index) => (
                        <div key={index} className='w-full h-[300px] rounded-xl bg-gray-400 animate-pulse' />
                    )) : orders.totalCount > 0 ?
                        orders.orders.map((data: Order) => (
                            <OrderCard key={data.id} order={data} />
                        )) : <div className="w-full justify-center col-span-4 flex flex-col items-center">
                            <p className="font-semibold text-xl">
                                No Orders placed till now🤷🏻‍♂️
                            </p>
                            <button onClick={() => navigate("/products")} className="w-max py-2 px-4 bg-blue bg-opacity-65 text-white font-semibold rounded-xl">Explore All products</button>
                        </div>
                    }
                </div>
            </div>
            {orderModalOpen.isOpen && <OrderModal order={orderModalOpen.order} />}
        </>
    )
}
