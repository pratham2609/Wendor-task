import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { InventoryItem } from "../types/Inventory";
import { CartItem } from "../types/Cart";

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: InventoryItem) => void;
    updateCart: (id: string, quantity: number) => void;
    loading: boolean;
    calculateCartValue: number;
}

interface CartContextProviderProps {
    children: ReactNode;
}
const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const addToCart = (item: InventoryItem) => {
        setCart([...cart, { ...item, quantity: 1 }]);
    };

    const calculateCartValue = useMemo(() => {
        if (cart.length === 0) return 0;
        return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    }, [cart]);

    const updateCart = (id: string, quantity: number) => {
        const updatedCart = cart
            .map((item) => {
                if (item.productId === id) {
                    const newQuantity = item.quantity + quantity;
                    if (newQuantity > 0) {
                        return { ...item, quantity: newQuantity };
                    }
                    return null;
                }
                return item;
            })
            .filter((item) => item !== null);

        setCart(updatedCart as CartItem[]);
    };



    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            loading,
            updateCart,
            calculateCartValue
        }}>
            {children}
        </CartContext.Provider>
    );
};


export function useCartContext(): CartContextProps {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useModalContext must be used within a CartContextProvider");
    }
    return context;
}

export { CartContext, CartContextProvider };
