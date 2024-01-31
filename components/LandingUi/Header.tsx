"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TGameData } from "@/types";
import ImageBox from "../ImageBox";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const Header = ({ gameData }: { gameData: TGameData[] }) => {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  //handle click button
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    // <section className="flex w-screen max-h-screen gap-4">
    //   {/* games list  */}
    //   {gameData?.map((item, index: number) => (
    //     index < 2 &&
    //     <div
    //       key={index}
    //       onClick={() => handleClick(item.id)}
    //       className="cursor-pointer py-4 relative ">

    //       <Image src={item?.large_capsule_image} alt="picture" width={1920} height={1080} />
    //       {/* <ImageBox realImage={item?.large_capsule_image} errorImage={item?.header_image} customStyle='' zoomed={false} /> */}
    //       <div className="bg-gradient-to-t from-[rgba(0,0,0,0.90)] z-10 absolute bottom-0 left-0 w-full h-full" />

    //       <div className="absolute bottom-0 left-2 z-20">
    //         <h1>{item?.name}</h1>
    //         <div>{(item?.final_price ?? 100) / 100}</div>
    //         <div>{(item?.original_price ?? 100) / 100}</div>
    //         <div className="text-sm py-2 flex items-center gap-4">
    //           <span className="opacity-60 ">Platform:</span>
    //           <div className="flex gap-1 text-xl">
    //             {item?.windows_available && <AiFillWindows />}
    //             {item?.mac_available && <RiMacLine />}
    //             {item?.linux_available && <DiLinux />}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </section>
    <section className="p-4">
      <Carousel className="w-full md:w-[90%] mx-auto cursor-grab" setApi={setApi} plugins={[
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
      <div className="py-2 text-center text-sm text-muted-foreground block sm:hidden">
        Slide {current} of {count}
      </div>
    </section>

  );
};

export default Header;
