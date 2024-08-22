/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { handleLogin, user } = useAuthContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/user/admin", {
                email: formData.email,
                password: formData.password,
                role: "admin"
            });
            if (res.data.success) {
                handleLogin({ user: res.data?.user, token: res.data?.token })
                navigate("/dashboard")
                toast.success("Logged in Successfully!");
            }
        } catch (error) {
            toast.error(error?.response?.data ?? "Server Error")
        }
    };

    useEffect(() => {
        document.title = "Wendor | Login"
        if (user?.id !== "") navigate("/dashboard");
    }, [])
    return (
        <main className="w-screen h-screen poppins">
            <div className="h-full w-full flex items-center justify-center bg-login-page bg-no-repeat relative bg-cover">
                <div className="bg-white z-10 xl:w-1/3 md:w-1/2 w-[90%] flex flex-col gap-10 lg:px-5 px-3 py-20 justify-center items-center rounded-xl shadow-md border">
                    <h1 className="font-bold 2xl:text-3xl lg:text-2xl text-xl">
                        Welcome! Login to Continue
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[85%] mx-auto">
                        <div className="flex flex-col border border-gray-300 rounded-lg w-full">
                            <Input name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                            <div className="w-full h-px bg-gray-300" />
                            <Input name="password" placeholder="Enter your password" value={formData.password} type="password" onChange={handleInputChange} />
                        </div>
                        <button className="w-full text-xl font-medium bg-teal hover:bg-opacity-100 bg-opacity-70 transition py-2 text-white rounded-md ">Login</button>
                    </form>
                    <Link to={"https://wendor.prathamdev.site/auth/forgot-password"} target="_blank" className="-mt-5">Forgot Password?</Link>
                </div>
                <div className="w-full h-full bg-black/40 absolute" />
            </div>
        </main>
    )
}
