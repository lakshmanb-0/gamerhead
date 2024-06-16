import "./globals.scss";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "@/components/Provider/Provider";
import { Navbar } from "../components/index";


export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="dark bg-[#192233] text-white" >
      <body>
        <Providers>
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
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
