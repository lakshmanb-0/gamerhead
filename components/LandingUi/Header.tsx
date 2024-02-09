"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TGameData } from "@/types";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ImageBox from "../ImageBox";

const Header = ({ gameData }: { gameData: TGameData[] }) => {
  const router = useRouter();

  //handle click button
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <section className="sm:p-4">
      <Carousel className="w-full md:w-[90%] mx-auto cursor-grab" plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}>
        <CarouselContent>
          {gameData.map((item, index: number) => (
            <CarouselItem key={index} className=" lg:basis-1/2" onClick={() => handleClick(item?.id)}>
              <ImageBox realImage={item?.large_capsule_image} customStyle={'rounded-xl'} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
    </section>

  );
};

export default Header;
