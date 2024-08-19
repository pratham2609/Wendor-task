import ModalProvider from "../Provider/ModalProvider";
import { Order, OrderProduct } from "../../types/Sales";
import { useModalContext } from "../../context/ModalsContext";

export default function OrderModal({ order }: { order: Order }) {
    const { orderModalOpen, setOrderModalOpen } = useModalContext();
    return (
        <div className="h-full w-full">
            <ModalProvider big={false} action={() => setOrderModalOpen({ order: null, isOpen: false })} hideCloseButton={true} isOpen={orderModalOpen.isOpen} setIsOpen={(val) => setOrderModalOpen({
                order: null,
                isOpen: val
            })} title="Order Details" >
                <div>
                    <div className='flex h-full w-full flex-col'>
                        <h4 className='font-medium'>
                            Order Id - #{order.id.split("-")[0]}
                        </h4>
                        <p className='font-medium'>
                            Date - {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <div className='w-full h-px bg-gray-400 my-2' />
                        {order.products.map((item: OrderProduct) => (<div key={item.name}>
                            <div className='w-full items-center font-medium grid grid-cols-3'>
                                <p className="w-full">
                                    {item.name}
                                </p>
                                <p className="place-self-end">
                                    x {item.quantity}
                                </p>
                                <p className="place-self-end">
                                    {item.quantity * item.price}
                                </p>
                            </div>
                        </div>))}
                        <div className='w-full h-px bg-gray-400 my-2' />
                        <div className='w-full items-center justify-between flex'>
                            <p className='font-medium'>
                                Total Value
                            </p>
                            <p className='text-lg font-semibold'>
                                {order.totalPrice}
                            </p>
                        </div>
                    </div>
                </div>
            </ModalProvider>
        </div>
    )
}
