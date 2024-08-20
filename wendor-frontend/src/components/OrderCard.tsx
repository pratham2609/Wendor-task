import { Order } from '../types/Sales'

export default function OrderCard({ order }: { order: Order }) {
    console.log(order)
    return (
        <div className='w-full h-full border rounded-xl border-zinc-400'>
            <div className='w-full flex flex-col justify-between items-start gap-2 h-full lg:p-5 p-3'>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='xl:text-xl lg:text-lg text-base font-semibold'>
                        Order Summary
                    </h2>
                    <p className='font-medium lg:text-base text-sm'>
                        Placed on: {new Date(order.createdAt).toDateString()}
                    </p>
                </div>
                <div className='flex h-full w-full flex-col'>
                    <div className='flex w-full justify-between items-center'>
                        <h4 className='lg:text-sm md:text-xs text-[10px] font-medium'>
                            Order Id - #{order.id.split("-")[0]}
                        </h4>
                        <p className='font-medium lg:text-sm md:text-xs text-[10px]'>
                            Total Amount - ₹{order.totalPrice}
                        </p>
                    </div>

                    <div className='w-full h-px bg-gray-300 my-2' />
                    <p className='font-medium lg:text-sm md:text-xs text-[10px]'>
                        Total Items - {order.products.length}
                    </p>
                    <div className='w-full flex my-4 flex-col gap-3'>
                        {order.products.map((product, index) => {
                            return <>
                                <div key={product.name} className='w-full flex items-center font-medium justify-between xl:h-24 lg:h-[88px] h-20'>
                                    <div className='flex gap-2 h-full w-[70%]'>
                                        <div className='xl:w-24 lg:w-[88px] w-20 h-full rounded-lg border overflow-hidden'>
                                            <img src={product.display_image_url} alt='Product Image' className='w-full h-full' />
                                        </div>
                                        <div className='flex items-start flex-col justify-between flex-1 w-full h-full'>
                                            <p className="xl:text-xl lg:text-lg text-base md:w-[80%] w-36 truncate font-medium">
                                                {product.name}
                                            </p>
                                            <p className="xl:text-xl lg:text-lg md:text-base text-sm">
                                                ₹{product.price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-end flex-col justify-between h-full'>
                                        <p className="lg:text-lg md:text-base text-sm">
                                            Purchased - {product.quantity}
                                        </p>
                                        <p className="xl:text-xl lg:text-lg md:text-base text-sm">
                                            Total - ₹{product.price * product.quantity}
                                        </p>
                                    </div>
                                </div>
                                {index !== order.products.length - 1 && <div className='w-full h-px bg-zinc-300' />}
                            </>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
