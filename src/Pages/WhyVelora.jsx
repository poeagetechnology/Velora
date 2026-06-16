import React, { useState } from "react";
import { Link } from "react-router-dom";

const TABS = ["Why Velora?", "vs Packet Milk", "vs Local Milkman"];

const features = [
  {
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    stat: "0 external suppliers",
    title: "100% Own Farm",
    desc: "Not a single drop is sourced from outside farms or agents. We own the land, the cows, and the entire process — always.",
  },
  {
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    stat: "Under 3 hrs — farm to doorstep",
    title: "Same-Morning Fresh",
    desc: "Milked at 4:30 AM, tested, packaged, and delivered by 6 AM. You drink milk that is literally hours old, not days.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    stat: "No preservatives, hormones, or chemicals",
    title: "Zero Additives",
    desc: "We add nothing. No homogenization, no standardization, no preservatives. Pure milk exactly as it comes from our cows.",
  },
  {
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    stat: "Every batch, every morning",
    title: "Daily Lab Testing",
    desc: "Fat percentage, purity, and freshness tested on-site before any packaging. No batch leaves our farm without passing.",
  },
  {
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z",
    icon2: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    stat: "Open farm — visit anytime",
    title: "Full Traceability",
    desc: "Know exactly which farm and which cows produce your milk. We welcome visits — our transparency is not a marketing claim.",
  },
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    stat: "Gobichettipalayam's own",
    title: "Local Community",
    desc: "Founded and run entirely in Gobichettipalayam. Every rupee supports local families, farmers, and our community.",
  },
];

const vsPacketRows = [
  { label: "Milk Age",          them: "1–5 days old before you drink it",                    us: "Under 3 hours from milking to your door" },
  { label: "Source",            them: "Anonymous — multiple farms, unknown suppliers",         us: "100% own farm, Kallipatti, Gobichettipalayam" },
  { label: "Additives",         them: "Preservatives, emulsifiers, homogenization agents",    us: "Absolutely nothing added, ever" },
  { label: "Fat Content",       them: "Standardized — fat removed and re-added artificially", us: "Natural fat content, completely untouched" },
  { label: "Traceability",      them: "No farm identity — black-box supply chain",            us: "Know your farm, know your cows, visit anytime" },
  { label: "Testing",           them: "Factory batch testing at periodic intervals",           us: "Daily on-site testing — every single batch" },
  { label: "Delivery",          them: "Factory → distributors → shops → you",                 us: "Our farm → our team → your doorstep" },
  { label: "Freshness Proof",   them: "None — shelf life is the priority, not taste",         us: "Guaranteed same-morning, timestamped delivery" },
];

const vsLocalRows = [
  { label: "Farm Verification", them: "Completely unverifiable — source unknown",                    us: "100% own farm, open for visits anytime" },
  { label: "Adulteration Risk", them: "Very high — water, starch & chemicals common",                us: "Zero — daily tested, nothing added" },
  { label: "Testing",           them: "None — no fat % or purity testing done",                      us: "Daily fat % and purity test on every batch" },
  { label: "Delivery Timing",   them: "Irregular — missed days, no fixed time",                      us: "6:00 AM sharp, 365 days, no exceptions" },
  { label: "Cow Health",        them: "Health status of cows unknown to you",                         us: "Weekly vet checkups, health logs maintained" },
  { label: "Accountability",    them: "Informal — no documentation, no recourse",                     us: "Full accountability via WhatsApp + records" },
  { label: "Packaging",         them: "Open containers — hygiene not guaranteed",                     us: "Sealed sterile pouches, tamper-evident" },
  { label: "Consistency",       them: "Variable quantity and quality day to day",                     us: "Consistent, measured quantity every delivery" },
];

function FIcon({ d, d2 }) {
  return (
    <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
    </svg>
  );
}

function Check() {
  return (
    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function WhyTab() {
  return (
    <div>
      <div className="text-center max-w-xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Real standards. Real farm. Real milk.
        </h3>
        <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
          Every claim below is verifiable — visit our farm in Kallipatti and see it for yourself.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-200"
          >
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <FIcon d={f.icon} d2={f.icon2} />
            </div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
              {f.stat}
            </span>
            <h4 className="font-bold text-gray-900 text-base mb-2">{f.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-white text-lg">See it in person.</p>
          <p className="text-blue-300 text-sm mt-1">
            Our Kallipatti farm is always open to customers. Come visit, see your milk's origin.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link
            to="/products"
            className="px-6 py-2.5 bg-white text-blue-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all"
          >
            Shop Now
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2.5 border border-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComparisonPanel({ competitorName, verdict, rows }) {
  return (
    <div>
      <div className="text-center max-w-xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Velora vs {competitorName}
        </h3>
        <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">{verdict}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <div className="min-w-[580px]">
          {/* Header row */}
          <div className="grid grid-cols-[160px_1fr_1fr] border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Comparing</p>
            </div>
            <div className="bg-red-50 border-l border-red-100 px-6 py-4 flex items-center gap-2">
              <Cross />
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">{competitorName}</p>
            </div>
            <div className="bg-blue-900 border-l border-blue-800 px-6 py-4 flex items-center gap-2">
              <Check />
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Velora</p>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[160px_1fr_1fr] border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}
            >
              <div className="px-6 py-5 flex items-center border-r border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{row.label}</p>
              </div>
              <div className="px-5 py-5 flex items-start gap-3 border-r border-red-100 bg-red-50/30">
                <Cross />
                <p className="text-sm text-gray-500 leading-snug">{row.them}</p>
              </div>
              <div className="px-5 py-5 flex items-start gap-3 bg-emerald-50/40">
                <Check />
                <p className="text-sm font-medium text-gray-800 leading-snug">{row.us}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-white text-lg">The choice is clear.</p>
          <p className="text-blue-300 text-sm mt-1">
            Switch to Velora — your family deserves milk you can actually trust.
          </p>
        </div>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%27d%20like%20to%20start%20receiving%20Velora%20milk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3 bg-white text-blue-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Get Started on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function WhyVelora() {
  const [tab, setTab] = useState(0);

  return (
    <section className="py-20 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-700">Know the Difference</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Why Choose Velora?
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] max-w-sm mx-auto">
            Compare us against the alternatives. We don't ask you to take our word for it.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 gap-1 shadow-sm">
            {TABS.map((label, i) => (
              <button
                key={label}
                onClick={() => setTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  tab === i
                    ? "bg-blue-900 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab panels */}
        <div key={tab}>
          {tab === 0 && <WhyTab />}
          {tab === 1 && (
            <ComparisonPanel
              competitorName="Packet Milk"
              verdict="Branded packet milk trades freshness for shelf life. Velora gives you what no packet can — milk that's hours old, untouched, and traceable to a single farm."
              rows={vsPacketRows}
            />
          )}
          {tab === 2 && (
            <ComparisonPanel
              competitorName="Local Milkman"
              verdict="Local milkmen feel familiar — but without testing, verification, or accountability, you're trusting the unknown. Velora delivers the same doorstep convenience with complete transparency."
              rows={vsLocalRows}
            />
          )}
        </div>

      </div>
    </section>
  );
}
