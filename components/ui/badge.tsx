import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "red" | "cobalt" | "olive" | "butter" | "coral";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full tracking-wide",
        variant === "default" && "bg-[#EDE9E4] text-[#6B6560]",
        variant === "red"     && "bg-[#F0D5D2] text-[#9B2F24]",
        variant === "cobalt"  && "bg-[#D2DCF0] text-[#3D5A8A]",
        variant === "olive"   && "bg-[#DDE5D2] text-[#6B7C52]",
        variant === "butter"  && "bg-[#F5E9C8] text-[#8B6A1A]",
        variant === "coral"   && "bg-[#F5E0D5] text-[#C97B5A]",
        className,
      )}
    >
      {children}
    </span>
  );
}
