import { ReactNode } from "react";
import Navbar from "../Global/Navbar";
import Footer from "../Global/Footer";
import AuthModal from "../Modals/AuthModal";

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <main className="w-screen h-full poppins relative">
                <Navbar />
                <div className='max-w-screen-xl pt-24 xl:px-0 lg:px-12 md:px-10 px-6 py-5 mx-auto w-full flex flex-col overflow-x-hidden'>
                    {children}
                </div>
                <Footer />
            </main>
            <AuthModal />
        </>
    )
}
