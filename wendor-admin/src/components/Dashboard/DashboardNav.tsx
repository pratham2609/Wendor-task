import { MdDashboard, MdLogout } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { IoPerson, IoSettingsOutline } from "react-icons/io5";
import { LuStethoscope } from "react-icons/lu";
import { RiArrowGoBackLine } from "react-icons/ri";
import toast from "react-hot-toast";

export default function DashboardNav() {
    const { handleLogout } = useContext(AuthContext);
    const dashboardNavs = [
        {
            name: 'dashboard',
            url: '/dashboard',
            icon: <MdDashboard />
        },
        {
            name: 'products',
            url: '/products',
            icon: <IoPerson />
        },
        {
            name: 'inventory',
            url: '/inventory',
            icon: <LuStethoscope />
        },
        {
            name: 'companies',
            url: '/orders',
            icon: <RiArrowGoBackLine />
        },
        {
            name: 'settings',
            url: '/settings/general_analytics',
            icon: <IoSettingsOutline />
        },
    ]
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-full h-full flex flex-col items-center justify-between 2xl:p-10 xl:p-8 lg:p-6 p-4'>
                <div className='w-full flex flex-col items-center gap-10'>
                    <img src={"/wendor-logo-full.webp"} alt="Logo" className='w-44' />
                    <nav className='w-full flex justify-center'>
                        <ul className='w-full flex flex-col items-center gap-2'>
                            {
                                dashboardNavs.map((nav, i) => (
                                    <li key={i} className={'xl:rounded-[20px] rounded-2xl font-semibold 2xl:text-xl xl:text-base md:text-sm text-xs w-full 2xl:pl-8 xl:pl-6 px-5 xl:py-4 lg:py-3 py-2  ' + (nav.url == location.pathname || (location.pathname.includes("settings") && nav.url.includes("settings")) ? "bg-mainYellow text-white" : " bg-transparent text-black")}>
                                        <a href={nav.url} className='flex items-center justify-start w-full gap-4'>
                                            {nav.icon}
                                            <span className='capitalize'>{nav.name}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
                <div className='w-full flex justify-center'>
                    <button onClick={() => {
                        handleLogout();
                        toast.success("Logged out seccessfully!");
                        navigate(`/login`);
                    }} className='w-full text-[#E74C3C] text-xl hover:bg-secondaryBlack 
                    hover:bg-opacity-15 transition duration-200 ease-linear py-3 rounded-[20px] flex justify-center items-center gap-4'>Logout <MdLogout /></button>
                </div>
            </div>
        </div>
    )
}
