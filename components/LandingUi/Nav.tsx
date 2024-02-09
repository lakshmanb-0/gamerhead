"use client";
import React, { useEffect, useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { SearchDropdown } from "../ui/SearchDropdown";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, Avatar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Badge } from "@nextui-org/react";
import { createUser, currentUser } from "@/app/server.ts/prismaDb";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { usePathname } from "next/navigation";
import { BsFillHeartFill } from "react-icons/bs";
import { addCart, addWishlist } from "../redux/reducers/auth.reducers";


const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { user } = useUser();
    const [cartCount, setCartCount] = useState<number>(0)
    const [wishlistCount, setWishlistCount] = useState<number>(0)
    const state = useSelector((state: RootState) => state.auth)
    const pathname = usePathname()
    const dispatch = useDispatch()
    // console.log(user);

    // user check
    useEffect(() => {
        cartCountCheck();
        const checkUser = async () => {
            if (user?.id) {
                console.log('asd');

                let data = {
                    id: user?.id!,
                    name: user?.fullName!,
                    email: user?.primaryEmailAddress?.emailAddress!
                }
                let a = await createUser(data)
                console.log(a);

            }
        }
        checkUser()
        const intervalId = setTimeout(cartCountCheck, 1000);
        return () => clearTimeout(intervalId);
    }, [user])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname]);

    // update cart when cart redux changes 
    useEffect(() => {
        setCartCount(state.cartData?.length)
        setWishlistCount(state.wishlistData?.length)
    }, [state])

    // cart count check function 
    const cartCountCheck = async () => {
        if (user?.id) {
            let CU = await currentUser(user?.id!)
            console.log(CU);
            if (CU) {
                dispatch(addCart(CU?.cartData))
                setCartCount(CU?.cartData?.length ?? 0)
                dispatch(addWishlist(CU?.wishlistData))
                setWishlistCount(CU?.wishlistData?.length ?? 0)
            }
        }
        else {
            setCartCount(0)
            setWishlistCount(0)
        }
    }

    return (
        <Navbar shouldHideOnScroll className="bg-[#131926] p-2 mb-4" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent justify="start" className="sm:hidden" >
                <NavbarMenuToggle />
                <Link href="/" >
                    <Avatar src="/favicon.ico" />
                </Link>
                <Link href="/cart" >
                    <Badge content={cartCount} size="sm" color="success">
                        <FaCartShopping className='text-xl' />
                    </Badge>
                </Link>
                <Link href="/profile" >
                    <Badge content={wishlistCount} size="sm" color="success">
                        <BsFillHeartFill className='text-xl' />
                    </Badge>
                </Link>
            </NavbarContent>

            <NavbarBrand className="hidden sm:block" >
                <Link href="/" >
                    <Avatar src="/favicon.ico" />
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-6 w-full text-xl" justify="center">
                <Link href="/"> Home </Link>
                <Link href="/cart" >
                    <Badge content={cartCount} size="sm" color="success">
                        <FaCartShopping className='text-xl' />
                    </Badge>
                </Link>
                <SearchDropdown />
                <Link href="/profile" >
                    <Badge content={wishlistCount} size="sm" color="success">
                        <BsFillHeartFill className='text-xl' />
                    </Badge>
                </Link>
            </NavbarContent>

            <NavbarContent justify="end">
                {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton redirectUrl="/sign-in">
                    <button className="flex bg-[#192233] px-4 py-2 rounded-lg">SignIn</button>
                </SignInButton>}
            </NavbarContent>

            {/* mobile menu  */}
            <NavbarMenu className="bg-[#131926] flex flex-col gap-6 pt-5" >
                <NavbarMenuItem className="hover:scale-90 w-full">
                    <Link
                        className="w-full"
                        href='/'
                    >
                        Home
                    </Link>
                </NavbarMenuItem>
                <SearchDropdown />
            </NavbarMenu>
        </Navbar >
    );
};

export default Nav;
