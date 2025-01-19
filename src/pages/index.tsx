import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Menu from "@/components/Menu";
import ColorRow from "@/components/ColorRow";
import ColorRowBig from "@/components/ColorRowBig";
import { useReadContract } from 'wagmi'
import { abi}  from '@/abi/PeaceColor.json'
import Loader from "@/components/Loader";
import { rgbToHex } from "@/utils/colors";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data, isLoading } = useReadContract({
    address: "0x6Ef1196F1b34Bf79A9d8DCB2AF6ef6A5EaC0CaD2",
    abi,
    functionName: 'getColorOrder',
  })

  const colors = data as any[];

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col w-full min-h-screen ">
        <Menu />
        {isLoading && <div><Loader /></div>}
        {colors && colors.map((color: any, index: number, arr: any) => {
          const col = rgbToHex(color.red, color.green, color.blue);
          // if is the last color, use the same color for the next color
          const nextColor = index === arr.length - 1 ? col : rgbToHex(arr[index + 1].red, arr[index + 1].green, arr[index + 1].blue);
          return (
            <ColorRowBig 
              key={index} 
              color1={col}  
              color2={nextColor}
              colorName={color.name} 
            />
          );
        })}
       </main>
    </div>
  );
}
