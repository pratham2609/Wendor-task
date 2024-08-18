import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../../context/AuthContext";

export default function GlobalProvider({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <AuthContextProvider>
            <Toaster />
            {children}
        </AuthContextProvider>
    )
}
