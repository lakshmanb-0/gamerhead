"use client";
import React from "react";
import { Spin } from "antd";

const Loading = () => {
    return (
        <main className="grid place-items-center h-screen">
            <Spin size="large" />
        </main>
    );
};
export default Loading;