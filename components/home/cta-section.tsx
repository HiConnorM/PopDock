import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFAF7] overflow-hidden relative border-t border-[#EDE9E4]">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, #DDD8D2 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Red accent glow */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,61,47,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
              Ready?
            </p>
            <h2 className="text-[48px] md:text-[64px] xl:text-[72px] font-black tracking-[-0.04em] leading-[0.95] text-[#1A1916] mb-6">
              Your booth<br />is waiting.
            </h2>
            <p className="text-lg text-[#6B6560] leading-relaxed max-w-[480px]">
              Build your popup kit in minutes. Checklists, layouts, shopping lists, and timelines — all in one place, ready to print.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/onboarding">
              <button className="inline-flex items-center gap-2 bg-[#C63D2F] text-white font-bold text-base px-8 py-4 rounded-[12px] border border-[#9B2F24] shadow-[0_3px_0_#9B2F24] hover:translate-y-[2px] hover:shadow-[0_1px_0_#9B2F24] transition-all press whitespace-nowrap">
                Build my popup kit
                <ArrowUpRight size={18} weight="bold" />
              </button>
            </Link>
            <p className="text-xs text-[#9E9890] text-center">
              Free to start. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
