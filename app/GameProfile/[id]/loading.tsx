"use client";
import React from "react";
import { FlapperSpinner } from "react-spinners-kit";

const Loading = ({ color = "#00ff89", size = 30 }) => {
  return (
    <main className="grid place-items-center h-screen">
      <FlapperSpinner color={color} size={size} />
    </main>
  );
};

export default Loading;
