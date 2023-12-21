'use client'
import React, { useEffect } from "react";
import Head from "next/head";
// import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ImageBox from "@/components/ImageBox";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { TSingleGameData } from "@/types";


const ClientCart = ({ buyData, total }: { buyData: TSingleGameData[], total: number[] }) => {
    const router = useRouter();
    console.log(buyData);
    console.log(total);

    // handle total
    const handleTotal = () => {
        return total?.reduce((acc, curr) => acc + curr, 0);
    };

    const handleClick = async () => {
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
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="px-10">
                <h1 className="text-3xl">Product Cart</h1>
                <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
                <div className="py-10">
                    {buyData?.map((el) =>
                        <div key={el?.name} >
                            <div>{el?.name}</div>
                            <ImageBox realImage={el?.header_image} errorImage={el?.background_raw} customStyle="h-[300px]" />
                        </div>
                    )}
                    {/* {buy.length !== 0 ? (
                        buy.map((item) => <Wishlist key={item.id} item={item} type="buy" />)
                    ) : <div className="bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-center py-3">
                            Buy Games
                        </div>
                    } */}
                </div>
                <div className="w-full text-right py-2 text-4xl">
                    Total: &#8377;{handleTotal()}
                </div>
                <div className="w-full flex justify-end pb-10">
                    <button
                        className="bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-2xl px-4 py-1 rounded"
                        onClick={() =>
                            handleClick()
                        }>
                        Buy Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default ClientCart;
