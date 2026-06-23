import React, { useState } from "react";
import { Link } from "react-router-dom";
import Herosection from "./Herosection";
import WhyVelora from "./WhyVelora";
import WhyVeloraFAQ from "./WhyVeloraFAQ";
import FarmMediaGallery from "./FarmMediaGallery";
import MilkImg from "../Asset/Milk.png";
import GheeImg from "../Asset/Ghee.png";
import ButterImg from "../Asset/Butter.png";
import CurdImg from "../Asset/Curd.png";

// ── Icon helper ────────────────────────────────────────────────────────────────
function Icon({
  d,
  d2,
  size = "w-5 h-5",
  color = "text-green-700",
  weight = "1.7",
}) {
  return (
    <svg
      className={`${size} ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={weight}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
    </svg>
  );
}

// ── Paths ──────────────────────────────────────────────────────────────────────
const P = {
  home: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z",
  eyePupil: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  sparkles:
    "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  cube: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  users:
    "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  beaker:
    "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  shield:
    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  heart:
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  archive:
    "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M6 12h12M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  truck:
    "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  recycle:
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  mapPin:
    "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  check: "M5 13l4 4L19 7",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  arrowR: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
  chevD: "M19 9l-7 7-7-7",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: "100%", label: "Own Farm Production" },
  { value: "0", label: "External Suppliers" },
  { value: "< 3 hrs", label: "Farm to Doorstep" },
  { value: "365", label: "Days a Year Delivery" },
];

// Dynamic key/value metadata — add or remove entries here without touching render code
const farmMetadata = {
  dailyMilking: { value: "4:30 AM", label: "Daily milking time" },
  farmToDoor: { value: "< 3 hrs", label: "Farm to doorstep" },
  externalSuppliers: { value: "0", label: "External suppliers" },
  ownFarm: { value: "100%", label: "Own farm production" },
};
const farmMetrics = Object.values(farmMetadata);

// Farm media assets for gallery — replace src values with real CDN/local paths
const farmAssets = [
  {
    id: "milk-1",
    type: "image",
    src: MilkImg,
    alt: "Fresh milk from our farm",
    caption: "Morning collection — Kallipatti farm",
  },
  {
    id: "ghee-1",
    type: "image",
    src: GheeImg,
    alt: "Pure ghee hand-churned on farm",
    caption: "Hand-churned ghee",
  },
  {
    id: "butter-1",
    type: "image",
    src: ButterImg,
    alt: "Creamy butter fresh from cream",
    caption: "Farm-fresh butter",
  },
  {
    id: "curd-1",
    type: "image",
    src: CurdImg,
    alt: "Naturally set curd",
    caption: "Naturally set curd",
  },
];

const whyFeatures = [
  {
    icon: P.home,
    title: "Own Farm Production",
    desc: "No middlemen, no agents. Every drop comes from our own cows at our Kallipatti farm.",
  },
  {
    icon: P.clock,
    title: "Freshly Milked Every Morning",
    desc: "Our cows are milked at 4:30 AM. By the time you wake up, fresh milk is already on its way.",
  },
  {
    icon: P.bolt,
    title: "Delivered Within Hours",
    desc: "From our farm gate to your doorstep in under 3 hours. No cold chain delays, no compromise.",
  },
  {
    icon: P.eye,
    icon2: P.eyePupil,
    title: "Transparent Source",
    desc: "Know exactly where your milk comes from. We share farm updates, testing results, and more.",
  },
  {
    icon: P.sparkles,
    title: "Natural Nutrition",
    desc: "No hormones, no antibiotics, no adulteration. Pure milk exactly as nature intended.",
  },
  {
    icon: P.cube,
    title: "Sustainable Packaging",
    desc: "Biodegradable pouches and eco-first packaging choices to keep our footprint minimal.",
  },
  {
    icon: P.users,
    title: "Local Community",
    desc: "We are from Gobichettipalayam. Every purchase supports local families and our farming community.",
  },
];

const transparencyItems = [
  {
    icon: P.sparkles,
    title: "Natural Fodder",
    desc: "Cows fed on farm-grown grass and fodder — no synthetic feed, no additives of any kind.",
  },
  {
    icon: P.beaker,
    title: "Daily Testing",
    desc: "Every batch tested for fat content, purity, and freshness each morning before packaging.",
  },
  {
    icon: P.shield,
    title: "Zero Adulteration",
    desc: "No water, no chemicals, no preservatives. Our testing process backs every claim.",
  },
  {
    icon: P.heart,
    title: "Health Monitoring",
    desc: "Every cow receives weekly vet checkups and daily care logs to ensure only healthy milk.",
  },
  {
    icon: P.archive,
    title: "Eco Packaging",
    desc: "Biodegradable pouches for daily delivery. Glass bottles available for premium subscribers.",
  },
  {
    icon: P.truck,
    title: "Own Delivery Team",
    desc: "Our own staff deliver directly to your door — no third-party logistics, no temperature gaps.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Natural Grazing",
    desc: "Cows graze freely on our Kallipatti farm's lush pastures, eating only farm-grown natural fodder.",
  },
  {
    num: "02",
    title: "Morning Milking",
    desc: "Milking begins at 4:30 AM under hygienic, stress-free conditions by our trained team.",
  },
  {
    num: "03",
    title: "Quality Testing",
    desc: "Each batch is tested on-site for fat percentage, purity, and freshness immediately after collection.",
  },
  {
    num: "04",
    title: "Careful Packaging",
    desc: "Milk sealed in sterile, food-grade containers within minutes of testing. Zero exposure to open air.",
  },
  {
    num: "05",
    title: "Direct Delivery",
    desc: "Our own delivery team brings fresh milk to your doorstep between 5:00 AM – 7:00 AM (timing varies by distance). No middlemen.",
  },
];

const plans = [
  {
    name: "Silver",
    price: "₹1,799",
    per: "/month",
    monthly: "Doorstep delivery within 3 km radius",
    highlight: false,
    badge: "Silver",
    waText: "Hello, I am interested in the Silver subscription plan",
    features: [
      "Fresh cow milk delivered daily",
      "Doorstep delivery up to 3 km from shop",
      "Morning delivery (5:00 AM – 7:00 AM)",
      "WhatsApp support",
      "Daily freshness guarantee",
    ],
  },
  {
    name: "Gold",
    price: "₹1,999",
    per: "/month",
    monthly: "Doorstep delivery up to 6 km radius",
    highlight: true,
    badge: "Most Popular",
    waText: "Hello, I am interested in the Gold subscription plan",
    features: [
      "Fresh cow milk delivered daily",
      "Doorstep delivery up to 6 km from shop",
      "Priority morning delivery (5:00 AM – 7:00 AM)",
      "WhatsApp priority support",
      "Monthly farm updates",
    ],
  },
  {
    name: "Premium",
    price: "₹2,499",
    per: "/month",
    monthly: "Single-source pure cow milk in glass bottles",
    highlight: false,
    badge: "Premium",
    waText: "Hello, I am interested in the Premium subscription plan",
    features: [
      "Single-source pure cow milk only",
      "Delivered in glass bottles",
      "Doorstep delivery within 3 km radius",
      "Morning delivery (5:00 AM – 7:00 AM)",
      "Farm visit privilege",
      "Exclusive sourcing certificate",
    ],
  },
];

const testimonials = [
  {
    name: "Priya R.",
    location: "Gobichettipalayam",
    text: "The taste is incomparable to anything from the store. You can tell immediately this is pure, fresh milk from a real farm. My whole family switched and never looked back.",
  },
  {
    name: "Karthik S.",
    location: "Kallipatti",
    text: "My children used to refuse milk. After switching to Velora, they love it. The creaminess and freshness are something else entirely — worth every rupee.",
  },
  {
    name: "Anitha M.",
    location: "Gobichettipalayam",
    text: "The One Cow Program changed how we think about food sourcing. Knowing exactly which cow our milk comes from gives us complete peace of mind.",
  },
];

const faqs = [
  {
    q: "Do you source milk from outside farms or agents?",
    a: "No. Every single drop of milk comes from our own cows at our farm in Kallipatti, Gobichettipalayam. We have zero external suppliers — that's what Own Farm Production truly means.",
  },
  {
    q: "What time is milk delivered?",
    a: "We milk our cows at 4:30 AM and deliver between 5:00 AM – 7:00 AM the same morning. Exact timing varies based on your distance from the shop. You get milk that is literally hours old, not days.",
  },
  {
    q: "How does the One Cow Program work?",
    a: "You get a dedicated cow assigned specifically to your family. You receive approximately 1 litre of milk daily from that single cow, along with weekly health updates, your cow's name and background, and the privilege to visit the farm.",
  },
  {
    q: "Is the milk tested before delivery?",
    a: "Yes, every batch is tested for fat content and purity right after milking. We check each collection before packaging — no batch leaves our farm untested.",
  },
  {
    q: "Which areas do you currently deliver to?",
    a: "We currently deliver across Gobichettipalayam and surrounding areas including Kallipatti. Contact us via WhatsApp or the contact form to confirm your exact address.",
  },
  {
    q: "Can I visit the farm?",
    a: "Absolutely. One Cow Program subscribers receive farm visit privileges as part of their plan. Others are welcome to schedule a visit by contacting us — we love showing people where their milk comes from.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="bg-white">
      <Herosection />
      <WhyVelora />

      {/* Stats Bar */}
      <div className="bg-green-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-green-800">
            {stats.map((s) => (
              <div
                key={s.label}
                className="py-6 md:py-0 md:px-8 text-center first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
              >
                <p className="text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="text-green-300 text-sm mt-1.5 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhyVeloraFAQ />

      {/* Farm Story */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-green-700">
            Our Farm
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Pure Milk from the Heart of Gobichettipalayam
          </h2>
          <p className="mt-3 text-gray-500 leading-relaxed text-[15px]">
            Velora Milk is not a middleman. We own the farm, raise the cows,
            grow the fodder, and run every delivery ourselves. Our farm in
            Kallipatti is where every litre begins — and you can see it for
            yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px] mb-8">
              <p>
                Our cows are raised on natural grass and farm-grown fodder with
                no external feed additives. Milked once each morning at 4:30 AM,
                the milk reaches your home before most people start their day.
              </p>
              <p>
                Dairy should be honest: you should know your source, trust the
                process, and taste the difference. That's the standard we hold
                ourselves to.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-green-950 rounded-2xl p-6 text-white">
              <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-6">
                Farm Vitals
              </p>
              <div className="grid grid-cols-2 gap-4">
                {farmMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="pb-4 border-b border-white/10 last:border-b-0"
                  >
                    <p className="text-green-300 text-xs font-medium">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-white mt-2">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-400 mt-6 pt-4 border-t border-white/10 leading-relaxed">
                Kallipatti Farm, Gobichettipalayam, Tamil Nadu · Est. 2025
              </p>
            </div>
          </div>

          <div>
            <FarmMediaGallery assets={farmAssets} />
          </div>
        </div>
      </section>

      {/* Why Velora */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Why Velora Milk
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
              Not all dairy is the same. Here's what makes Velora genuinely
              different from anything else on the market.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {whyFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white p-7 hover:bg-green-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon
                    d={f.icon}
                    d2={f.icon2}
                    size="w-5 h-5"
                    color="text-green-700"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Plan Showcase */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-green-950 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 text-white">
                <span className="inline-block px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider mb-6">
                  Premium Subscription
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                  Premium Plan — Pure Cow Milk in Glass
                </h2>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-8">
                  Our highest tier. Single-source pure cow milk collected exclusively
                  from our Kallipatti farm herd, bottled in reusable glass bottles
                  and delivered to your doorstep — within a 3 km radius.
                </p>
                <ul className="space-y-3.5 mb-10">
                  {[
                    "Single-source pure cow milk — no blending, no mixing",
                    "Filled and delivered in reusable glass bottles",
                    "Doorstep delivery restricted to 3 km from shop",
                    "Morning delivery window: 5:00 AM – 7:00 AM",
                    "Open farm visit invitation — anytime",
                    "Exclusive sourcing certificate on enrollment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-slate-300 text-sm"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <Icon
                          d={P.check}
                          size="w-4 h-4"
                          color="text-amber-400"
                          weight="2.5"
                        />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-bold text-white">₹2,499</span>
                  <span className="text-slate-400 text-base">/month</span>
                </div>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%27m%20interested%20in%20the%20Premium%20subscription%20plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-400 text-amber-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
              </div>

              <div className="p-10 md:p-14 border-l border-white/5 flex flex-col justify-center">
                <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-8">
                  What You Receive
                </p>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { val: "100%", label: "Pure Cow Milk", sub: "Single source" },
                    { val: "365", label: "Days a Year", sub: "No holidays" },
                    { val: "Glass", label: "Bottles", sub: "Reusable & clean" },
                    { val: "3 km", label: "Delivery Radius", sub: "Doorstep limit" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/5 border border-white/8 rounded-2xl p-5"
                    >
                      <p className="text-3xl font-bold text-white tracking-tight">
                        {item.val}
                      </p>
                      <p className="text-sm font-semibold text-slate-300 mt-1">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-5 bg-white/5 border border-white/8 rounded-2xl">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The Premium plan is Velora's most exclusive offering — unadulterated single-source cow milk in glass bottles, with a delivery window of 5:00 AM – 7:00 AM for customers within 3 km of our shop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Transparency */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Nothing to Hide
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Our Farm Transparency
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
              We believe you have the right to know exactly how your milk is
              produced. Here's how we operate — every day, without exception.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyItems.map((item) => (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl border border-gray-100 hover:border-green-100 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon d={item.icon} size="w-5 h-5" color="text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              From Farm to Your Door
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
              Every step is designed for maximum freshness. Here's exactly what
              happens before milk reaches you.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[2.375rem] left-[10%] right-[10%] h-px bg-green-100" />
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="flex md:justify-center mb-5">
                  <div className="w-[4.75rem] h-[4.75rem] bg-green-900 text-white rounded-full flex flex-col items-center justify-center relative z-10 shadow-lg shadow-green-900/20">
                    <span className="text-xs text-green-400 font-bold tracking-widest">
                      {step.num}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-center">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed md:text-center">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans & Pricing */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Plans & Pricing
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
              Transparent pricing, no hidden fees. Pick the plan that suits your
              family.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative flex flex-col ${
                  plan.highlight
                    ? "bg-green-900 text-white shadow-2xl shadow-green-900/30 md:-mt-4"
                    : plan.badge === "Premium"
                      ? "bg-white border-2 border-amber-200 shadow-md"
                      : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-8 px-4 py-1 text-xs font-bold rounded-full ${
                      plan.badge === "Premium"
                        ? "bg-amber-400 text-amber-900"
                        : plan.badge === "Silver"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-white text-green-900 border border-gray-100 shadow-sm"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3
                    className={`text-base font-bold mb-0.5 ${plan.highlight ? "text-white" : plan.badge === "Premium" ? "text-amber-800" : "text-gray-900"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs ${plan.highlight ? "text-green-300" : "text-gray-400"}`}
                  >
                    {plan.monthly}
                  </p>
                </div>
                <div className="flex items-baseline gap-1 mb-7">
                  <span
                    className={`text-4xl font-black tracking-tight ${plan.highlight ? "text-white" : plan.badge === "Premium" ? "text-amber-700" : "text-green-900"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.highlight ? "text-green-300" : "text-gray-400"}`}
                  >
                    {plan.per}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-sm ${plan.highlight ? "text-green-100" : "text-gray-600"}`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <Icon
                          d={P.check}
                          size="w-4 h-4"
                          color={
                            plan.highlight
                              ? "text-green-300"
                              : plan.badge === "Premium"
                                ? "text-amber-500"
                                : "text-green-600"
                          }
                          weight="2.5"
                        />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(plan.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.highlight
                      ? "bg-white text-green-900 hover:bg-green-50"
                      : plan.badge === "Premium"
                        ? "bg-amber-400 text-amber-900 hover:bg-amber-300"
                        : "bg-green-900 text-white hover:bg-green-800"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-400">
            All subscription plans include daily doorstep delivery. Delivery timing: 5:00 AM – 7:00 AM (varies by distance from shop). Delivery radius applies per plan. Contact us to confirm coverage in your area.
          </p>

          {/* Daily Fresh Milk — standalone retail option */}
          <div className="mt-10 max-w-5xl">
            <div className="bg-white border border-green-100 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Icon d={P.bolt} size="w-6 h-6" color="text-green-700" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">
                    Daily Purchase · No Subscription Required
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Daily Fresh Milk — Retail Pricing
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Prefer to buy as needed? Order fresh milk daily with no commitment — pick it up from our shop or have it delivered to your door.
                  </p>
                </div>
              </div>

              {/* Two pricing columns */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Store Pickup */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon d={P.home} size="w-3.5 h-3.5" color="text-green-700" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Store / Walk-in Pickup</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-green-900">₹55</span>
                    <span className="text-sm text-gray-400">/ litre</span>
                  </div>
                  <ul className="space-y-1.5">
                    {["Collect directly at our shop", "No delivery charge", "Same-morning milk, tested daily"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <Icon d={P.check} size="w-3.5 h-3.5" color="text-green-600" weight="2.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Doorstep Delivery */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon d={P.truck} size="w-3.5 h-3.5" color="text-green-800" />
                    </div>
                    <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Doorstep Delivery</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-green-900">₹60</span>
                      <span className="text-sm text-gray-500">/ litre</span>
                    </div>
                    <p className="text-[11px] text-green-700 font-semibold mt-0.5">
                      + delivery charge per km from shop
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {["Delivered to your door (5–7 AM)", "Per-km delivery fee added at checkout", "Use our Calculator to estimate cost"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon d={P.check} size="w-3.5 h-3.5" color="text-green-600" weight="2.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20would%20like%20to%20order%20daily%20fresh%20milk%20for%20store%20pickup%20%E2%80%94%20%E2%82%B955%2Flitre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 bg-green-900 text-white text-xs font-bold rounded-xl hover:bg-green-800 transition-all"
                >
                  Order Store Pickup — ₹55/L
                </a>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20would%20like%20daily%20fresh%20milk%20delivered%20to%20my%20door%20%E2%80%94%20%E2%82%B960%2Flitre%20%2B%20delivery%20charge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 bg-white border border-green-200 text-green-900 text-xs font-bold rounded-xl hover:bg-green-50 transition-all"
                >
                  Order Doorstep Delivery — ₹60/L + km fee
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-green-400">
              Happy Families
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/8 rounded-2xl p-8 border border-white/10"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d={P.star} />
                    </svg>
                  ))}
                </div>
                <p className="text-green-100 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="border-t border-white/10 pt-5">
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-green-400 mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Questions & Answers
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full text-left py-5 flex items-center justify-between gap-6 hover:text-green-900 transition-colors group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className={`font-semibold text-sm leading-snug ${openFaq === i ? "text-green-900" : "text-gray-800"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${openFaq === i ? "bg-green-900 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-green-700"}`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={P.chevD}
                      />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-600 transition-colors"
            >
              Contact us
              <Icon d={P.arrowR} size="w-4 h-4" color="text-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-900 rounded-3xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl mx-auto">
              Taste the Difference of Own-Farm Milk
            </h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto mb-8">
              From our cows in Kallipatti to your family's table — pure, honest
              dairy with nothing to hide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-3.5 bg-white text-green-900 text-sm font-bold rounded-xl hover:bg-green-50 transition-all"
              >
                View Our Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 border border-green-700 text-white text-sm font-semibold rounded-xl hover:bg-green-800 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
