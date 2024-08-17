/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import { useAuthContext } from '../../context/AuthContext';
import DashboardNav from '../Dashboard/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateUser, user } = useAuthContext();
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
                    <div className='h-full w-[21%] border-r-[1px] border-[#B5B5B5]'>
                        <DashboardNav />
                    </div>

                    {/* Content */}
                    <div className='h-full w-[89%] flex flex-col'>
                        {/* Content Header */}
                        <div className='w-full h-[8%] flex items-center border-b-[1px] border-[#B5B5B5] p-5 px-7'>
                            <div className='w-full flex items-center justify-between'>
                                <h2 className='text-2xl font-normal capitalize'>{
                                    location.pathname.split('/').pop()
                                }</h2>
                                <button onClick={() => navigate(`/settings`)}
                                    className='font-bold text-white capitalize bg-blue h-8 w-8 rounded-full flex items-center justify-center'>
                                    {user.fullName[0]}
                                </button>
                            </div>
                        </div>
                        {/* Content Body */}
                        <div className='w-full h-[92%]'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
