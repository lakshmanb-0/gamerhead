"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TGameData } from "@/types";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
            <CarouselItem key={index} className=" lg:basis-1/2">
              <Image src={item?.large_capsule_image} alt="picture" width={1920} height={1080} className="w-full object-contain" onClick={() => handleClick(item?.id)} />
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
