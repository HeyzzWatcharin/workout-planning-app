import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import ParticlesBackground from "./components/ParticlesBackground";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout-Planning",
  description: "Created By Nextjs version 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* <ParticlesBackground /> */}
        {children}
      </body>
    </html>
  );
}
