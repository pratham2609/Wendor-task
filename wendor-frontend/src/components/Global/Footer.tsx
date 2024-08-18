'use client'
import React from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='w-screen h-full mt-20 border-t-[1px]'>
            <div className='max-w-screen-xl xl:px-0 lg:px-12 md:px-10 px-6 flex flex-col gap-10 justify-center items-center h-full w-full mx-auto pt-20 pb-10'>
                <div className='w-full flex items-start'>
                    {/* Logo */}
                    <div className='h-full flex w-[30%] items-center'>
                        <img src={"/wendor-logo.png"} alt='Logo' className='w-1/3 object-scale-down' />
                        
                    </div>
                    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-10'>

                        {/* Company */}
                        <div className='flex flex-col gap-3'>
                            <h4 className='font-semibold lg:text-xl text-lg'>
                                Company
                            </h4>
                            <div className='flex flex-col'>
                                <NavLink to={"/"} className='lg:text-lg text-base'>About Us</NavLink>
                                <NavLink to={"/"} className='lg:text-lg text-base'>Products</NavLink>
                                <NavLink to={"/"} className='lg:text-lg text-base'>Blogs</NavLink>
                                <NavLink to={"/"} className='lg:text-lg text-base'>Contact Us</NavLink>
                            </div>
                        </div>

                        {/* Inquiries */}
                        <div className='flex flex-col w-full gap-4'>
                            <div className="flex flex-col w-full gap-3">
                                <h4 className='font-semibold lg:text-xl text-lg'>
                                    Inquiries
                                </h4>
                                <div className="flex flex-col w-full">
                                    <a href={"tel:+917710554497"} className='lg:text-lg text-base w-[70%] dm_sans'>(+91) 85718-09816</a>
                                    <a href={"mailto:clickmatelifecare2023@gmail.com"} className='lg:text-lg whitespace-nowrap text-base w-[70%]'>example@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="flex flex-col gap-3 w-full items-center">
                            <div className="flex flex-col gap-2">
                                <h4 className='font-semibold lg:text-xl text-lg'>
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

                <div className='w-full flex items-center justify-center'>
                    <p>
                        Copyright © 2024 All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
