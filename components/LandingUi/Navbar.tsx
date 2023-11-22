"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, auth, useUser } from "@clerk/nextjs";
import { getSearch } from "@/app/server.ts/apiCalls";
import { Combobox, ComboboxDemo } from "../ui/Combobox";

const Navbar = () => {
    const [searchInput, setSearchInput] = useState("");
    // const [name, setName] = useState("");
    const router = useRouter();
    const { user } = useUser();
    const [searchData, setSearchData] = useState([])
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    // const { isSignedIn, user } = useUser();


    // // get display name of user when enter on login page
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const docRef = doc(db, "Users", auth.currentUser.uid);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             setName(docSnap.data().name);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // //   handle Submit
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     router.push(`/Search/${searchInput}`);
    // };
    useEffect(() => {
        async function fetchData() {
            const data = await getSearch(searchInput)
            setSearchData(data)
        }
        if (searchData) {
            fetchData()
        }
    }, [searchInput])

    return (
        <div className="flex justify-between items-center gap-4 bg-[#1c1c1c] pl-4 mb-5 p-5 ">
            <div className="flex items-center gap-4">
                <div className=" w-10 h-10">
                    <Image src="/favicon.ico" alt="logo" width={1920} height={1080} />
                </div>
                <ul className="flex gap-8 text-lg NavbarUl">
                    <li onClick={() => {
                        router.push("/");
                    }}> Home </li>
                    <li onClick={() => {
                        router.push("/Cart");
                    }}> Catalog </li>
                </ul>
            </div>

            <form className="bg-[#2e2e2e] flex items-center gap-2 px-3 py-1 relative"
            // onSubmit={(e) => handleSubmit(e)}
            >
                <AiOutlineSearch className="text-xl" />
                <input
                    type="text"
                    className="bg-transparent placeholder:text-sm py-1"
                    placeholder="Need for Speed"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Combobox data={searchData} />
            </form>
            {user ? <UserButton /> : <SignInButton />}
            {/* <div
                className="flex items-center gap-3 bg-[#9160ef] px-8 py-4 cursor-pointer"
                onClick={() => router.push("/Profile")}
            >
                <span className="h-8 w-8 ">
                    <Image
                        src={
                            auth.currentUser.photoURL
                                ? auth.currentUser.photoURL
                                : "/avatar.svg"
                        }
                        alt="ProfileImage"
                        width={1920}
                        height={1080}
                        className="rounded-full"
                    />
                </span>
                <span>{auth.currentUser.displayName || name}</span>
            </div> */}
        </div>
    );
};

export default Navbar;
