'use client'
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { TSingleGameData } from "@/types";
import { GameCard } from "@/components/ui/GameCard";
import { Button } from "@nextui-org/react";


const ClientCart = ({ buyData, total }: { buyData: TSingleGameData[], total: number[] }) => {
    console.log(buyData);
    const [loading, setLoading] = useState(false)
    // handle total
    const handleTotal = () => {
        return total?.reduce((acc, curr) => acc + curr, 0);
    };

    const handleClick = async () => {
        setLoading(true)
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);

        const result = await fetch("/checkout-sessions", {
            method: "post",
            body: JSON.stringify(buyData, null),
            headers: {
                "content-type": "application/json",
            },
        });

        const data = (await result.json()) as Stripe.Checkout.Session;
        const sessionId = data.id!;
        stripe?.redirectToCheckout({ sessionId });
        setLoading(false)
    };

    return (
        <div className="px-10">
            <h1 className="text-3xl">Product Cart</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            <div className="py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {buyData?.map((el) =>
                    <GameCard item={el} key={el.steam_appid} />
                )}
            </div>
            {!!buyData?.length &&
                <>
                    <div className="w-full text-right py-2 text-4xl">
                        Total: &#8377;{handleTotal()}
                    </div>
                    <div className="w-full flex justify-end pb-10">
                        <Button isLoading={loading}
                            className="bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-2xl px-4 py-1 rounded"
                            onClick={() => handleClick()}>
                            Buy Now
                        </Button>
                    </div>
                </>
            }
        </div>

    );
};

export default ClientCart;
