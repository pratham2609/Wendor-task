import { useCartContext } from '../context/CartContext';
import { InventoryItem } from '../types/Inventory';
import { useInventoryContext } from '../context/InventoryContext';
import { Spinner } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }: { product: InventoryItem }) {
    const { cart, addToCart, updateCart } = useCartContext();
    const cartItem = cart.find((item) => item.productId === product.productId);
    const { checkProductQuantity, quantityLoader } = useInventoryContext();
    const handleIncrement = async () => {
        const totalRequested = (cartItem?.quantity || 0) + 1;
        const isAvailable = await checkProductQuantity(product.productId, totalRequested);

        if (isAvailable && cartItem) {
            updateCart(product.productId, 1);
        } else {
            toast.error("Not enough quantity available.");
        }
    };

    const handleDecrement = () => {
        updateCart(product.productId, -1);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className='w-full bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full h-[250px] '>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-cover' />
            </div>
            <div className='w-full p-3 flex gap-3 flex-col'>
                <div className='flex flex-col gap-1'>
                    <h4 className='text-gray-600'>{product.companyName}</h4>
                    <h2 className='font-semibold text-xl truncate'>{product.productName}</h2>
                </div>

                <p className='text-xl font-medium'>
                    1 for ₹{product.productPrice}
                </p>
                <p className='text-lg font-medium'>
                    Total Available: <span className={`${product.totalQuantity < 10 ? "text-danger" : "text-gray-600"}`}>{product.totalQuantity}</span>
                </p>
                <div className='w-full flex items-center justify-between'>
                    {cartItem ? (
                        <div className='flex w-full items-center justify-between gap-2'>
                            <button disabled={quantityLoader}
                                onClick={handleDecrement}
                                className='bg-black text-white rounded-lg w-[40%] h-10 flex items-center justify-center'>
                                -
                            </button>
                            <span className='text-xl font-medium'>{quantityLoader ? <Spinner size='md' color='danger' /> : cartItem.quantity}</span>
                            <button disabled={quantityLoader}
                                onClick={handleIncrement}
                                className='bg-black text-white rounded-lg w-[40%] h-10 flex items-center justify-center'>
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className='bg-black text-white w-full py-2 rounded-lg'>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function SmallProductCard({ product }: { product: InventoryItem }) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate("/product/" + product.productId)} className='w-full flex flex-col h-full bg-white rounded-xl shadow-lg border-2'>
            <div className='w-full h-[150px]'>
                <img src={product.display_image_url} alt={product.productName} className='w-full h-full object-cover' />
            </div>
            <div className='p-3 flex flex-col items-start'>
                <h4 className='font-semibold'>{product.productName}</h4>
                <p className='font-medium'>₹{product.productPrice}</p>
            </div>
        </button>
    )
}
