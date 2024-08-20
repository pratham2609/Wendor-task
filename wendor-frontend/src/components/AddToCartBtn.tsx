import toast from "react-hot-toast";
import { useInventoryContext } from "../context/InventoryContext";
import { useCartContext } from "../context/CartContext";
import { InventoryItem } from "../types/Inventory";
import { Spinner } from "@nextui-org/react";

export default function AddToCartBtn({ product }: { product: InventoryItem }) {
    const { cart, addToCart, updateCart } = useCartContext();
    const cartItem = cart.find((item) => item.productId === product?.productId);
    const { checkProductQuantity, quantityLoader } = useInventoryContext();
    const handleIncrement = async () => {
        const totalRequested = (cartItem?.quantity || 0) + 1;
        const isAvailable = await checkProductQuantity(product?.productId, totalRequested);

        if (isAvailable && cartItem) {
            updateCart(product?.productId, 1);
        } else {
            toast.error("Not enough quantity available.");
        }
    };

    const handleDecrement = () => {
        updateCart(product?.productId, -1);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };
    return (
        <div className="w-full xl:h-10 lg:h-9 h-8">
            {cartItem ? (
                <div className='flex w-full items-center justify-between h-full gap-2'>
                    <button disabled={quantityLoader === product.productId}
                        onClick={handleDecrement}
                        className='bg-black text-white rounded-lg w-[40%] h-full flex items-center justify-center'>
                        -
                    </button>
                    <span className='xl:text-xl lg:text-lg text-base font-medium'>{quantityLoader === product.productId ? <Spinner size='md' color='danger' /> : cartItem.quantity}</span>
                    <button disabled={quantityLoader === product.productId}
                        onClick={handleIncrement}
                        className='bg-black text-white rounded-lg w-[40%] h-full flex items-center justify-center'>
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className='bg-black text-white h-full w-full xl:text-base lg:text-sm text-xs md:py-2 py-1.5 rounded-lg'>
                    Add to Cart
                </button>
            )}
        </div>
    )
}
