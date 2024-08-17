import { useEffect, useState } from "react";
import ModalProvider from "../Provider/Modal";
import { SingleProductInventory } from "../../types/Inventory";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "../Icons";
import toast from "react-hot-toast";

export default function SeeProductInventoryModal({ id, isOpen, setIsOpen }: { id: string, isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const handleAddProducts = () => {
        console.log("Add Products");
    }
    const [prodData, setProdData] = useState<SingleProductInventory[] | null>(null);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchProductDataFromInventory = async () => {
            try {
                const res = await axiosInstance.get("/inventory/product/" + id)
                setProdData(res.data.data);
                setTotalQuantity(res.data.data.reduce((acc, curr) => acc + curr.quantity, 0));
            } catch (error) {
                console.log(error.message);
            }
        }
        if (id) {
            fetchProductDataFromInventory();
        }
    }, [id, update]);

    const [editingRow, setEditingRow] = useState<SingleProductInventory | null>(null);
    const [loading, setLoading] = useState(false);

    const deleteBatchInventory = async (id: string) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/inventory/product/batch/${id}`);
            setUpdate(true);
            toast.success("Batch deleted!");
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveBatchRow = async () => {
        setLoading(true);
        try {
            await axiosInstance.put(`/inventory/product/batch/${editingRow?.id}`, {
                batchNo: editingRow?.batchNo,
                quantity: editingRow?.quantity
            });
            setUpdate(true);
            toast.success("Batch updated!");
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen} action={handleAddProducts} title="Product Inventory">
            {prodData && prodData.length > 0 ? <div className="w-full px-6 h-full flex gap-10 poppins">
                <div className="flex w-[20%] flex-col gap-3 pt-5">
                    <h1 className="text-3xl font-medium whitespace-nowrap">{prodData[0].productName}</h1>
                    <h4 className="text-xl text-gray-600 whitespace-nowrap">{prodData[0].companyName}</h4>
                    <h4 className="text-2xl whitespace-nowrap">Quantity: {totalQuantity} Pcs</h4>
                    <h4 className="text-2xl whitespace-nowrap">Price: ₹{prodData[0].productPrice}</h4>
                    <h4 className="text-2xl whitespace-nowrap">Total Batches: {prodData.length}</h4>
                </div>
                <div className="h-full w-px bg-gray-400" />
                <div className="h-full w-full pt-5 flex flex-col gap-5">
                    <h1 className="text-xl">Batch wise inventory</h1>
                    <div className="border-2 rounded-lg">
                        <table className="w-full">
                            <thead className="border-b-1">
                                <tr className="">
                                    <th className="p-2">SNo.</th>
                                    <th className="p-2">Batch ID</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prodData.map((item, index) => (
                                    <tr key={item.id} className="border-b-1">
                                        <td className="text-center p-2">{index + 1}</td>
                                        <td className="text-center p-2">
                                            {editingRow?.id === item.id ?
                                                <input required className=" border focus:outline-none p-1 px-2 rounded-lg max-w-24" value={editingRow.batchNo} onChange={(e) => setEditingRow({
                                                    ...editingRow, batchNo: e.target.value
                                                })} /> : item.batchNo}
                                        </td>
                                        <td className="text-center p-2">{
                                            editingRow?.id === item.id ? <input required className=" border focus:outline-none p-1 px-2 rounded-lg max-w-24" value={editingRow.quantity} onChange={(e) => setEditingRow({
                                                ...editingRow,
                                                quantity: e.target.value
                                            })} /> : item.quantity}
                                        </td>
                                        <td className="flex items-center justify-center p-2">
                                            <div className="relative flex items-center gap-2">
                                                {editingRow?.id === item.id ?
                                                    <><button onClick={() => {
                                                        if (editingRow.batchNo && editingRow.quantity) {
                                                            saveBatchRow();
                                                        }
                                                    }} className="bg-green-400 rounded-md text-white text-sm px-2 py-1">Save</button>
                                                        <button onClick={() => setEditingRow(null)} className="bg-black rounded-md text-white text-sm px-2 py-1">Cancel</button>
                                                    </> : <>
                                                        <Tooltip content="Edit Batch">
                                                            <button className="focus:outline-none" onClick={() => setEditingRow(item)}>
                                                                <EditIcon />
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip color="danger" content="Delete batch">
                                                            <button disabled={loading} onClick={() => deleteBatchInventory(item.id)} className="text-lg text-danger active:opacity-50">
                                                                <DeleteIcon />
                                                            </button>
                                                        </Tooltip>
                                                    </>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : <div>Loading....</div>}
        </ModalProvider>
    )
}
