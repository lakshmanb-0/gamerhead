'use client'
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { GameCard } from "@/components/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/redux/store/store";
import { toast } from "react-toastify";
import { removeFromCart } from "@/components/redux/reducers/auth.reducers";
import { Button } from "antd";
import { useUser } from "@clerk/nextjs";
import { deleteCart } from "@/app/serverAction/mongodbApi";
import { BsXCircle } from "react-icons/bs";


const Cart = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const state = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { user } = useUser();

    // handle total amount
    const handleTotal = () => {
        let values = state.cartData
        return values.reduce((acc, curr) => acc + (curr?.price_overview?.final || curr?.price_overview?.initial || 0) / 100, 0);
    };
    console.log(state.cartData)

    // handle Payment 
    const handleClick = async () => {
        setLoading(true)
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);
        const result = await fetch("/checkout-sessions", {
            method: "post",
            body: JSON.stringify((state.cartData), null),
            headers: {
                "content-type": "application/json",
            },
        });

        const data = (await result.json()) as Stripe.Checkout.Session;
        const sessionId = data.id!;
        stripe?.redirectToCheckout({ sessionId });
        setLoading(false)
    };

    const handleRemoveCart = async (id: number) => {
        dispatch(removeFromCart(id))
        if (user) {
            await deleteCart(user.id, id)
        }
        toast.success("Mission Abandoned ");
    }

    return (
        <div className="px-10 py-5">
            <h1 className="text-3xl">Product Cart</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            {!!state?.cartData?.length ?
                <>
                    <div className="py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            (state.cartData)?.map((el) =>
                                <div className="relative" key={el.steam_appid}>
                                    <GameCard item={el} key={el.steam_appid} />
                                    <div className="absolute top-1 left-1 z-10 cursor-pointer" onClick={() => handleRemoveCart(el.steam_appid)}>
                                        <BsXCircle size={30} className='bg-[#212224] rounded-full' />
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="w-full text-right py-2 text-4xl">
                        Total: &#8377;{handleTotal()}
                    </div>
                    <div className="w-fit ml-auto">
                        <Button loading={loading}
                            color="primary"
                            disabled={!user}
                            className="bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] text-white text-xl p-5 flex items-center disabled:bg-[#fd2adf] disabled:text-white outline-none"
                            onClick={handleClick}>
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

export default Cart;
