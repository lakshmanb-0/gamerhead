"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import parser from "bbcode-to-react";
import { TNewsData } from "@/types";
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";


const News = ({ item }: { item: TNewsData }) => {
  const [newsContent, setNewsContent] = useState<any>('');

  useEffect(() => {
    let imageReplace = item.contents.replace(/{STEAM_CLAN_IMAGE}/g, "https://clan.akamai.steamstatic.com/images/")
    setNewsContent(parser.toReact(imageReplace));
  }, []);

  return (
    <Card className="py-4">
      <CardHeader className="px-4 flex-col items-start">
        <h1 className="font-bold text-center w-full text-2xl">{item.title}</h1>
        <p className="text-right w-full py-3 text-default-400 text-sm sm:text-lg">by {item.author || "Unknown"} On {moment.unix(item.date).format('lll')} </p>
      </CardHeader>
      <Divider />
      <CardBody className="px-4 sm:px-8">
        <div className="newsContent overflow-hidden whitespace-pre-wrap">{item.contents.startsWith('<') ? HTMLReactParser(item.contents) : newsContent}</div>
      </CardBody>
      <CardFooter>
        <div className="w-full text-right">
          <Link href={`${item.url}`} target="_blank" className="text-blue-500">
            Read More!
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default News;
