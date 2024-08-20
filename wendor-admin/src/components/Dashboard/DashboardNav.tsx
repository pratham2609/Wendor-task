import { MdLogout } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext'
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { dashboardNavs } from "../../utils/constants";

export default function DashboardNav() {
    const { handleLogout } = useContext(AuthContext);
    const location = useLocation();
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-full h-full flex flex-col items-center justify-between 2xl:p-10 xl:p-8 lg:p-6 p-4'>
                <div className='w-full flex flex-col items-center gap-10'>
                    <div className="w-44 h-32">
                        <img src={"/wendor-logo-full.webp"} alt="Logo" className='w-full h-full object-scale-down' />
                    </div>
                    <nav className='w-full flex justify-center'>
                        <ul className='w-full flex flex-col items-center gap-2'>
                            {
                                dashboardNavs.map((nav, i) => (
                                    <li key={i} className={'rounded-xl font-semibold 2xl:text-xl xl:text-base md:text-sm text-xs w-full 2xl:pl-8 xl:pl-6 px-5 xl:py-4 lg:py-3 py-2  '
                                        + (nav.url == location.pathname || (location.pathname.includes("settings") && nav.url.includes("settings")) ?
                                            "bg-pink text-white" : " bg-transparent text-black")}>
                                        <a href={nav.url} className='flex items-center justify-start w-full gap-4'>
                                            <nav.icon />
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
                    }} className='w-full text-white text-xl hover:bg-opacity-100 bg-opacity-80 bg-black transition 
                    duration-200 ease-linear py-3 rounded-lg flex justify-center items-center gap-1'>
                        <MdLogout />Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
