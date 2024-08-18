import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useModalContext } from '../../context/ModalsContext';
import ProfileDropdown from './ProfileDropdown';
import { useCartContext } from '../../context/CartContext';

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
            <div className='max-w-screen-xl xl:px-0 lg:px-12 md:px-10 px-6 py-5 mx-auto w-full flex items-center justify-between'>
                <div className='flex items-center gap-10 w-1/2'>
                    <NavLink to={"/"} className={"xl:w-16 w-12"}>
                        <img src={"/wendor-logo.png"} alt='Wendor Logo' className='w-full h-full object-scale-down' />
                    </NavLink>

                    {/* Search Bar */}
                    <div className='flex items-center border border-gray-400 w-1/2 px-3 gap-3 rounded-lg'>
                        <FaSearch />
                        <input placeholder='Search for products' className='py-2 w-full focus:outline-none' />
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button onClick={() => navigate("/cart")} className='relative'>
                        <div className='font-bold text-black'><IoIosCart size={30} /></div>
                        {cart.length > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full animate-bounce h-7 w-7 flex items-center justify-center'>{cart.length}</span>}
                    </button>
                    {user && user.role == "user" ? <ProfileDropdown /> : <button onClick={() => { }}>
                        <button onClick={() => setAuthModalOpen(true)} className='border-2 border-black rounded-full 2xl:text-xl xl:text-lg lg:text-base text-sm text-nowrap font-bold lg:px-4 px-2 py-1 items-center gap-1'>Log In</button>
                    </button>
                    }
                </div>
            </div>
        </nav >
    )
}
