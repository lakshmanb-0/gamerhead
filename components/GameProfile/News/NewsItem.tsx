"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { Card } from "antd";
import parser from "bbcode-to-react";


const NewsItem: React.FC<any> = ({ item }) => {
    const [newsContent, setNewsContent] = useState(item?.contents);
    // replace image domain 
    useEffect(() => {
        let imageReplace = item?.contents?.replace(/{STEAM_CLAN_IMAGE}/g, "https://clan.akamai.steamstatic.com/images/")
        if (imageReplace) setNewsContent(imageReplace)
    }, []);
    return (<>
        <Card className={`py-4 newsContent w-full max-w-4xl mx-auto`} >
            <div>
                <h1 className="font-bold text-center w-full text-2xl">{item.title}</h1>
                <p className="text-right w-full py-3 text-default-400 text-sm sm:text-base">by {item.author || "Unknown"} On {moment.unix(item.date).format('lll')} </p>
            </div>
            <div className="overflow-hidden whitespace-pre-wrap">
                {
                    item.contents.startsWith('<') ? parse(item.contents) : parser.toReact(newsContent)
                }
            </div>
            <div className="w-full text-right">
                <Link href={`${item.url}`} target="_blank" className="text-blue-500">
                    Read More!
                </Link>
            </div>
        </Card>
    </>
    );
};

export default NewsItem;
