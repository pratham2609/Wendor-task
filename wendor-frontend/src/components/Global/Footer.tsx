'use client'
import React from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='w-screen h-full xl:mt-20 lg:mt-16 mt-12 border-t-[1px]'>
            <div className='max-w-screen-xl xl:px-0 lg:px-12 md:px-10 px-6 flex flex-col gap-10 justify-center items-center h-full w-full mx-auto xl:pt-20 lg:pt-16 pt-12 lg:pb-10 pb-8'>
                <div className='w-full flex md:flex-row flex-col flex-nowrap md:gap-0 gap-6 items-start'>
                    {/* Logo */}
                    <div className='h-full flex md:w-[40%] w-2/3 items-start gap-5 flex-col'>
                        <img src={"/wendor-logo.png"} alt='Logo' className='w-1/4 object-scale-down' />
                        <p className='font-medium xl:text-base text-sm'>A vision and mission to provide the best experience.</p>
                    </div>
                    <div className='w-full grid md:grid-cols-3 lg:gap-0 md:gap-10 gap-6'>

                        {/* Company */}
                        <div className='flex flex-col gap-3'>
                            <h4 className='font-semibold lg:text-lg text-base'>
                                Company
                            </h4>
                            <div className='flex flex-col'>
                                <NavLink to={"/"} className='lg:text-base text-sm '>About Us</NavLink>
                                <NavLink to={"/"} className='lg:text-base text-sm '>Products</NavLink>
                                <NavLink to={"/"} className='lg:text-base text-sm '>Blogs</NavLink>
                                <NavLink to={"/"} className='lg:text-base text-sm '>Contact Us</NavLink>
                            </div>
                        </div>

                        {/* Inquiries */}
                        <div className='flex flex-col w-full gap-4'>
                            <div className="flex flex-col w-full gap-3">
                                <h4 className='font-semibold lg:text-lg text-base'>
                                    Inquiries
                                </h4>
                                <div className="flex flex-col w-full">
                                    <a href={"tel:+917710554497"} className='lg:text-base whitespace-nowrap text-sm  w-[70%] dm_sans'>(+91) 85718-09816</a>
                                    <a href={"mailto:clickmatelifecare2023@gmail.com"} className='lg:text-base whitespace-nowrap text-sm  w-[70%]'>example@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="flex flex-col gap-3 w-full md:items-center">
                            <div className="flex flex-col gap-2">
                                <h4 className='font-semibold lg:text-lg text-base'>
                                    Follow Us
                                </h4>
                                <div className='w-full items-center flex gap-2'>
                                    <Link to={"/"}><FaLinkedinIn size={30} /></Link>
                                    <Link to={"/"}><FaInstagram size={30} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black bg-opacity-30 h-px w-full" />

                <div className='w-full flex lg:text-sm  items-center justify-center'>
                    <p>
                        Copyright © 2024 All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
