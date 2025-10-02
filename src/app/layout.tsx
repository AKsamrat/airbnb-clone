import type { Metadata } from "next";
import { Merriweather, Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "900"], // adjust as needed
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular + Bold
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AirBnb",
  description: "For Rent Home",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${merriweather.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
