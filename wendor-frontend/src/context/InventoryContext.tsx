import { createContext, useContext, useState, ReactNode } from "react";
import { InventoryRes } from "../types/Inventory";
import { axiosInstance } from "../utils/axiosInstance";
import { useFetchInventory } from "../hooks/fetchInventoryData";

interface InventoryContextProps {
    inventory: InventoryRes;
    fetchInventory: ({ page, pageSize, category, company }: { page?: number, pageSize?: number, category?: string, company?: string }) => Promise<void>;
    loading: boolean;
    quantityLoader: boolean;
    checkProductQuantity: (productId: string, requestedQuantity: number) => Promise<boolean>;
}

interface InventoryContextProviderProps {
    children: ReactNode;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

const InventoryContextProvider: React.FC<InventoryContextProviderProps> = ({ children }) => {
    const { inventory, fetchInventory, loading } = useFetchInventory({});
    const [quantityLoader, setQuantityLoader] = useState(false);

    const checkProductQuantity = async (productId: string, requestedQuantity: number): Promise<boolean> => {
        setQuantityLoader(true);
        try {
            const res = await axiosInstance.get(`/inventory/product/one/quantity/${productId}`);
            return res.data.data >= requestedQuantity;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setQuantityLoader(false);
        }
    };

    return (
        <InventoryContext.Provider value={{
            inventory,
            fetchInventory,
            loading,
            checkProductQuantity,
            quantityLoader,
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
