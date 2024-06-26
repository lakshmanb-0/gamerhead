"use client";
import React, { useEffect } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { BsFillHeartFill } from "react-icons/bs";

import SearchDropdown from "./SearchDropdown";
import { Badge } from "antd";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { createUser } from "@/app/serverAction/mongodbApi";
import { addUser } from "@/components/redux/reducers/auth.reducers";


const Navbar = () => {
    const { user } = useUser();
    const { cartData, wishlistData } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    // create new User
    useEffect(() => {
        if (!user) return
        const fetchData = async () => {
            const currentUser = await createUser({ id: user.id, name: user.firstName || user.fullName, email: user.emailAddresses[0].emailAddress })
            console.log(currentUser, 'nav')
            currentUser && dispatch(addUser(currentUser))
        }
        !!user?.id && fetchData()
    }, [user])
    return (
        <section className="bg-[#131926] sticky top-0 z-[100]">
            <nav className="p-2 gap-2 flex justify-between items-center  maxWidth">
                <Link href="/" >
                    <Image src="/favicon.ico" alt="logo" width={35} height={35} />
                </Link>
                <div className="items-center gap-6 hidden sm:flex">
                    <Link href="/cart" >
                        <Badge count={cartData?.length} size="small" color="green" >
                            <FaCartShopping className="hover:text-primary" size={20} />
                        </Badge>
                    </Link>
                    <SearchDropdown />

                    <Link href="/profile" >
                        <Badge count={wishlistData?.length} size="small" color="green">
                            <BsFillHeartFill className="hover:text-primary" size={20} />
                        </Badge>
                    </Link>
                </div>
                <div className="hidden sm:flex">
                    {
                        user
                            ? <UserButton afterSignOutUrl="/" />
                            : <SignInButton redirectUrl="/sign-in">
                                <button className="flex bg-primary px-4 py-2 rounded-lg">SignIn</button>
                            </SignInButton>
                    }
                </div>

                <div className="sm:hidden">
                    <MobileMenu />
                </div>
            </nav>
        </section>

    );
};

export default Navbar;
