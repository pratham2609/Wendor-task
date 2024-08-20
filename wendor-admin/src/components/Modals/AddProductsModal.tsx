import { useEffect, useState } from "react";
import ModalProvider from "../Provider/Modal";
import { ProductCreation } from "../../types/Product";
import { DeleteIcon } from "../Icons";
import { Tooltip } from "@nextui-org/react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Categories } from "../../utils/constants";
import { Company } from "../../types/Companies";
import CompaniesDropdown from "../Dashboard/CompaniesDropdown";
import { ImCross } from "react-icons/im";
// import { LuUploadCloud } from "react-icons/lu";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

export default function AddProductsModal({ update = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [newCompanyIndex, setNewCompanyIndex] = useState<number | null>(null);
    const [newCompany, setNewCompany] = useState<string | null>(null);

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
    }, []);

    const [rowCount, setRowCount] = useState(1);
    const productCreationFields = {
        name: "",
        category: Categories[0],
        price: 1,
        company_name: null,
        display_image_url: null,
        file: null,
        barcodeNo: "",
        companyId: null
    };

    const [data, setData] = useState<ProductCreation[]>([productCreationFields]);

    const deleteRow = (index: number) => {
        setRowCount(rowCount - 1);
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };
    const addRow = () => {
        setData([...data, productCreationFields]);
        setRowCount(rowCount + 1);
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/products", data);
            setIsOpen(false);
            toast.success("Products added successfully");
            setData([productCreationFields]);
            return update();
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }
    return (
        <ModalProvider isOpen={isOpen} fullScreen={true} setIsOpen={setIsOpen} loading={loading} btnText="Add Products" action={handleSubmit} title="Add Products">
            <div className="w-full h-full flex flex-col xl:px-5 lg:px-3 px-1 xl:py-2 py-1 gap-3">
                <div className="w-full justify-end flex">
                    <button className="bg-black text-white xl:text-base text-sm px-2 py-1 rounded-lg" onClick={addRow}>Add Row</button>
                </div>
                <div className=" xl:max-h-[77vh] w-full h-full border-b-2 overflow-y-auto overflow-x-auto">
                    <table className="w-full border-1 ">
                        <thead className="border-b-1 sticky xl:text-base lg:text-sm text-xs top-0 bg-gray-700 z-10 text-white">
                            <tr>
                                <th className="border-r-1 p-2">Name</th>
                                <th className="border-r-1 p-2">Barcode No.</th>
                                <th className="border-r-1 p-2 w-[10%]">Category</th>
                                <th className="border-r-1 p-2">Price</th>
                                <th className="border-r-1 p-2">Company Name</th>
                                <th className="border-r-1 p-2">Display Image URL</th>
                                <th className="border-r-1 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="xl:text-base lg:text-sm text-xs">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-r-1 lg:w-[17%] xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5">
                                        <input required className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.name} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].name = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 lg:w-[17%] xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5">
                                        <input required className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.barcodeNo} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].barcodeNo = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 lg:w-min xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5">
                                        <select onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].category = e.target.value;
                                            setData(newData);
                                        }} className="border rounded-lg w-full px-2 py-1 focus:outline-none" value={item.category}>
                                            {Categories.map((category: string) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border-r-1 xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5 lg:max-w-20">
                                        <input required min={1} className=" border focus:outline-none p-1 px-2 rounded-lg w-full " type="number" value={item.price} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].price = parseFloat(e.target.value);
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 lg:w-[17%] xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5">
                                        {newCompanyIndex === index ?
                                            <div className="w-full flex items-center gap-1">
                                                <input className=" border focus:outline-none w-full p-1 px-2 rounded-lg " type="text" value={newCompany} onChange={(e) => {
                                                    setNewCompany(e.target.value)
                                                }} />
                                                <FaCheck className="cursor-pointer text-green-600" onClick={() => {
                                                    const newData = [...data];
                                                    newData[index].company_name = newCompany;
                                                    setData(newData);
                                                    setCompanies([
                                                        ...companies,
                                                        { company_name: newCompany, id: null, createdAt: null, updatedAt: null }
                                                    ]);
                                                    setNewCompany(null);
                                                    setNewCompanyIndex(null);
                                                }} />
                                                <ImCross className="text-danger cursor-pointer" onClick={() => setNewCompanyIndex(null)} />
                                            </div> :
                                            <CompaniesDropdown setNewCompany={() => setNewCompanyIndex(index)} setCompany={(company: Company) => {
                                                const newData = [...data];
                                                newData[index].company_name = company.company_name;
                                                newData[index].companyId = company.id;
                                                setData(newData);
                                            }} text={item.company_name ?? "Select"} items={companies} />
                                        }
                                    </td>
                                    <td className="border-r-1 lg:w-[20%] xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5">
                                        <div className="w-full h-full flex gap-1 items-center">
                                            <input className=" border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.display_image_url} onChange={(e) => {
                                                const newData = [...data];
                                                newData[index].display_image_url = e.target.value;
                                                setData(newData);
                                            }} />
                                        </div>
                                    </td>
                                    <td className="xl:px-2 px-1 xl:py-3 lg:py-2 py-1.5 items-center">
                                        <div className="flex justify-center h-full ">
                                            <Tooltip isDisabled={index === 0} content="Delete row">
                                                <button disabled={index === 0} className="text-danger xl:text-xl lg:text-lg text-base" onClick={() => deleteRow(index)}><DeleteIcon /></button>
                                            </Tooltip>
                                        </div>
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
