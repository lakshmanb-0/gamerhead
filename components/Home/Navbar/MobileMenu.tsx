'use client'
import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import SearchDropdown from './SearchDropdown';
import { BsFillHeartFill } from 'react-icons/bs';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { MdClose } from 'react-icons/md';

const MobileMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FaHamburger onClick={showDrawer} />
            <Drawer
                onClose={onClose}
                open={open}
                closeIcon={<MdClose color='white' size={30} />}
                className='bg-[#192233]'
                style={{ color: 'white', background: '#131926' }}>
                <div className="flex flex-col gap-6">
                    <Link href="/cart" className='flex gap-3' >
                        <span>Cart</span><FaCartShopping className='text-xl' color="white" />
                    </Link>
                    <SearchDropdown />

                    <Link href="/profile" className='flex gap-3'>
                        Profile
                        <BsFillHeartFill className='text-xl' color="white" />
                    </Link>
                    {user
                        ? <UserButton afterSignOutUrl="/" />
                        : <SignInButton redirectUrl="/sign-in">
                            <button className="flex bg-[#192233] px-4 py-2 rounded-lg w-fit">SignIn</button>
                        </SignInButton>}
                </div>
            </Drawer>
        </>
    );
};

export default MobileMenu;