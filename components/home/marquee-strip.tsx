const ITEMS = [
  "Setup checklist", "Shopping list", "Booth layout", "Pricing guide",
  "Launch timeline", "Signage ideas", "Inventory plan", "Packing list",
  "Display tips", "Payment setup", "First popup guide", "Vendor checklist",
  "Budget planner", "Table layout", "Extension cord guide", "Light setup",
  "Gridwall plan", "Garment rack map", "QR code setup", "Thermal receipt",
];

export function MarqueeStrip() {
  return (
    <div className="py-5 bg-[#EDE9E4] overflow-hidden border-y border-[#DDD8D2]">
      <div className="flex items-center whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-0">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 text-sm font-semibold text-[#9E9890] px-6"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-[#C63D2F] flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
