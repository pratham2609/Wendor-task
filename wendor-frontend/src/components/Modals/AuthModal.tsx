import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import ModalProvider from '../Provider/ModalProvider';
import { useModalContext } from '../../context/ModalsContext';
import Input from '../Global/Input';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AuthModal() {
    const { handleLogin } = useAuthContext();
    const { authModalOpen, setAuthModalOpen } = useModalContext();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: ""
    });
    const [error, setError] = useState({
        email: null,
        password: null,
    });

    const [authState, setAuthState] = useState("login");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (formData.password.length < 6) {
            setError({
                ...error,
                password: "Password must be at least 6 characters"
            });
            return;
        }
        const url = authState === "login" ? "/user/login" : authState === "signup" && "/user/register";
        try {
            const res = await axiosInstance.post(url, formData);
            if (res.data.success) {
                handleLogin({ user: res.data?.user, token: res.data?.token })
                toast.success("Logged in Successfully!");
                setFormData({
                    email: "",
                    password: "",
                    fullName: ""
                })
                setAuthModalOpen(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data ?? "Server Error");
        }
    }
    return (
        <ModalProvider title={"Wendor " + authState} isOpen={authModalOpen} setIsOpen={setAuthModalOpen} action={handleSubmit}>
            <div className='flex flex-col poppins gap-3'>
                <div className="flex flex-col border border-gray-300 rounded-lg w-full">
                    {authState === "signup" && <>
                        <Input className='!border-none' placeholder='Enter full name' name='fullName' value={formData.fullName} onChange={handleChange} />
                        <div className="w-full h-px bg-gray-300" />
                    </>}
                    <Input name="email" className='!border-none' placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    <div className="w-full h-px bg-gray-300" />
                    <Input name="password" className='!border-none' placeholder="Enter your password" value={formData.password} type="password" onChange={(e) => {
                        if (error.password && formData.password.length >= 6) {
                            setError({
                                ...error,
                                password: null
                            })
                        }
                        handleChange(e)
                    }} />
                </div>
                {error.email && <p className='text-danger text-base font-medium'>{error.email}</p>}
                {error.password && <p className='text-danger text-base font-medium'>{error.password}</p>}
            </div>
            <div className='w-full flex justify-between poppins text-sm'>
                {authState === "login" && <Link to={"/auth/forgot-password"}>Forgot Password?</Link>}
                {authState === "login" ? <p>Don't have an account? <button className='font-semibold underline' onClick={() => setAuthState("signup")}>Signup</button></p> :
                    <p>Already have an account? <button className='font-semibold underline' onClick={() => setAuthState("login")}>Login</button></p>
                }
            </div>
        </ModalProvider>
    )
}
