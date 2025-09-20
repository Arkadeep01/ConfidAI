import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// src/utils/componentTagger.js
export default function componentTagger() {
  return {
    name: "component-tagger",
    transform(code, id) {
      // Example: just return code unmodified
      return code;
    },
  };
}

