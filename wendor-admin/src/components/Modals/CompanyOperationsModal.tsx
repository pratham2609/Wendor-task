import { useState } from "react";
import Input from "../Input";
import ModalProvider from "../Provider/Modal";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { Company } from "../../types/Companies";

export default function CompanyOperationsModal({ type = "add", company, update }: { type?: string, company?: Company, update: () => void }) {
    const [companyName, setCompanyName] = useState(company?.company_name);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (type === "add") {
                await axiosInstance.post("/company", {
                    company_name: companyName
                });
            } else {
                await axiosInstance.put(`/company/${company?.id}`, {
                    company_name: companyName
                });
            }
            toast.success("Company Added Successfully!");
            setCompanyName(null);
            setIsOpen(false);
            update();
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data)
        } finally {
            setLoading(false);
        }
    };
    return (
        <ModalProvider loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} btnText={type === "add" ? "Add Company" : "edit"} full={false} action={handleSubmit} title={type === "add" ? "Add New Company" : "Edit Company"} >
            <Input placeholder="Enter Company Name" className="border border-gray-300 rounded-lg" name="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </ModalProvider >
    )
}
