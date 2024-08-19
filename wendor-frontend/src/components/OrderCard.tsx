import { Order } from '../types/Sales'

export default function OrderCard({ order }: { order: Order }) {
    return (
        <div className='w-full h-full border rounded-xl border-zinc-400'>
            <div className='w-full flex flex-col justify-between items-start gap-2 h-full md:p-5 p-3'>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='text-xl font-semibold'>
                        Order Summary
                    </h2>
                    <p className='font-medium'>
                        Placed on: {new Date(order.createdAt).toDateString()}
                    </p>
                </div>
                <div className='flex h-full w-full flex-col'>
                    <div className='flex w-full justify-between items-center'>
                        <h4 className='text-sm font-medium'>
                            Order Id - #{order.id.split("-")[0]}
                        </h4>
                        <p className='font-medium'>
                            Total Amount - ₹{order.totalPrice}
                        </p>
                    </div>

                    <div className='w-full h-px bg-gray-300 my-2' />
                    <p className='font-medium'>
                        Total Items - {order.products.length}
                    </p>
                    <div className='w-full flex my-4 flex-col gap-3'>
                        {order.products.map((product, index) => {
                            return <>
                                <div key={product.name} className='w-full flex items-center font-medium justify-between h-24'>
                                    <div className='flex gap-5 h-full'>
                                        <div className='w-24 h-full rounded-lg border overflow-hidden'>
                                            <img src={product.display_image_url} alt='Product Image' className='w-full h-full' />
                                        </div>
                                        <div className='flex items-start flex-col justify-between h-full'>
                                            <p className="text-2xl font-medium">
                                                {product.name}
                                            </p>
                                            <p className="text-xl">
                                                ₹{product.price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-end flex-col justify-between h-full'>
                                        <p className="text-lg">
                                            Purchased - {product.quantity}
                                        </p>
                                        <p className="text-xl">
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
