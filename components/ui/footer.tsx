import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const FOOTER_LINKS = {
  Product: [
    { label: "How it works",  href: "#how-it-works" },
    { label: "Use cases",     href: "#use-cases" },
    { label: "Pricing",       href: "#pricing" },
    { label: "Templates",     href: "/templates" },
    { label: "Examples",      href: "#examples" },
  ],
  Creators: [
    { label: "Vintage sellers",   href: "#" },
    { label: "Artist alley",      href: "#" },
    { label: "Craft fair booths", href: "#" },
    { label: "Food popups",       href: "#" },
    { label: "Streetwear",        href: "#" },
  ],
  Company: [
    { label: "About",      href: "#" },
    { label: "Blog",       href: "#" },
    { label: "Changelog",  href: "#" },
    { label: "Contact",    href: "mailto:hello@popdock.io" },
  ],
  Legal: [
    { label: "Privacy",  href: "#" },
    { label: "Terms",    href: "#" },
    { label: "Cookies",  href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#FDFAF7] border-t border-[#EDE9E4] mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-[#EDE9E4]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#C63D2F] flex items-center justify-center shadow-[0_2px_0_#9B2F24]">
                <span className="text-white font-black text-xs">P</span>
              </div>
              <span className="text-[#1A1916] font-bold text-base tracking-tight">popdock</span>
            </div>
            <p className="text-sm text-[#9E9890] leading-relaxed max-w-[240px]">
              The operating system for real-world creators. Launch your popup without the chaos.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#C63D2F] hover:text-[#B5362A] transition-colors group"
            >
              Start your popup kit
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <p className="text-[#1A1916] text-xs font-bold uppercase tracking-widest mb-1">
                {heading}
              </p>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#9E9890] hover:text-[#1A1916] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5BEB6]">
          <p>&copy; {new Date().getFullYear()} Popdock, Inc. All rights reserved.</p>
          <p>Built for the makers, sellers, and artists doing it for real.</p>
        </div>
      </div>
    </footer>
  );
}
