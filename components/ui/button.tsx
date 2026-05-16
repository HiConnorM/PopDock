"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all press select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C63D2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EE]",
          "disabled:opacity-40 disabled:cursor-not-allowed",

          variant === "primary" && [
            "bg-[#C63D2F] text-[#FDFAF7] border border-[#9B2F24]",
            "hover:bg-[#B5362A] shadow-[0_2px_0_0_#9B2F24,0_4px_12px_rgba(198,61,47,0.20)]",
            "hover:shadow-[0_1px_0_0_#9B2F24,0_2px_8px_rgba(198,61,47,0.16)]",
            "hover:-translate-y-px",
          ],

          variant === "secondary" && [
            "bg-[#FDFAF7] text-[#1A1916] border border-[#DDD8D2]",
            "hover:bg-[#F5F2EE] hover:border-[#C5BEB6]",
            "shadow-[var(--shadow-sm)]",
          ],

          variant === "ghost" && [
            "bg-transparent text-[#6B6560]",
            "hover:bg-[#EDE9E4] hover:text-[#1A1916]",
          ],

          variant === "outline" && [
            "bg-transparent text-[#1A1916] border border-[#DDD8D2]",
            "hover:bg-[#EDE9E4]",
          ],

          variant === "danger" && [
            "bg-[#FDF1F0] text-[#C63D2F] border border-[#F0D5D2]",
            "hover:bg-[#F0D5D2]",
          ],

          size === "sm"  && "text-sm px-3 py-1.5 h-8",
          size === "md"  && "text-sm px-4 py-2 h-9",
          size === "lg"  && "text-base px-6 py-3 h-11",

          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
