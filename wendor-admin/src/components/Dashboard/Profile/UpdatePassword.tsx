import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdLock, IoMdUnlock } from 'react-icons/io';
import { axiosInstance } from '../../../utils/axiosInstance';
import Input from '../../Input';

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
            toast.error("Error updating profile!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='lg:max-w-2xl w-full border border-zinc-400 rounded-lg py-6 flex flex-col gap-5 items-center justify-center'>
            <h3 className='text-xl font-medium'>Update Password</h3>
            <form onSubmit={submitHandler} className='flex flex-col gap-5 w-[60%] mx-auto h-full'>
                <div className='flex w-full flex-col gap-1'>
                    <label htmlFor='oldPassword'>Old Password</label>
                    <div className='flex border-[1.5px] border-black/50 w-full px-2 py-1 items-center rounded-md relative'>
                        <Input
                            value={formData.oldPassword}
                            className='!border-0  w-full focus:outline-none'
                            onChange={handleInputChange}
                            name='oldPassword'
                            type={showPassword.oldPassword ? "text" : "password"}
                            placeholder='Enter your Old password'
                        />
                        {showPassword.oldPassword ? (
                            <IoMdUnlock
                                onClick={() => setShowPassword(prev => ({ ...prev, oldPassword: false }))}
                                className="text-3xl cursor-pointer"
                            />
                        ) : (
                            <IoMdLock
                                onClick={() => setShowPassword(prev => ({ ...prev, oldPassword: true }))}
                                className="text-3xl cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <div className='flex w-full flex-col gap-1'>
                    <label htmlFor='newPassword'>Password</label>
                    <div className='flex border-[1.5px] border-black/50 w-full px-2 py-1 items-center rounded-md relative'>
                        <Input
                            value={formData.newPassword}
                            className='!border-0 w-full focus:outline-none'
                            onChange={handleInputChange}
                            name='newPassword'
                            type={showPassword.newPassword ? "text" : "password"}
                            placeholder='Enter your password'
                        />
                        {showPassword.newPassword ? (
                            <IoMdUnlock
                                onClick={() => setShowPassword(prev => ({ ...prev, newPassword: false }))}
                                className="text-3xl cursor-pointer"
                            />
                        ) : (
                            <IoMdLock
                                onClick={() => setShowPassword(prev => ({ ...prev, newPassword: true }))}
                                className="text-3xl cursor-pointer"
                            />
                        )}
                        {formData.newPassword.length < 8 && formData.newPassword !== "" && (
                            <span className='absolute bottom-0 left-4 text-sm text-red-500'>
                                Password should contain at least 8 letters
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex w-full flex-col gap-1'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex border-[1.5px] border-black/50 w-full px-2 py-1 items-center rounded-md relative'>
                        <Input
                            value={formData.confirmPassword}
                            className='!border-0  w-full focus:outline-none'
                            onChange={handleInputChange}
                            name='confirmPassword'
                            type={showPassword.confirmPassword ? "text" : "password"}
                            placeholder='Confirm your password'
                        />
                        {showPassword.confirmPassword ? (
                            <IoMdUnlock
                                onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: false }))}
                                className="text-3xl cursor-pointer"
                            />
                        ) : (
                            <IoMdLock
                                onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: true }))}
                                className="text-3xl cursor-pointer"
                            />
                        )}
                        {formData.confirmPassword !== formData.newPassword && formData.newPassword !== "" && formData.confirmPassword !== "" && (
                            <span className='absolute bottom-0 left-4 text-sm text-red-500'>
                                Passwords do not match
                            </span>
                        )}
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
    );
};

export default UpdatePassword;
