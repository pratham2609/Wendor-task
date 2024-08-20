import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

export default function GlobalProvider({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <ChakraProvider>
            <AuthContextProvider>
                <Toaster />
                {children}
            </AuthContextProvider>
        </ChakraProvider>
    )
}
