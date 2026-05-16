"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "@phosphor-icons/react";

const TESTIMONIALS = [
  {
    quote: "I&apos;d been wanting to sell at markets for two years but kept getting overwhelmed by logistics. Popdock broke it all down into something I could actually do. Set up my first vintage table in three weeks.",
    name: "Zara Mensah",
    role: "Vintage reseller",
    location: "Chicago, IL",
    img: "seed/zm2024/48/48",
    tag: "Vintage Clothing",
  },
  {
    quote: "The shopping list alone saved me hours. I always forget cables, extension cords, random stuff. Having a complete list by booth type changed the whole experience.",
    name: "Tomás Reyes",
    role: "Artist alley regular",
    location: "Portland, OR",
    img: "seed/tr2024/48/48",
    tag: "Artist Alley",
  },
  {
    quote: "First time doing a craft fair at 48 years old. The timeline it generated made the whole thing feel manageable. Even told me when to post on Instagram.",
    name: "Beverly Nguyen",
    role: "Candle maker",
    location: "Austin, TX",
    img: "seed/bev2024/48/48",
    tag: "Handmade Goods",
  },
  {
    quote: "I run markets every weekend now. Popdock helps me prep new booth concepts fast. The export to PDF is genuinely useful — I print the packing list and check things off in real time.",
    name: "Amos Darko",
    role: "Streetwear vendor",
    location: "Atlanta, GA",
    img: "seed/ad2024/48/48",
    tag: "Streetwear",
  },
  {
    quote: "The booth layout tool helped me figure out exactly how to fit everything on a 6ft table without it looking chaotic. I&apos;ve tried doing this in Google Docs — it doesn&apos;t compare.",
    name: "Priya Subramaniam",
    role: "Jewelry & ceramics",
    location: "San Francisco, CA",
    img: "seed/ps2024/48/48",
    tag: "Craft Fair",
  },
  {
    quote: "My first coffee cart pop-up had zero drama. I had a list of every piece of equipment, a timeline, and a pricing breakdown. This thing is built for people who actually want to do the work.",
    name: "Kai Holbrook",
    role: "Coffee cart operator",
    location: "Denver, CO",
    img: "seed/kh2024/48/48",
    tag: "Food Popup",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-32 bg-[#FDFAF7]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
            Creator stories
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916]">
            They showed up.<br />Ready.
          </h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
              }}
              className={`bg-[#F5F2EE] border border-[#EDE9E4] rounded-[16px] p-6 flex flex-col gap-4 ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={13} color="#D4A843" weight="fill" />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-[#4A4540] text-sm leading-relaxed flex-1 max-w-none"
                dangerouslySetInnerHTML={{ __html: t.quote }}
              />

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#EDE9E4]">
                <img
                  src={`https://picsum.photos/${t.img}`}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1A1916] truncate">{t.name}</p>
                  <p className="text-xs text-[#9E9890] truncate">{t.role} · {t.location}</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6560] bg-[#EDE9E4] px-2 py-0.5 rounded-full flex-shrink-0">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
