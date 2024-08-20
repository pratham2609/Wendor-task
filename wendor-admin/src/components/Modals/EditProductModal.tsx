import { useState } from "react";
import ModalProvider from "../Provider/Modal";
import { Product } from "../../types/Product";
import Input from "../Input";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axiosInstance";
import { Categories } from "../../utils/constants";

export default function EditProductModal({ update, product, isOpen, setIsOpen }: { product: Product, isOpen: boolean, setIsOpen: (val: boolean) => void, update: () => void }) {
    const handleEditProduct = async () => {
        if (!editingValue.barcodeNo || !editingValue.name || !editingValue.category || !editingValue.price) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            const res = await axiosInstance.put("/products/" + product.id, editingValue);
            setEditingValue(res.data.data);
            toast.success("Product updated successfully!")
            update();
        } catch (error) {
            console.log(error);
            toast.error("Error updating product!");
        } finally {
            setLoading(false);
        }
    }
    const [editingValue, setEditingValue] = useState<Product | null>(product);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setEditingValue({ ...editingValue, [e.target.name]: e.target.value });
    }
    return (
        <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} full={false} action={handleEditProduct} title="Edit Product">
            <div className="w-full mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-[80%] mx-auto">
                    <div className="w-full flex items-center justify-between ">
                        <p className="w-[30%]">Name:</p>
                        <Input className="!border-zinc-200 border w-full !rounded-md" name="name" onChange={handleOnChange} value={editingValue?.name} placeholder="Enter product name" />
                    </div>
                    <div className="w-full flex items-center justify-between ">
                        <p className="w-[30%]">Barcode No:</p>
                        <Input className="!border-zinc-200 border w-full !rounded-md" name="barcodeNo" onChange={handleOnChange} value={editingValue?.barcodeNo} placeholder="Enter product Barcode" />
                    </div>
                    <div className="w-full flex items-center justify-between ">
                        <p className="w-[30%]">Price:</p>
                        <Input className="!border-zinc-200 border w-full !rounded-md" type="number" name="price" onChange={handleOnChange} value={editingValue?.price} placeholder="Enter product Price" />
                    </div>
                    <div className="w-full flex items-center justify-between ">
                        <p className="w-[30%]">Image URL:</p>
                        <Input className="!border-zinc-200 border w-full !rounded-md" type="string" name="display_image_url" onChange={handleOnChange} value={editingValue?.display_image_url} placeholder="Enter Image URL" />
                    </div>
                    <div className="w-full flex items-center justify-between ">
                        <p className="w-[30%]">Category:</p>
                        <select className="px-2 py-3 w-full focus:outline-none border-zinc-200 border rounded-md" name="category" value={editingValue.category} onChange={handleOnChange}>
                            {Categories.map((category: string) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </ModalProvider>
    )
}
