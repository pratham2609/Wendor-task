import { Order } from '../types/Sales'
import { useModalContext } from '../context/ModalsContext';

export default function OrderCard({ order }: { order: Order }) {
    const { setOrderModalOpen } = useModalContext();
    return (
        <div className='w-full h-full border rounded-xl border-pink'>
            <div className='w-full flex flex-col justify-between items-start gap-2 h-full md:p-5 p-3'>
                <h2 className='text-xl font-semibold'>
                    Order Summary
                </h2>
                <div className='flex h-full w-full flex-col'>
                    <h4 className='font-medium'>
                        Order Id - #{order.id.split("-")[0]}
                    </h4>
                    <p className='font-medium'>
                        Date - {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <div className='w-full h-px bg-gray-400 my-2' />
                    <div className='w-full items-center flex justify-between'>
                        <p className='font-medium'>
                            Total Items
                        </p>
                        <p className='text-lg font-semibold'>
                            {order.products.length}
                        </p>
                    </div>
                    <div className='w-full items-center justify-between flex'>
                        <p className='font-medium'>
                            Total Value
                        </p>
                        <p className='text-lg font-semibold'>
                            {order.totalPrice}
                        </p>
                    </div>
                </div>
                <button onClick={() => setOrderModalOpen({
                    order: order,
                    isOpen: true
                })} className='w-full py-2 rounded-md bg-blue bg-opacity-65 text-white font-semibold'>
                    View Order
                </button>
            </div>
        </div>
    )
}
