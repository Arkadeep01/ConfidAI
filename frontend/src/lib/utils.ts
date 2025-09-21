// /workspaces/ConfidAI/frontend/src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function componentTagger() {
  return {
    name: "component-tagger",
    transform(code: string, id: string) {
      // Example: just return code unmodified
      return code;
    },
  };
}
