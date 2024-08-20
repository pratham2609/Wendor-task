import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdLock, IoMdUnlock } from 'react-icons/io';
import Input from '../Global/Input';
import { axiosInstance } from '../../utils/axiosInstance';
import security from "../../assets/secure.avif"

interface PasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ShowPasswordState {
    oldPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
}

const UpdatePassword: React.FC = () => {
    const [formData, setFormData] = useState<PasswordFormData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState<ShowPasswordState>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.put("/user/password", formData);
            toast.success("Password updated successfully");
            setShowPassword({
                oldPassword: false,
                newPassword: false,
                confirmPassword: false
            });
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.log(error)
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full place-items-center grid grid-cols-2'>
            <div className='w-full h-full flex items-center'>
                <img src={security} alt='Update Password' />
            </div>
            <div className='w-full h-full rounded-lg flex flex-col gap-5 items-center justify-center'>
                <h3 className='text-xl font-medium'>Update Password</h3>
                <form onSubmit={submitHandler} className='flex flex-col gap-5 w-[70%] mx-auto'>
                    <div className="flex flex-col border border-gray-300 rounded-lg w-full">
                        <div className='w-full flex justify-between items-center px-3'>
                            <Input name="oldPassword" className='!bg-transparent !px-0 w-full !border-0' placeholder="Enter current password" value={formData.oldPassword} type={showPassword.oldPassword ? "text" : "password"} onChange={handleInputChange} />
                            {showPassword.oldPassword ? <IoMdUnlock onClick={() => setShowPassword((prev) => ({ ...prev, oldPassword: false }))} className="text-2xl cursor-pointer" />
                                : <IoMdLock onClick={() => setShowPassword((prev) => ({ ...prev, oldPassword: true }))} className="text-2xl cursor-pointer" />}
                        </div>
                        <div className="w-full h-px bg-gray-300" />
                        <div className='w-full flex justify-between items-center px-3'>
                            <Input name="newPassword" className='!bg-transparent w-full !px-0 !border-0' placeholder="Enter new password" value={formData.newPassword} type={showPassword.newPassword ? "text" : "password"} onChange={handleInputChange} />
                            {showPassword.newPassword ? <IoMdUnlock onClick={() => setShowPassword((prev) => ({ ...prev, newPassword: false }))} className="text-2xl cursor-pointer" />
                                : <IoMdLock onClick={() => setShowPassword((prev) => ({ ...prev, newPassword: true }))} className="text-2xl cursor-pointer" />}
                        </div>
                        <div className="w-full h-px bg-gray-300" />
                        <div className='w-full flex justify-between items-center px-3'>
                            <Input name="confirmPassword" className='!bg-transparent w-full !px-0 !border-0' placeholder="Confirm new password" value={formData.confirmPassword} type={showPassword.confirmPassword ? "text" : "password"} onChange={handleInputChange} />
                            {showPassword.confirmPassword ? <IoMdUnlock onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: false }))} className="text-2xl cursor-pointer" />
                                : <IoMdLock onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: true }))} className="text-2xl cursor-pointer" />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white p-3 rounded-md"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
