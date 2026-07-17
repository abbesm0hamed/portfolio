import type { ClassValue } from "cnfast";
import { clsx, twMerge } from "cnfast";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
