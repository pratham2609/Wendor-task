import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Order } from "../types/Sales";

interface ModalsContextProps {
    authModalOpen: boolean;
    setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
    orderModalOpen: { isOpen: boolean, order: Order };
    setOrderModalOpen: Dispatch<SetStateAction<{ isOpen: boolean, order: Order }>>;
}

interface ModalsContextProviderProps {
    children: ReactNode;
}
const ModalsContext = createContext<ModalsContextProps | undefined>(undefined);

const ModalsContextProvider: React.FC<ModalsContextProviderProps> = ({ children }) => {
    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [orderModalOpen, setOrderModalOpen] = useState<{ isOpen: boolean, order: Order }>({
        isOpen: false,
        order: null
    });
    return (
        <ModalsContext.Provider value={{
            authModalOpen,
            setAuthModalOpen,
            orderModalOpen,
            setOrderModalOpen
        }}>
            {children}
        </ModalsContext.Provider>
    );
};


export function useModalContext(): ModalsContextProps {
    const context = useContext(ModalsContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalsContextProvider");
    }
    return context;
}

export { ModalsContext, ModalsContextProvider };
