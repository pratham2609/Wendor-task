import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ModalsContextProps {
    addAdminModalOpen: boolean;
    setAddAdminModalOpen: Dispatch<SetStateAction<boolean>>;
    editAdminModalOpen: boolean;
    setEditAdminModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface ModalsContextProviderProps {
    children: ReactNode;
}
const ModalsContext = createContext<ModalsContextProps | undefined>(undefined);

const ModalsContextProvider: React.FC<ModalsContextProviderProps> = ({ children }) => {
    const [addAdminModalOpen, setAddAdminModalOpen] = useState<boolean>(false);
    const [editAdminModalOpen, setEditAdminModalOpen] = useState<boolean>(false);

    return (
        <ModalsContext.Provider value={{
            addAdminModalOpen,
            setAddAdminModalOpen,
            editAdminModalOpen,
            setEditAdminModalOpen
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
