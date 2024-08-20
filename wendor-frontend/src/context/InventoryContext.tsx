import { createContext, useContext, useState, ReactNode } from "react";
import { InventoryRes } from "../types/Inventory";
import { axiosInstance } from "../utils/axiosInstance";
import { useFetchInventory } from "../hooks/fetchInventoryData";

interface InventoryContextProps {
    inventory: InventoryRes;
    loading: boolean;
    quantityLoader: string | null;
    checkProductQuantity: (productId: string, requestedQuantity: number) => Promise<boolean>;
    update: () => void;
}

interface InventoryContextProviderProps {
    children: ReactNode;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

const InventoryContextProvider: React.FC<InventoryContextProviderProps> = ({ children }) => {
    const [reload, setReload] = useState(false);
    const { inventory, loading } = useFetchInventory({ reload: reload });
    const [quantityLoader, setQuantityLoader] = useState<string | null>(null);
    const update = () => {
        setReload(!reload);
    }
    const checkProductQuantity = async (productId: string, requestedQuantity: number): Promise<boolean> => {
        setQuantityLoader(productId);
        try {
            const res = await axiosInstance.get(`/inventory/product/one/quantity/${productId}`);
            return res.data.data >= requestedQuantity;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setQuantityLoader(null);
        }
    };

    return (
        <InventoryContext.Provider value={{
            inventory,
            loading,
            checkProductQuantity,
            quantityLoader,
            update
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export function useInventoryContext(): InventoryContextProps {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error("useInventoryContext must be used within an InventoryContextProvider");
    }
    return context;
}

export { InventoryContext, InventoryContextProvider };
