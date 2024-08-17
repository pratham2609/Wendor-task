import { useState } from "react";
import ModalProvider from "../Provider/Modal";

export default function EditProductModal({ id, isOpen, setIsOpen }: { id: string, isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const handleAddProducts = () => {
        console.log("Add Products");
    }
    const [loading, setLoading] = useState(false);
    return (
        <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} full={false} action={handleAddProducts} title="Edit Product">
            <div className="max-w-screen-xl">
            </div>
        </ModalProvider>
    )
}
