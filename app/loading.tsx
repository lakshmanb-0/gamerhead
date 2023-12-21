"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
    return (
        <main className="grid place-items-center h-screen">
            <Spinner size="lg" />
        </main>
    );
};
export default Loading;