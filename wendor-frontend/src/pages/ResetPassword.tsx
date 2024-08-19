/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Input from '../components/Global/Input'
import { IoMdLock, IoMdUnlock } from 'react-icons/io';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModalContext } from '../context/ModalsContext';
import { useAuthContext } from '../context/AuthContext';

export default function ResetPassword() {
    const [loading, setLoading] = React.useState(false);
    const { setAuthModalOpen } = useModalContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
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

    useEffect(() => {
        if (!searchParams.get('token') || (user.id && user.id != "")) return navigate("/");
    }, [user])
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
        <div className='w-full h-[90vh] pt-10 flex flex-col gap-10'>
            {!reset ? <div className="w-full flex flex-col gap-5">
                <div className='flex flex-col gap-3 items-center'>
                    <h2 className=' text-4xl font-semibold'>Password has been Reset!</h2>
                    <button onClick={() => setAuthModalOpen(true)} className=' text-2xl text-center bg-black text-white px-4 py-2 rounded-md'>Login to continue</button>
                </div>
            </div> :
                <>
                    <div className=''>
                        <h1 className="font-bold text-4xl">
                            Reset Password
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-1/3 justify-center pt-10 mx-auto">
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
                        <button disabled={loading} className="w-full text-xl font-medium bg-teal hover:bg-opacity-100 bg-opacity-70 transition py-2 text-white rounded-md ">Reset</button>
                    </form></>
            }
        </div>
    )
}
