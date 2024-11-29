import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getNanoid = (count: number = 10) => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, count);

  return nanoid();
};
