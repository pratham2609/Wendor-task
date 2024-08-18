import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ModalsContextProps {
    authModalOpen: boolean;
    setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface ModalsContextProviderProps {
    children: ReactNode;
}
const ModalsContext = createContext<ModalsContextProps | undefined>(undefined);

const ModalsContextProvider: React.FC<ModalsContextProviderProps> = ({ children }) => {
    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

    return (
        <ModalsContext.Provider value={{
            authModalOpen,
            setAuthModalOpen
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
