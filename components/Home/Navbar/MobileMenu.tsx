'use client'
import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import { FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import SearchDropdown from './SearchDropdown';
import { BsFillHeartFill } from 'react-icons/bs';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { MdClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';

const MobileMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const pathname = usePathname();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        onClose()
    }, [pathname])

    return (
        <>
            <FaHamburger onClick={showDrawer} />
            <Drawer
                onClose={onClose}
                open={open}
                closeIcon={<MdClose color='white' size={40} />}
                style={{ color: 'white', background: '#131926' }}
            >
                <div className="space-y-6">
                    <Link href="/cart" className='flex gap-1 hover:text-primary items-center'  >
                        Cart
                        <FaCartShopping size={15} />
                    </Link>
                    <SearchDropdown />

                    <Link href="/profile" className='flex gap-1 hover:text-primary items-center' >
                        Profile
                        <BsFillHeartFill size={15} />
                    </Link>
                    {user
                        ? <UserButton afterSignOutUrl="/" />
                        : <SignInButton redirectUrl="/sign-in" >
                            <Button className="bg-primary p-4 rounded-lg w-fit" >SignIn</Button>
                        </SignInButton>}
                </div>
            </Drawer>
        </>
    );
};

export default MobileMenu;