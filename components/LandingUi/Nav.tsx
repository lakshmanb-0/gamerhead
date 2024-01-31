"use client";
import React, { useEffect, useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { SearchDropdown } from "../ui/SearchDropdown";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, Avatar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Badge } from "@nextui-org/react";
import { createUser, currentUser } from "@/app/server.ts/prismaDb";
import { FaCartShopping } from "react-icons/fa6";


const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user } = useUser();
    const [cartCount, setCartCount] = useState<number>(0)

    const menuItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Catelog',
            link: '/cart'
        },
        {
            name: 'search',
            link: ''
        }
    ];

    useEffect(() => {
        const cartCountCheck = async () => {
            if (user?.id) {
                let CU = await currentUser(user?.id!)
                setCartCount(CU?.cartData?.length ?? 0)
            }
            else {
                setCartCount(0)
            }
        }
        const checkUser = async () => {
            if (user) {
                let data = {
                    id: user?.id!,
                    name: user?.fullName!,
                    email: user?.primaryEmailAddress?.emailAddress!
                }
                await createUser(data)
            }
        }
        checkUser()

        const intervalId = setInterval(cartCountCheck, 2000);
        return () => clearInterval(intervalId);
    }, [user])


    return (
        <Navbar shouldHideOnScroll className="bg-[#131926] p-2 mb-4" onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent justify="start" className="sm:hidden">
                <NavbarMenuToggle />
                <Link href="/" >
                    <Avatar src="/favicon.ico" />
                </Link>
            </NavbarContent>

            <NavbarBrand className="hidden sm:block" >
                <Link href="/" >
                    <Avatar src="/favicon.ico" />
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-6 w-full" justify="center">
                <Link href="/"> Home </Link>
                <Link href="/cart" className="flex items-center gap-1">
                    <p>Catalog</p>
                    <Badge content={cartCount} size="sm" color="primary">
                        <FaCartShopping />
                    </Badge>
                </Link>
                <SearchDropdown />
            </NavbarContent>

            <NavbarContent justify="end">
                {user ? <UserButton afterSignOutUrl="/" signInUrl="/sign-in" /> : <SignInButton>
                    <button className="flex bg-[#192233] px-4 py-2 rounded-lg">SignIn</button>
                </SignInButton>}
            </NavbarContent>

            {/* mobile menu  */}
            <NavbarMenu className="bg-[#2e2e2e] flex flex-col gap-6 pt-5">
                {menuItems.map((item, index) => (
                    item.name == 'search' ? <SearchDropdown key={1} /> :
                        <NavbarMenuItem key={`${item}-${index}`} className="hover:scale-90 w-full">
                            <Link
                                className="w-full"
                                href={item.link}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Nav;
