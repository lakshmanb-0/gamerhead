"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { TGameData, TGameDataProps } from "@/types";

const Header = ({ gameData }: TGameDataProps) => {
  const router = useRouter();
  //handle click button
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <section>
      {/* games list  */}
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        slidesPerView={2}
      >
        {gameData.map((item: TGameData, index: number) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleClick(item.id)}
              className="cursor-pointer"
            >
              <Image
                src={item?.large_capsule_image || item?.small_capsule_image}
                width={1080}
                height={1920}
                alt={item?.name}
                className="h-[24rem]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Header;
