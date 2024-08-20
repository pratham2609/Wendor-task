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
            <div className='w-full h-[80vh] overflow-hidden lg:pt-10 md:pt-8 pt-0 flex flex-col'>
                <h1 className='font-bold xl:text-4xl lg:text-[32px] md:text-[28px] text-2xl'>Reset your password</h1>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-full h-full md:grid flex items-center md:grid-cols-2'>
                        <div className='w-full h-full md:flex hidden items-center'>
                            <img src={security} alt='Update Password' />
                        </div>
                        <div className='w-full h-full rounded-lg flex flex-col gap-5 items-center justify-center'>
                            <h3 className='xl:text-3xl lg:text-2xl text-xl font-medium'>Reset Password</h3>
                            <p className='text-center lg:text-base text-sm'>A reset link will be sent to you on this Email ID</p>
                            <form onSubmit={submitHandler} className='flex flex-col gap-5 lg:w-[70%] md:w-[90%] w-full mx-auto'>
                                <div className='flex w-full flex-col gap-1'>
                                    <label htmlFor='email'>Enter Registered Email</label>
                                    <div className='flex border-[1.5px] border-gray-300 w-full px-1.5 py-0.5 items-center rounded-lg relative'>
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
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default ForgotPassword;
