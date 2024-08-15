import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../../context/AuthContext";
import { ModalsContextProvider } from "../../context/ModalsContext";

export default function GlobalProvider({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <AuthContextProvider>
            <ModalsContextProvider>
                <Toaster />
                {children}
            </ModalsContextProvider>
        </AuthContextProvider>
    )
}
