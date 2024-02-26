'use client'
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import "./globals.scss";
import Navbar from "@/components/LandingUi/Nav";
import { store } from "@/components/redux/store/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <ClerkProvider>
      <html lang="en" className="dark bg-[#192233] text-white" >
        <body>
          <NextUIProvider>
            <Provider store={store}>
              <Navbar />
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Zoom}
              />
            </Provider>
          </NextUIProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
