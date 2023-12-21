'use client'
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import "./globals.scss";
import Navbar from "@/components/LandingUi/Nav";
import { store } from "@/components/redux/store/store";

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='dark' >
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
