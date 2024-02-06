"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import parser from "bbcode-to-react";
import Linkify from 'react-linkify';
import { TNewsData } from "@/types";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";


const News = ({ item }: { item: TNewsData }) => {
  const [newsContent, setNewsContent] = useState<any>('');

  useEffect(() => {
    let imageReplace = item.contents.replace(/{STEAM_CLAN_IMAGE}/g, "https://clan.akamai.steamstatic.com/images/")

    // let imageString = item.contents
    //   .replace(/`[img]{STEAM_CLAN_IMAGE}`/g, `<img src='https://clan.akamai.steamstatic.com/images/`)
    //   .replace(/`[/img]/g, `'</img>`)
    // let videoString = imageString
    //   .replace("[previewyoutube=", '<iframe src="https://www.youtube.com/embed/')
    //   .replace(";full][/previewyoutube]", '" frameborder="0"></iframe>');

    setNewsContent(parser.toReact(imageReplace));

  }, []);
  console.log(item.contents);

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="font-bold text-center w-full text-2xl">{item.title}</h1>
        <div className="flex justify-between w-full items-center py-3 text-default-400">
          <h1>Author: {item.author || "Unknown"}</h1>
          <h1>Date: {moment.unix(item.date).format('DD MMM, YYYY')}</h1>
          <Link href={`${item.url}`} target="_blank" className="text-blue-500">
            Read More!
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible px-4 sm:px-8">
        <div className="newsContent overflow-hidden whitespace-pre-wrap py-10">{item.contents.startsWith('<') ? HTMLReactParser(item.contents) : newsContent}</div>
      </CardBody>
    </Card>
    // <div
    //   key={item.gid}
    //   className="px-4 py-4 bg-[#0f0f0f] rounded border-2 border-[#7360ed]"
    // >
    //   <h1 className="text-center font-bold text-3xl pb-3 bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-transparent bg-clip-text">
    //     {item.title}
    //   </h1>
    //   <div className="flex justify-between py-4">
    //     <h1>Author: {item.author || "Unknown"}</h1>
    //     <h1>Date: {moment(item.date).format('DD-MM-YYYY')}</h1>
    //     <Link href={`${item.url}`} target="_blank" className="text-blue-500">
    //       Read More!
    //     </Link>
    //   </div>
    //   <div className="newsContent overflow-hidden whitespace-pre-wrap py-10">{item.contents.startsWith('<') ? HTMLReactParser(item.contents) : newsContent}</div>
    // </div>
  );
};

export default News;
