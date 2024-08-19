import { ReactNode } from "react";
import Navbar from "../Global/Navbar";
import Footer from "../Global/Footer";
import AuthModal from "../Modals/AuthModal";

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <main className="w-screen h-full poppins relative">
                <Navbar />
                {children}
                <Footer />
            </main>
            <AuthModal />
        </>
    )
}
