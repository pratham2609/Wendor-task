import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosCart } from "react-icons/io";
import { useModalContext } from '../../context/ModalsContext';
import ProfileDropdown from './ProfileDropdown';
import { useCartContext } from '../../context/CartContext';
import SearchBar from '../Home/SearchBar';

export default function Navbar() {
    const [scroll, setScroll] = React.useState(false);
    const { user } = useAuthContext();
    const { cart } = useCartContext();
    const navigate = useNavigate();

    const { setAuthModalOpen } = useModalContext();
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={'w-screen z-20 fixed transition-all ' + (scroll && "bg-white duration-150 bg-opacity-95")}>
            <div className='max-w-screen-xl xl:px-0 lg:px-12 md:px-10 px-6 py-4 mx-auto w-full flex items-center justify-between'>
                <NavLink to={"/"} className={"xl:w-14 lg:w-10 w-8"}>
                    <img src={"/wendor-logo.png"} alt='Wendor Logo' className='w-full h-full object-scale-down' />
                </NavLink>
                <div className='flex items-center md:gap-4 gap-2 lg:w-1/2 md:w-2/3 w-[80%] justify-end'>
                    {/* Search Bar */}
                    <SearchBar />
                    <button onClick={() => navigate("/cart")} className='relative'>
                        <div className='font-bold text-black'><IoIosCart className='lg:w-9 lg:h-9 md:h-8 md:w-8 w-6 h-6' /></div>
                        {cart.length > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full animate-bounce h-7 w-7 flex items-center justify-center'>{cart.length}</span>}
                    </button>
                    {user && user.role == "user" ? <ProfileDropdown /> :
                        <button onClick={() => setAuthModalOpen(true)} className='border-2 border-black rounded-full 2xl:text-xl xl:text-lg lg:text-base text-sm text-nowrap font-bold lg:px-4 px-2 py-1 items-center gap-1'>Log In</button>
                    }
                </div>
            </div>
        </nav >
    )
}
