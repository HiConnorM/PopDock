import Link from "next/link";

export const metadata = { title: "Create account — Popdock" };

export default function SignupPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C63D2F] flex items-center justify-center shadow-[0_3px_0_#9B2F24]">
              <span className="text-white font-black text-base">P</span>
            </div>
            <span className="text-[#1A1916] font-bold text-xl tracking-tight">popdock</span>
          </Link>
        </div>

        <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[20px] p-8 shadow-[var(--shadow-lg)]">
          <h1 className="text-2xl font-black text-[#1A1916] tracking-tight mb-1">Create your account</h1>
          <p className="text-sm text-[#6B6560] mb-6">Start building your first popup kit — it&apos;s free.</p>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1916]">Your name</label>
              <input
                type="text"
                placeholder="First name"
                className="px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#F5F2EE] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1916]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#F5F2EE] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1916]">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#F5F2EE] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all"
              />
            </div>

            <Link href="/onboarding">
              <button
                type="button"
                className="w-full py-3 rounded-[10px] bg-[#C63D2F] text-white text-sm font-bold border border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A] transition-colors press mt-2"
              >
                Create free account
              </button>
            </Link>
          </form>

          <p className="text-center text-xs text-[#9E9890] mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#C63D2F] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
