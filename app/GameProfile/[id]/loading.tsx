"use client";
import React from "react";
import { FlapperSpinner } from "react-spinners-kit";

const Loading = () => {
    return (
        <main className="grid place-items-center h-screen">
            <FlapperSpinner color={'#00ff89'} size={30} />
        </main>
    );
};
export default Loading;