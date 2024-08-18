import React from 'react'
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export default function Navbar() {
    const [scroll, setScroll] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const { user } = useAuthContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={'w-screen z-20 fixed transition-all ' + (scroll && "bg-[#FFF4DD] duration-150 bg-opacity-95")}>
            <div className='max-w-screen-xl  xl:px-0 lg:px-12 md:px-10 px-6 mx-auto w-full flex items-center justify-between'>
                <NavLink to={"/"}>
                    <img src={"/wendor-logo.png"} alt='Wendor Logo' className='xl:h-28 xl:w-28 md:h-24 md:w-24 w-20 h-20' />
                </NavLink>
                <div className='flex items-center gap-3'>
                    {user ? <button onClick={() => navigate("/expert/dashboard")} className='font-bold text-white capitalize bg-mainYellow h-8 w-8 rounded-full flex items-center justify-center'>{user?.fullName[0]}</button> : <button onClick={() => { }}>
                        <p className='md:flex hidden  text-mainYellow border-mainYellow border-2 rounded-full 2xl:text-xl xl:text-lg lg:text-base text-sm text-nowrap font-bold lg:px-4 px-2 py-1 items-center gap-1'>Log In</p>
                    </button>
                    }
                </div>
            </div>
        </nav>
    )
}
