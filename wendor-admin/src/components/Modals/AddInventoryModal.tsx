import { useState } from "react";
import ModalProvider from "../Provider/Modal";

export default function AddInventoryModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleAddProducts = () => {
        console.log("Add Products");
    }
    return (
        <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} btnText="Add Inventory" action={handleAddProducts} title="Add Inventory">
            <div className="max-w-screen-xl">
            </div>
        </ModalProvider>
    )
}
