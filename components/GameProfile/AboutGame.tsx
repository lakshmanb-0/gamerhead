import React from 'react'
import { SupportLanguages } from '../index'
import { TSingleGameData } from '@/types'
import parse from "html-react-parser";

const AboutGame = ({ gameData }: { gameData: TSingleGameData }) => {
    console.log(gameData)
    const { about_the_game, supported_languages, pc_requirements, content_descriptors, legal_notice } = gameData

    return (
        <section className="grid md:grid-cols-2 gap-20 maxWidth">
            {
                about_the_game &&
                <section className="newsContent pb-5 sm:pb-10 ">
                    <div className="py-4">
                        <h1 className="font-bold text-4xl">About the Game</h1>
                        <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
                    </div>
                    <div className="text-lg py-2">{parse(about_the_game)}</div>
                </section>
            }

            <section>
                {!!supported_languages?.length &&
                    <SupportLanguages supported_languages={supported_languages.split(',')} />
                }

                {!!pc_requirements && <section>
                    <div className="py-4">
                        <h1 className="pt-10 font-bold text-3xl">System Requirements :</h1>
                        <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
                    </div>
                    <div className="grid  md:grid-cols-2 gap-4 py-10 requirement text-lg">
                        <div>{parse(pc_requirements?.minimum ?? '')}</div>
                        <div>{parse(pc_requirements?.minimum ?? '')}</div>
                    </div>
                </section>}

                {!!content_descriptors?.notes && <section>
                    <div className="py-4">
                        <h1 className="pt-10 font-bold text-3xl">Mature Content Description :</h1>
                        <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
                    </div>
                    <div className="text-lg py-2" >{parse(content_descriptors?.notes ?? '')}</div>
                </section>}

                <div className="text-sm text-[#555555] newsContent pt-3">{parse(legal_notice ?? '')}</div>
            </section>
        </section>
    )
}

export default AboutGame