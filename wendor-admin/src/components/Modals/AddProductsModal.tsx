import { useEffect, useState } from "react";
import ModalProvider from "../Provider/Modal";
import { ProductCreation } from "../../types/Product";
import { DeleteIcon } from "../Icons";
import { Tooltip } from "@nextui-org/react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Categories } from "../../utils/constants";
import { Company } from "../../types/Companies";

export default function AddProductsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axiosInstance.get("/company");
                setCompanies(res.data.data.companies);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCompanies();
    }, [])
    const handleAddProducts = () => {
        console.log("Add Products");
    };
    const [rowCount, setRowCount] = useState(1);
    const productCreationFields = {
        name: "",
        category: "",
        price: 1,
        companyName: "",
        display_image_url: "",
        barcodeNo: ""
    };

    const [data, setData] = useState<ProductCreation[]>([productCreationFields]);

    const deleteRow = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
        setRowCount(rowCount - 1);
    };

    const addRow = () => {
        setData([...data, productCreationFields]);
        setRowCount(rowCount + 1);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/product", { products: data });
            console.log(res.data);
            setLoading(false);
            setIsOpen(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }
    return (
        <ModalProvider isOpen={isOpen} fullScreen={true} setIsOpen={setIsOpen} loading={loading} btnText="Add Products" action={handleAddProducts} title="Add Products">
            <div className="w-full h-full flex flex-col gap-3">
                <div className="w-full justify-end flex">
                    <button className="bg-pink text-white px-2 py-1 rounded-lg" onClick={addRow}>Add Row</button>
                </div>
                <div className="border-1 rounded-lg">
                    <table className="w-full">
                        <thead className="border-b-1">
                            <tr>
                                <th className="border-r-1 p-2">Name</th>
                                <th className="border-r-1 p-2">Barcode No.</th>
                                <th className="border-r-1 p-2">Category</th>
                                <th className="border-r-1 p-2">Price</th>
                                <th className="border-r-1 p-2">Company Name</th>
                                <th className="border-r-1 p-2">Display Image URL</th>
                                <th className="border-r-1 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-r-1 flex w-full justify-center px-2 py-3">
                                        <input className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.name} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].name = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 flex w-full justify-center px-2 py-3">
                                        <input className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.barcodeNo} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].barcodeNo = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 px-2 py-3">
                                        <select onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].category = e.target.value;
                                            setData(newData);
                                        }} className="border rounded-lg w-full px-2 py-1 focus:outline-none" value={item.category}>
                                            {Categories.map((category: string) => (
                                                <option value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border-r-1 px-2 py-3">
                                        <input className=" border focus:outline-none p-1 px-2 rounded-lg w-full max-w-20" type="number" value={item.price} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].price = parseFloat(e.target.value);
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 px-2 py-3">
                                        {/* <input className=" border focus:outline-none p-1 px-2 rounded-lg " type="text" value={item.companyName} onChange={(e) => {
                                        const newData = [...data];
                                        newData[index].companyName = e.target.value;
                                        setData(newData);
                                    }} /> */}
                                        <select onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].category = e.target.value;
                                            setData(newData);
                                        }} className="border rounded-lg px-2 py-1 w-full focus:outline-none" value={item.category}>
                                            {companies.map((company: Company) => (
                                                <option value={company.company_name}>
                                                    {company.company_name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border-r-1 px-2 py-3">
                                        <input className=" border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.display_image_url} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].display_image_url = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="flex justify-center h-full px-2 py-3 items-center">
                                        <Tooltip isDisabled={index === 0} content="Delete row">
                                            <button disabled={index === 0} className="text-danger text-xl" onClick={() => deleteRow(index)}><DeleteIcon /></button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ModalProvider>
    )
}
