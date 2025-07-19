import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from '@/assets/lottie-json'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#2c0b0b2a] text-[#e74c3c] border-[1px] border-[#e74c3cbb]",
  "bg-[#001f3f2a] text-[#0074d9] border-[1px] border-[#0074d9bb]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOptions = {
  loop:true,
  autoplay:true,
  animationData,
}


