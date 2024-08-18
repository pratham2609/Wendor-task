import { useEffect, useState } from "react";
import ModalProvider from "../Provider/Modal";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../Icons";
import { ProductCompanies } from "../../types/Product";
import ProductDropdown from "../Dashboard/ProductsDropdown";
import toast from "react-hot-toast";

export default function AddInventoryModal({ update }: { update: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductCompanies[]>([])

    const addInventoryFields = {
        productId: "",
        batchNo: "",
        quantity: 1,
        name: "",
        companyName: ""
    };
    const [data, setData] = useState([addInventoryFields]);
    const [rowCount, setRowCount] = useState(1);

    const deleteRow = (index: number) => {
        setRowCount(rowCount - 1);
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const addRow = () => {
        setData([...data, addInventoryFields]);
        setRowCount(rowCount + 1);
    }
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosInstance.get("/products/prod-companies")
                setProducts(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [isOpen]);

    const handleAddInventory = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/inventory/add", data);
            update();
            setLoading(false);
            setIsOpen(false);
            setData([addInventoryFields]);
            toast.success("Added successfully!");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen} full={false} loading={loading} btnText="Add Inventory" action={handleAddInventory} title="Add Inventory">
            <div className="max-h-[70vh] min-h-[40vh] h-full overflow-y-auto flex w-full flex-col gap-3">
                <div className="w-full flex justify-end">
                    <button onClick={addRow} className="bg-teal text-white font-medium px-3 py-1 rounded-md">Add Row</button>
                </div>
                <div className="w-full grid grid-cols-3 ">
                    <h1 className="font-poppins font-bold text-center">Product Name</h1>
                    <h1 className="font-poppins font-bold text-center">Batch No.</h1>
                    <h1 className="font-poppins font-bold text-center">Quantity</h1>
                </div>
                <div className="w-full flex flex-col gap-2">
                    {data.map((item, index) => (
                        <div key={index} className="w-full flex items-center gap-2">
                            <div className="w-[40%]">
                                <ProductDropdown product={item.name} items={products} setProduct={(product: ProductCompanies) => {
                                    const newData = [...data];
                                    newData[index].productId = product.id;
                                    newData[index].name = product.name;
                                    newData[index].companyName = product.company_name;
                                    setData(newData);
                                }} />
                            </div>
                            <input value={item.batchNo} onChange={(e) => {
                                const newData = [...data];
                                newData[index].batchNo = e.target.value;
                                setData(newData);
                            }} className="h-10 rounded-md px-2 w-[30%] focus:outline-none border" />
                            <input min={1} onChange={(e) => {
                                const newData = [...data];
                                newData[index].quantity = parseInt(e.target.value);
                                setData(newData);
                            }} type="number" value={item.quantity} className="h-10 px-3 w-[30%] rounded-md focus:outline-none border " />
                            <div className="flex justify-center h-full ">
                                <Tooltip isDisabled={index === 0} content="Delete row">
                                    <button disabled={index === 0} className="text-danger text-xl" onClick={() => deleteRow(index)}><DeleteIcon /></button>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ModalProvider>
    )
}
