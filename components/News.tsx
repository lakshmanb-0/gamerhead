"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const News = ({ item }) => {
  const [newsContent, setNewsContent] = useState("");

  useEffect(() => {
    setNewsContent(parse(item.contents));
  }, []);

  // convert news timestamp in real date
  const handleTimestamp = (unix) => {
    let dateObject = new Date(unix * 1000);
    let dateString = dateObject.toLocaleDateString();
    return dateString;
  };

  return (
    <div
      key={item.gid}
      className="px-8 py-10 bg-[#0f0f0f] rounded border-2 border-[#7360ed]"
    >
      <h1 className="text-center font-bold text-3xl pb-3 bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-transparent bg-clip-text">
        {item.title}
      </h1>
      <div className="flex justify-between py-4">
        <h1>Author: {item.author || "Unknown"}</h1>
        <h1>Date: {handleTimestamp(item.date)}</h1>
        <Link href={`${item.url}`} target="_blank" className="text-blue-500">
          Read More!
        </Link>
      </div>
      <div className="newsContent overflow-hidden">{newsContent}</div>
    </div>
  );
};

export default News;
