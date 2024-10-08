import { MdCollectionsBookmark } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../types/Cart";
import { useModalContext } from "../context/ModalsContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useInventoryContext } from "../context/InventoryContext";
import { axiosInstance } from "../utils/axiosInstance";
import { useCallback, useEffect, useRef, useState } from "react";
import ContainerWrapper from "../components/Global/ContainerWrapper";
import { BsPatchCheckFill } from "react-icons/bs";

export default function Cart() {
    const { cart, calculateCartValue, emptyCart } = useCartContext();
    const { user } = useAuthContext();
    const { update } = useInventoryContext();
    const { setAuthModalOpen } = useModalContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [, setDummyState] = useState(0); // Dummy state to force re-render

    // Use useRef to hold the timer value without triggering re-renders
    const timerRef = useRef(3);

    const forceUpdate = useCallback(() => setDummyState((prev) => prev + 1), []);

    const placeOrder = async () => {
        if (cart.length === 0) return toast.error("Cart is empty!");

        if (user?.email && user?.email !== "") {
            setLoading(true);
            try {
                const res = await axiosInstance.post("/sales/create", cart);
                console.log(res);
                toast.success("Order placed successfully");
                emptyCart();
                setSuccess(true);

                update();

                const interval = setInterval(() => {
                    if (timerRef.current > 0) {
                        timerRef.current -= 1;
                        forceUpdate(); // Force re-render to reflect timer update
                    } else {
                        clearInterval(interval);
                        setSuccess(false); // Reset success after timeout
                        navigate("/products");
                    }
                }, 1000);
            } catch (error) {
                toast.error(error.response?.data ?? "Error in placing order");
            } finally {
                setLoading(false);
            }
        } else {
            setAuthModalOpen(true);
        }
    };

    useEffect(() => {
        document.title = "Wendor Shop | Cart"
    }, [])

    return (
        <ContainerWrapper>
            <div className="w-full min-h-[85vh] flex flex-col gap-6 lg:pt-10 md:pt-8 pt-0 overflow-hidden">
                <h1 className="font-bold xl:text-4xl lg:text-[32px] text-[28px]">
                    Cart
                </h1>
                <div className="w-full flex md:flex-row flex-col items-start lg:gap-10 gap-7">
                    {success ? (
                        <div className="rounded-lg border w-full h-[30vh] flex flex-col gap-5 items-center justify-center">
                            <div className="flex flex-col w-full items-center gap-7">
                                <BsPatchCheckFill className="text-green-500 success text-7xl" />
                                <h1>Order Placed successfully!</h1>
                                <Link to="/products" className="font-medium underline hover:text-blue">
                                    Redirecting you to Products page in {timerRef.current}s
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={"rounded-lg border h-full flex flex-col " + (cart.length > 0 ? "md:w-[60%] w-full" : "w-full pb-10")}>
                                <div className="w-full h-full grid grid-cols-1 gap-10 md:p-5 p-3">
                                    {cart.length > 0 ? (
                                        <>
                                            <div className="w-full items-center flex gap-4">
                                                <MdCollectionsBookmark size={24} className="text-pink" />
                                                <div>
                                                    <h4 className="text-sm">Order details</h4>
                                                </div>
                                            </div>
                                            <div className="flex max-h-max overflow-y-auto flex-col gap-5">
                                                {cart.map((item, index) => (
                                                    <>
                                                        <SingleCartItem item={item} key={item.productId} />
                                                        {index !== cart.length - 1 && <div className="w-full h-px bg-zinc-300 mt-2" />}
                                                    </>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col w-full py-10 items-center gap-2">
                                            <p className="text-center font-semibold w-full text-xl">Cart is Empty 🤫</p>
                                            <button onClick={() => navigate("/products")} className="w-max py-2 px-4 bg-blue bg-opacity-65 text-white font-semibold rounded-lg">
                                                See All products
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {cart.length > 0 && (
                                <div className="rounded-lg border md:w-[40%] w-full h-full flex flex-col">
                                    <div className="w-full flex flex-col border-b gap-3 md:p-5 p-3">
                                        <h1 className="font-semibold xl:text-xl text-lg">Order Summary</h1>
                                        {user?.email && (
                                            <div className="flex w-full items-center justify-between">
                                                <div>
                                                    <h4>Order to</h4>
                                                    <h2 className="xl:text-2xl lg:text-xl text-lg font-medium">{user?.fullName}</h2>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full flex flex-col border-b gap-3 md:p-5 p-3">
                                        <h1 className="font-semibold text-xl">Bill</h1>
                                        <div className="flex flex-col w-full gap-2">
                                            <div className="w-full flex items-center justify-between">
                                                <p className="xl:text-lg md:text-base text-sm font-medium">Total Amount</p>
                                                <p className="xl:text-lg md:text-base text-sm font-medium">₹{calculateCartValue}</p>
                                            </div>
                                            <div className="w-full flex items-center justify-between">
                                                <p className="xl:text-lg md:text-base text-sm font-medium">Tax</p>
                                                <p className="xl:text-lg md:text-base text-sm font-medium">₹0</p>
                                            </div>
                                            <div className="w-full flex items-center justify-between">
                                                <p className="xl:text-lg md:text-base text-sm font-medium">Discount</p>
                                                <p className="xl:text-lg md:text-base text-sm font-medium">₹0</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex border-b items-center md:p-5 p-3 justify-between ">
                                        <p className="xl:text-lg md:text-base text-sm font-medium">Total Payable Amount</p>
                                        <p className="text-2xl font-semibold">₹{calculateCartValue}</p>
                                    </div>
                                    <div className="md:p-5 p-3 w-full flex-col gap-4 flex">
                                        {user?.email && user?.email !== "" ? (
                                            <button onClick={placeOrder} disabled={loading} className="w-full rounded-lg py-2 bg-black font-medium text-white">
                                                Place Order
                                            </button>
                                        ) : (
                                            <button onClick={() => setAuthModalOpen(true)} className="w-full rounded-lg py-2 bg-black font-medium text-white">
                                                Login to place order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </ContainerWrapper>
    );
}

export function SingleCartItem({ item }: { item: CartItem }) {
    const { updateCart } = useCartContext();
    const { checkProductQuantity, quantityLoader } = useInventoryContext();
    const handleIncrement = async () => {
        const totalRequested = (item?.quantity || 0) + 1;
        const isAvailable = await checkProductQuantity(item.productId, totalRequested);

        if (isAvailable && item) {
            updateCart(item.productId, 1);
        } else {
            toast.error("Not enough quantity available.");
        }
    };

    const handleDecrement = () => {
        updateCart(item.productId, -1);
    };
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex h-full items-start gap-2">
                <div className="h-24 w-24 border overflow-hidden rounded-xl">
                    <img src={item?.display_image_url} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h3 className="xl:text-lg md:text-base text-sm font-semibold">{item?.productName}</h3>
                        <p className="text-gray-600">{item?.companyName}</p>
                    </div>
                    <p className="xl:text-lg md:text-base text-sm font-medium">{item?.quantity} Pcs</p>
                </div>
            </div>
            <div className="flex flex-col h-full justify-between">
                <p className="xl:text-lg md:text-base text-sm font-medium">
                    Total Price: <span className="text-2xl">₹{item?.quantity * item?.productPrice}</span>
                </p>
                <div className="place-self-end space-x-[1px]">
                    <button onClick={handleDecrement} disabled={quantityLoader === item.productId} className="px-5 py-2 bg-black text-white rounded-l-md">
                        <FaMinus />
                    </button>
                    <button onClick={handleIncrement} disabled={quantityLoader === item.productId} className="px-5 py-2 bg-black text-white rounded-r-md">
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}
