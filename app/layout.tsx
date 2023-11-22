'use client'
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.scss";
import { store } from "@/components/redux/store/store";
import Navbar from "@/components/LandingUi/Navbar";

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body>
          <Provider store={store}>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
