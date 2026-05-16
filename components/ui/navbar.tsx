"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases",    href: "#use-cases" },
  { label: "Examples",     href: "#examples" },
  { label: "Pricing",      href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#FDFAF7]/92 backdrop-blur-md border-b border-[#DDD8D2]/60 shadow-[0_1px_0_rgba(26,25,22,0.04)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C63D2F] flex items-center justify-center shadow-[0_2px_0_#9B2F24]">
              {/* Placeholder logo mark — replace with SVG */}
              <span className="text-white font-black text-sm leading-none tracking-tight">P</span>
            </div>
            <span className="text-[#1A1916] font-bold text-lg tracking-tight">
              popdock
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6B6560] hover:text-[#1A1916] px-3 py-2 rounded-lg hover:bg-[#EDE9E4] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-[#6B6560] hover:text-[#1A1916] px-3 py-2 rounded-lg hover:bg-[#EDE9E4] transition-all"
            >
              Sign in
            </Link>
            <Link href="/onboarding">
              <Button size="md">
                Start your kit
                <ArrowUpRight size={14} weight="bold" />
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#EDE9E4] text-[#6B6560] hover:text-[#1A1916] transition-all"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#FDFAF7] border-b border-[#DDD8D2] px-6 py-4 flex flex-col gap-1 md:hidden shadow-lg"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-[#1A1916] py-3 border-b border-[#EDE9E4] hover:text-[#C63D2F] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/auth/login" className="text-sm text-center text-[#6B6560] py-2">
                Sign in
              </Link>
              <Link href="/onboarding" className="w-full">
                <Button size="lg" className="w-full">Start your kit</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
