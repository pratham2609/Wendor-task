/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import { useAuthContext } from '../../context/AuthContext';
import DashboardNav from '../Dashboard/DashboardNav';
import { RiMenu2Line } from "react-icons/ri";
import DashboardNavDrawer from '../Dashboard/DashboardNavDrawer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { updateUser, user } = useAuthContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    React.useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axiosInstance.get('/user')
                if (res.data?.user) {
                    updateUser(res.data?.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdmin();
    }, []);
    return (
        <>
            <div className='w-screen relative open-sans h-screen'>
                <div className='w-full h-full flex items-center text-secondaryBlack justify-center'>
                    {/* Nav */}
                    <div className='h-full lg:block hidden w-[21%] border-r-[1px] border-[#B5B5B5]'>
                        <DashboardNav />
                    </div>

                    {/* Content */}
                    <div className='h-full lg:w-[89%] w-full flex flex-col'>
                        {/* Content Header */}
                        <div className='w-full xl:h-[8%] h-[6%] flex items-center border-b-[1px] border-[#B5B5B5] lg:p-5 p-4 md:px-7 px-5'>
                            <div className='w-full flex items-center justify-between'>
                                <RiMenu2Line onClick={() => setIsDrawerOpen(true)} className='lg:hidden block cursor-pointer' size={26} />
                                <h2 className='xl:text-2xl lg:text-xl md:text-lg text-base font-medium capitalize'>
                                    {new Date().toDateString()}
                                </h2>
                                <button onClick={() => navigate(`/settings`)}
                                    className='font-bold text-white capitalize bg-blue h-8 w-8 rounded-full flex items-center justify-center'>
                                    {user?.fullName[0]}
                                </button>
                            </div>
                        </div>
                        {/* Content Body */}
                        <div className='w-full xl:h-[92%] h-[94%]'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {isDrawerOpen && <DashboardNavDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />}
        </>
    )
}
