import { MdCollectionsBookmark } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/Cart";
import { useModalContext } from "../context/ModalsContext";

export default function Cart() {
    const { cart, calculateCartValue } = useCartContext();
    const { user } = useAuthContext();
    const { setAuthModalOpen } = useModalContext();
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen">
            <div className="w-full h-full mt-10 flex md:flex-row flex-col items-start lg:gap-10 gap-7">
                <div className="rounded-lg border w-[60%] h-full flex flex-col">
                    <div className="w-full flex md:p-5 p-3 items-center gap-4">
                        <MdCollectionsBookmark size={24} className="text-pink" />
                        <div>
                            <h4 className="text-sm">Order details</h4>
                        </div>
                    </div>
                    <div className="w-full flex md:p-5 p-3">
                        {cart.length > 0 ? cart.map((item) => (<SingleCartItem item={item} key={item.productId} />))
                            : <div className="flex flex-col w-full items-center gap-2">
                                <p className="text-center font-semibold w-full text-xl">Cart is Empty 🤫</p>
                                <button onClick={() => navigate("/products")} className="w-max py-2 px-4 bg-blue bg-opacity-65 text-white font-semibold rounded-xl">See All products</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="rounded-lg border w-[40%] h-full flex flex-col">
                    <div className="w-full flex flex-col border-b gap-3 md:p-5 p-3">
                        <h1 className="font-semibold text-xl">Order Summary</h1>
                        {user?.email && <div className="flex w-full items-center justify-between">
                            <div>
                                <h4>Order to</h4>
                                <h2 className="text-2xl font-medium">{user?.fullName}</h2>
                            </div>
                        </div>}
                    </div>
                    <div className="w-full flex flex-col border-b gap-3 md:p-5 p-3">
                        <h1 className="font-semibold text-xl">Bill</h1>
                        <div className="flex flex-col w-full gap-2">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-lg font-medium">Total Amount</p>
                                <p className="text-lg font-medium">₹{calculateCartValue}</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-lg font-medium">Tax</p>
                                <p className="text-lg font-medium">₹0</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-lg font-medium">Discount</p>
                                <p className="text-lg font-medium">₹0</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex border-b items-center md:p-5 p-3 justify-between ">
                        <p className="text-lg font-medium">Total Payable Amount</p>
                        <p className="text-2xl font-semibold">₹{calculateCartValue}</p>
                    </div>
                    <div className="md:p-5 p-3 w-full flex-col gap-4 flex">
                        {user?.email && user?.email != "" ?
                            <button className="w-full rounded-lg py-2 bg-pink font-medium text-white">Place Order</button>
                            : <button onClick={() => setAuthModalOpen(true)} className="w-full rounded-lg py-2 bg-pink font-medium text-white">Login to place order</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export function SingleCartItem({ item }: { item: CartItem }) {
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-start gap-2">
                <div className="h-24 w-24 border overflow-hidden rounded-xl">
                    <img src={item?.display_image_url} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{item?.productName}</h3>
                    <p className="text-gray-600">{item?.companyName}</p>
                </div>
            </div>
            <div className="flex flex-col">

            </div>
        </div>
    )
}
