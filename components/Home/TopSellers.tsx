import React from "react";
import { TGameData } from "@/types";
import { GameCard } from '../index'

type Props = {
  gameData: TGameData[];
}

const TopSellers: React.FC<Props> = ({ gameData }) => {
  return (
    <section className="py-5 sm:py-10 px-4">
      <h1 className="font-bold text-3xl sm:text-4xl py-4">Top Sellers</h1>
      <div className='grid sm:grid-cols-2 gap-6 p-2 md:grid-cols-3'>
        {gameData?.map((item) => item.type == 0 && (
          <GameCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
export default TopSellers;

