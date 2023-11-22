"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
    return (
        <main className="grid place-items-center h-screen">
            <Skeleton className="h-12 w-12 rounded-full bg-white" />
        </main>
    );
};
export default Loading;