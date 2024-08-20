import React, { useState } from 'react'
import Input from '../components/Global/Input'
import { IoMdLock, IoMdUnlock } from 'react-icons/io';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axiosInstance';
import { useSearchParams } from 'react-router-dom';
import { useModalContext } from '../context/ModalsContext';
import ContainerWrapper from '../components/Global/ContainerWrapper';
import security from "../assets/secure.avif"

export default function ResetPassword() {
    const [loading, setLoading] = React.useState(false);
    const { setAuthModalOpen } = useModalContext();
    const [reset, setReset] = React.useState(false);
    const [searchParams] = useSearchParams();
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handlePasswordCheck = formData.password.length < 8 && formData.password != formData.confirmPassword;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (handlePasswordCheck) {
            return toast.error('Password should contain atleast 8 letters and should match with confirm password')
        }
        try {
            const res = await axiosInstance.post("/user/reset-password", {
                token: searchParams.get('token'),
                password: formData.password
            })
            if (res.data?.message) {
                toast.success("Password Reset Successfully");
                setFormData({
                    password: "",
                    confirmPassword: ""
                });
                setReset(true);

            }
        } catch (error) {
            toast.error(error.response.data ?? "Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <ContainerWrapper>

            <div className='w-full h-[80vh] overflow-hidden flex flex-col xl:gap-10 md:gap-8 gap-6 lg:pt-10 md:pt-8 pt-0'>
                {reset ? <div className="w-full flex flex-col gap-5">
                    <div className='flex flex-col gap-3 items-center'>
                        <h2 className=' xl:text-4xl lg:text-3xl text-2xl font-semibold'>Password has been Reset!</h2>
                        <button onClick={() => setAuthModalOpen(true)} className=' xl:text-2xl md:text-xl text-base text-center bg-black text-white px-4 py-2 rounded-lg'>Login to continue</button>
                    </div>
                </div> :
                    <>
                        <div className=''>
                            <h1 className="font-bold xl:text-4xl lg:text-[32px] md:text-[28px] text-2xl">
                                Reset Password
                            </h1>
                        </div>
                        <div className='w-full h-full md:grid md:grid-cols-2 flex items-center'>
                            <div className='w-full h-full md:flex hidden items-center'>
                                <img src={security} alt='Update Password' className='w-full object-scale-down h-full' />
                            </div>
                            <div className='w-full h-full flex flex-col items-center justify-center'>
                                <h3 className='xl:text-3xl lg:text-2xl text-xl font-medium'>Reset your password</h3>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-10 lg:w-2/3 md:w-[90%] w-full justify-center pt-10 mx-auto">
                                    <div className="flex flex-col border border-gray-300 rounded-lg w-full">
                                        <div className='w-full flex justify-between items-center px-3'>
                                            <Input name="password" className='!bg-transparent !px-0 !border-0' placeholder="Enter new password" value={formData.password} type={show.password ? "text" : "password"} onChange={handleChange} />
                                            {show.password ? <IoMdUnlock onClick={() => setShow((prev) => ({ ...prev, password: false }))} className="text-2xl cursor-pointer" />
                                                : <IoMdLock onClick={() => setShow((prev) => ({ ...prev, password: true }))} className="text-2xl cursor-pointer" />}
                                        </div>
                                        <div className="w-full h-px bg-gray-300" />
                                        <div className='w-full flex justify-between items-center px-3'>
                                            <Input name="confirmPassword" className='!bg-transparent !px-0 !border-0' placeholder="Confirm password" value={formData.confirmPassword} type={show.confirmPassword ? "text" : "password"} onChange={handleChange} />
                                            {show.confirmPassword ? <IoMdUnlock onClick={() => setShow((prev) => ({ ...prev, confirmPassword: false }))} className="text-2xl cursor-pointer" />
                                                : <IoMdLock onClick={() => setShow((prev) => ({ ...prev, confirmPassword: true }))} className="text-2xl cursor-pointer" />}
                                        </div>
                                    </div>
                                    <button disabled={loading} className="w-full text-xl font-medium bg-black hover:bg-opacity-100 bg-opacity-70 transition py-2 text-white rounded-lg ">Reset</button>
                                </form>
                            </div>
                        </div>
                    </>
                }
            </div>
        </ContainerWrapper>
    )
}
