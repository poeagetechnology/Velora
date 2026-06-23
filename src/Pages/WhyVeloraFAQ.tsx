import React, { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQTier {
  id: string;
  tier: string;
  label: string;
  dotClass: string;
  borderClass: string;
  badgeClass: string;
  items: FAQItem[];
}

const FAQ_TIERS: FAQTier[] = [
  {
    id: "why-velora",
    tier: "01",
    label: "Why Velora?",
    dotClass: "bg-green-600",
    borderClass: "border-green-100",
    badgeClass: "bg-green-50 text-green-700",
    items: [
      {
        q: "What makes Velora fundamentally different from other dairy brands?",
        a: "Velora is the only dairy in Gobichettipalayam that owns every link in the chain — the land, the cows, the fodder, and the delivery team. There are no agents, no aggregators, no distribution gaps. Every litre begins and ends with us. That is not a marketing claim; it is verifiable by visiting our farm.",
      },
      {
        q: "Is the milk genuinely fresh every single morning?",
        a: "Without exception. Milking starts at 4:30 AM, on-site testing and packaging completes by 5:30 AM, and your delivery arrives between 5:00 AM – 7:00 AM (timing varies based on your distance from the shop). The milk you drink is under 3 hours old — not 2 days old like chilled packet milk, not 'this week' like most commercial options.",
      },
      {
        q: "Can I actually visit the farm and see where my milk comes from?",
        a: "Yes — and we actively encourage it. Our Kallipatti farm is open to customers. One Cow Program subscribers have a standing visit privilege. Any other customer can schedule a visit by contacting us on WhatsApp. Transparency is not a brand value we print on a box. It is a daily operating standard.",
      },
    ],
  },
  {
    id: "vs-packet",
    tier: "02",
    label: "Why better than Packet Milk?",
    dotClass: "bg-amber-500",
    borderClass: "border-amber-100",
    badgeClass: "bg-amber-50 text-amber-700",
    items: [
      {
        q: "How is Velora's freshness different from branded packet milk like Aavin or Amul?",
        a: "Branded packet milk passes through collection hubs, pasteurisation plants, cold-chain warehouses, distributor depots, and retail shelves — often 2 to 5 days before it reaches you. Velora milk is collected and at your door within 3 hours of milking. Those are categorically different products, regardless of the packaging.",
      },
      {
        q: "Does Velora add preservatives or chemicals like packet milk does?",
        a: "Never. Packet milk is homogenised, standardised, and chemically treated to achieve a shelf life that suits logistics. Velora adds nothing — no emulsifiers, no preservatives, no artificial fat manipulation. What the cow produces is what reaches your glass, in the same morning.",
      },
      {
        q: "Is the fat content more natural than standardised packet milk?",
        a: "Yes. During packet milk processing, natural fat is removed and re-added to hit regulatory percentage targets. Velora milk is completely untouched — the fat ratio is exactly as nature produced it, which is why the taste, texture, and cream layer are noticeably richer than anything in a packet.",
      },
    ],
  },
  {
    id: "vs-milkman",
    tier: "03",
    label: "Why better than a Local Milkman?",
    dotClass: "bg-emerald-600",
    borderClass: "border-emerald-100",
    badgeClass: "bg-emerald-50 text-emerald-700",
    items: [
      {
        q: "How can I be certain Velora milk is not adulterated?",
        a: "With a local milkman, you cannot — the source is unknown and there is no testing. At Velora, every single batch is tested on-site each morning for fat percentage, purity, and freshness. Results are documented. You can request them at any time. The difference between Velora and a local milkman is: one is verifiable, the other is trust on faith.",
      },
      {
        q: "What if the local milkman misses a day or delivers at irregular times?",
        a: "Local milkmen operate on informal personal arrangements with no contractual obligation and no accountability structure. Velora delivers 365 days a year between 5:00 AM – 7:00 AM (exact time varies by your distance from the shop). If there is ever an issue, you have a direct WhatsApp support line to our team — not an individual's personal number that may or may not be answered.",
      },
      {
        q: "Is there any health monitoring on the cows at Velora?",
        a: "Every cow in our herd receives weekly veterinary check-ups and daily health logs. Only cows cleared by our vet team contribute to morning milking. A local milkman cannot give you any of this information because they typically do not have it. Your family's health depends on the source — we hold ourselves to a documented standard.",
      },
    ],
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  dotClass: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  dotClass,
}) => {
  return (
    <div className={`border-b border-gray-100 last:border-0`}>
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start gap-4 group"
        aria-expanded={isOpen}
      >
        <span
          className={`mt-2 flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200 ${
            isOpen ? dotClass : "bg-gray-300"
          }`}
        />
        <span
          className={`flex-1 font-semibold text-sm leading-snug transition-colors duration-200 ${
            isOpen ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "bg-gray-900 border-gray-900"
              : "border-gray-200 group-hover:border-gray-400"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? "rotate-45 text-white" : "text-gray-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pl-6 pb-5 text-sm text-gray-500 leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
};

export default function WhyVeloraFAQ() {
  const [openKeys, setOpenKeys] = useState<Record<string, number | null>>({
    "why-velora": null,
    "vs-packet": null,
    "vs-milkman": null,
  });

  const toggle = (tierId: string, index: number) => {
    setOpenKeys((prev) => ({
      ...prev,
      [tierId]: prev[tierId] === index ? null : index,
    }));
  };

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-green-700">
            Your Questions Answered
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Everything you need to know.
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
            Straight answers about what sets Velora apart — no filler, no
            jargon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {FAQ_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-2xl overflow-hidden ${tier.borderClass}`}
            >
              {/* Tier header */}
              <div className="px-6 py-5 border-b border-inherit bg-gray-50/60">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold tracking-widest px-2.5 py-1 rounded-full ${tier.badgeClass}`}
                  >
                    {tier.tier}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {tier.label}
                  </h3>
                </div>
              </div>

              {/* FAQ items */}
              <div className="px-6">
                {tier.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    isOpen={openKeys[tier.id] === i}
                    onToggle={() => toggle(tier.id, i)}
                    dotClass={tier.dotClass}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
