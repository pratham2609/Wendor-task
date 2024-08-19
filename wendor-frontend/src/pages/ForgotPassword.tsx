import React, { useState } from 'react';
import toast from 'react-hot-toast';
import security from "../assets/secure.avif"
import { axiosInstance } from '../utils/axiosInstance';
import Input from '../components/Global/Input';
import ContainerWrapper from '../components/Global/ContainerWrapper';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const submitHandler = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post("/user/forgot-password", { email });
            toast.success("Password updated successfully");
            setEmail(null);
        } catch (error) {
            toast.error(error?.response?.data ?? "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerWrapper>
            <div className='w-full h-full place-items-center grid grid-cols-2'>
                <div className='w-full h-full flex items-center'>
                    <img src={security} alt='Update Password' />
                </div>
                <div className='w-full h-full rounded-lg flex flex-col gap-5 items-center justify-center'>
                    <h3 className='text-xl font-medium'>Reset Password</h3>
                    <p>A reset link will be sent to you on this Email ID</p>
                    <form onSubmit={submitHandler} className='flex flex-col gap-5 w-[70%] mx-auto'>
                        <div className='flex w-full flex-col gap-1'>
                            <label htmlFor='email'>Enter Registered Email</label>
                            <div className='flex border-[1.5px] border-black/50 w-full px-2 py-1 items-center rounded-md relative'>
                                <Input
                                    value={email}
                                    className='!border-0  w-full focus:outline-none'
                                    onChange={(e) => setEmail(e.target.value)}
                                    name='oldPassword'
                                    type={"email"}
                                    placeholder='Enter your email'
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white p-3 rounded-md"
                        >
                            {loading ? "Sending..." : "Get Reset Email"}
                        </button>
                    </form>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default ForgotPassword;
