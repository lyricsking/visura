import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getNanoid = (count: number) => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, count);

  return nanoid();
};
