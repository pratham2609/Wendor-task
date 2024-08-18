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

export default function AddProductsModal({ update = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);

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

    const [newCompany, setNewCompany] = useState(false);
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

    const [displayImageType, setDisplayImageType] = useState({
        type: "",
        index: -1
    });
    return (
        <ModalProvider isOpen={isOpen} fullScreen={true} setIsOpen={setIsOpen} loading={loading} btnText="Add Products" action={handleSubmit} title="Add Products">
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
                                <th className="border-r-1 p-2 w-[10%]">Category</th>
                                <th className="border-r-1 p-2">Price</th>
                                <th className="border-r-1 p-2">Company Name</th>
                                <th className="border-r-1 p-2">Display Image URL</th>
                                <th className="border-r-1 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-r-1 px-2 py-3">
                                        <input required className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.name} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].name = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 px-2 w-[17%] py-3">
                                        <input required className="border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.barcodeNo} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].barcodeNo = e.target.value;
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 w-min px-2 py-3">
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
                                    <td className="border-r-1 px-2 py-3 max-w-20">
                                        <input required min={1} className=" border focus:outline-none p-1 px-2 rounded-lg w-full " type="number" value={item.price} onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].price = parseFloat(e.target.value);
                                            setData(newData);
                                        }} />
                                    </td>
                                    <td className="border-r-1 px-2 w-44 py-3">
                                        {newCompany ?
                                            <div className="w-full flex items-center gap-1">
                                                <input className=" border focus:outline-none w-full p-1 px-2 rounded-lg " type="text" value={item.company_name} onChange={(e) => {
                                                    const newData = [...data];
                                                    newData[index].company_name = e.target.value;
                                                    setData(newData);
                                                }} />
                                                <ImCross className="text-danger cursor-pointer" onClick={() => setNewCompany(false)} />
                                            </div> :
                                            <CompaniesDropdown setNewCompany={setNewCompany} setCompany={(company: Company) => {
                                                const newData = [...data];
                                                newData[index].company_name = company.company_name;
                                                newData[index].companyId = company.id;
                                                setData(newData);
                                            }} text={item.company_name ?? "Select"} items={companies} />
                                        }
                                    </td>
                                    <td className="border-r-1 px-2 w-[20%] py-3">
                                        {displayImageType.index === index ?
                                            (displayImageType.type === "url" && <div className="w-full h-full flex gap-1 items-center">
                                                <input className=" border w-full focus:outline-none p-1 px-2 rounded-lg" type="text" value={item.display_image_url} onChange={(e) => {
                                                    const newData = [...data];
                                                    newData[index].display_image_url = e.target.value;
                                                    setData(newData);
                                                }} />
                                                <ImCross className="text-danger cursor-pointer" onClick={() => setDisplayImageType({
                                                    type: "",
                                                    index: -1
                                                })} />
                                            </div>)
                                            : (displayImageType.index === index && displayImageType.type === "file" ?
                                                <>hello</>
                                                // <div className="w-full relative">
                                                //     <label htmlFor='prodFile' className='w-full flex cursor-pointer py-5 justify-center items-center h-full'>
                                                //         {data[index].file ? "Uploaded" :
                                                //             <LuUploadCloud className='text-4xl text-teal' />
                                                //         }
                                                //         <h1>hi</h1>
                                                //         <input required onChange={(e) => {
                                                //             e.preventDefault();
                                                //             const file = e.target.files[0];
                                                //             if (file.size > 1000000) {
                                                //                 toast.error('File size should be less than 1MB')
                                                //                 return;
                                                //             }
                                                //             const newData = [...data];
                                                //             const reader = new FileReader();
                                                //             reader.onloadend = () => {
                                                //                 newData[index].file = reader.result as string;
                                                //                 setData(newData);
                                                //             }
                                                //         }} name='prodFile' id='prodFile' className='w-full h-full top-0 right-0 left-0 bottom-0 absolute z-10' hidden={true} type='file' accept='.png, .jpg, .jpeg, .pdf' placeholder='Upload Pan Card' />
                                                //     </label>
                                                // </div>
                                                : <div className="flex items-center w-full gap-1">
                                                    <button className="w-full text-center py-1 rounded-lg bg-black text-white" onClick={() => setDisplayImageType({
                                                        type: "file",
                                                        index
                                                    })}>File</button>
                                                    <button onClick={() => setDisplayImageType({
                                                        type: "url",
                                                        index
                                                    })}
                                                        className="w-full text-center py-1 rounded-lg bg-black text-white">URL</button>
                                                </div>)
                                        }
                                    </td>
                                    <td className="px-2 py-3 items-center">
                                        <div className="flex justify-center h-full ">
                                            <Tooltip isDisabled={index === 0} content="Delete row">
                                                <button disabled={index === 0} className="text-danger text-xl" onClick={() => deleteRow(index)}><DeleteIcon /></button>
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
