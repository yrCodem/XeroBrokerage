import Navbar from "@/components/ui/Navbar";
import { WavyBackground } from "@/components/ui/wavy-background";

import "./globals.css";

export const metadata = {
  title: "XeroBrokerage | No Commission Property Platform",
  description: "Find your perfect home with zero brokerage fees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAEDCD] ">
        <Navbar />
        {/* <WavyBackground className="min-w-screen overflow-hidden" backgroundFill={"#FAEDCD"}> */}
          <main className="max-h-[90vh] max-w-screen relative top-[10vh]">{children}</main>
        {/* </WavyBackground> */}
      </body>
    </html>
  );
}
