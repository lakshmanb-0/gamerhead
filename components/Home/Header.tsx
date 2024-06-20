"use client";
import React from "react";
import { TGameData } from "@/types";
import Link from "next/link";
import { ImageBox } from "../index";
import { Carousel } from 'antd';

type Props = {
  gameData: TGameData[];
}
const Header: React.FC<Props> = ({ gameData }) => {

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }: any) => (
    <div{...props}>{children}</div>
  );
  console.log(gameData)
  return (
    <Carousel
      arrows
      className="mx-auto p-7 max-w-3xl"
      autoplay
      autoplaySpeed={5000}
      prevArrow={<SlickButtonFix />}
      nextArrow={<SlickButtonFix />}
    >
      {
        gameData.map((item) => item?.type == 0 && (
          <Link href={`/game/${item?.id}`} key={item.id} className="relative hover:text-white hover:scale-95 transition-transform ease-in-out duration-500">
            <ImageBox realImage={item?.large_capsule_image} customStyle={'rounded-xl object-contain '} />
            {
              !!item?.discount_percent
              && <div className="absolute top-2 right-2 px-2 sm:px-4 py-1 text-sm sm:text-lg font-semibold bg-primary rounded">
                -{item?.discount_percent}%
              </div>
            }
          </Link>
        ))
      }
    </Carousel>
  );
};

export default Header;
