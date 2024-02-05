'use client'
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import "./globals.scss";
import Navbar from "@/components/LandingUi/Nav";
import { store } from "@/components/redux/store/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
    <html lang="en" className="dark bg-[#192233] text-white" >
      <body>
        <ClerkProvider>
          <NextUIProvider>
            <Provider store={store}>
              <Navbar />
              {children}
            </Provider>
          </NextUIProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
