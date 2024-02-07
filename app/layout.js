import Header from "@/components/Header";
import Layout from "@/components/Layout";
import GlobalStyles from "@/app/styles/GlobaslStyles";
import { Inter } from "next/font/google";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Front",
  description: "Front for Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalStyles /> 
      <body className={inter.className}>
        
        <CartContextProvider>
          <Layout>
             
            {children}</Layout>
        </CartContextProvider>
      </body>
    </html>
  );
}
