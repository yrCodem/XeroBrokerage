import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "XeroBrokerage | No Commission Property Platform",
  description: "Find your perfect home with zero brokerage fees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fff6cc] ">
        <AuthProvider>
          <Navbar />
          <main className="max-h-[90vh] max-w-screen relative top-[79px]">
            {children}
          </main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
