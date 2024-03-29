'use client'
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { TSingleGameData } from "@/types";
import { GameCard } from "@/components/ui/GameCard";
import { Button } from "@nextui-org/react";
import { getAppDetails } from "../server.ts/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/components/redux/store/store";


const ClientCart = ({ buyData, total }: { buyData: TSingleGameData[], total: number[] }) => {
    console.log(buyData);
    const [cartData, setCartData] = useState<TSingleGameData[]>([])
    const [totalCart, setTotalCart] = useState<number[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const state = useSelector((state: RootState) => state.auth)

    // if user is loggedIn then fetchCartData from database
    useEffect(() => {
        const fetchCartData = async () => {
            let cart: TSingleGameData[] | any[] = [];
            let tot: number[] = []

            cart = await Promise.all((state.cartData ?? [])?.map(async (id) => {
                const response = await getAppDetails(id);
                response[id]?.data?.price_overview && tot.push(response[id]?.data?.price_overview?.final / 100)
                return response[id]?.data
            }))
            setCartData(cart)
            setTotalCart(tot)
        }
        !!!buyData?.length && fetchCartData()
    }, [])
    console.log(cartData);

    // handle total amount
    const handleTotal = () => {
        let values = !!total.length ? total : totalCart
        return values?.reduce((acc, curr) => acc + curr, 0);
    };

    // handle Payment 
    const handleClick = async () => {
        setLoading(true)
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);

        const result = await fetch("/checkout-sessions", {
            method: "post",
            body: JSON.stringify((!!buyData?.length ? buyData : cartData), null),
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

            {(!!state?.cartData?.length) ?
                <>
                    <div className="py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(!!buyData.length ? buyData : cartData)?.map((el) =>
                            <GameCard item={el} key={el.steam_appid} />
                        )}
                    </div>
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
                :
                <section className="flex justify-center items-center flex-col ">
                    <img src="./empty_cart.png" className="w-80" />
                    <h1 className="font-bold text-5xl text-center">Your Cart is empty</h1>
                    <p className="text-default-500 pt-4">Looks like you have not added anything to you cart. Go ahead & explore some games</p>
                </section>
            }
        </div>

    );
};

export default ClientCart;
