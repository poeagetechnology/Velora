import React from "react";
import { Link } from "react-router-dom";
import FarmMediaGallery from "./FarmMediaGallery";
import MilkImg from "../Asset/Milk.png";
import GheeImg from "../Asset/Ghee.png";
import ButterImg from "../Asset/Butter.png";
import CurdImg from "../Asset/Curd.png";

const values = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Purity First",
    desc: "We never compromise on purity. Every drop of milk is tested and verified before it leaves our facility.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    title: "Transparency",
    desc: "From the farm to your table, we maintain full transparency in our sourcing, processing, and delivery.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 002.112 2.13"
        />
      </svg>
    ),
    title: "Community Focus",
    desc: "We are from Gobichettipalayam. We actively support the local farming community through sustainable, own-farm practices.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
    title: "Freshness Guaranteed",
    desc: "We collect, process, and dispatch every morning — so your family always receives milk at peak freshness.",
  },
];

const milestones = [
  {
    year: "1960",
    label: "The Beginning",
    event:
      "Our grandfather started our dairy journey with just two cows, supporting our family through farming, transportation, and fresh milk production. This laid the foundation for the values we still follow today.",
    status: "past",
  },
  {
    year: "1980",
    label: "Growing with the Community",
    event:
      "Our herd expanded to 15 cows, and we began supplying fresh milk to the local Aavin Milk Collection Centre, earning the trust of the community through consistent quality.",
    status: "past",
  },
  {
    year: "2020",
    label: "Modernizing Our Farm",
    event:
      "The next generation took responsibility for the farm, introducing modern dairy equipment, improved cattle care, better feeding practices, and hygienic milk handling to prepare for the future.",
    status: "past",
  },
  {
    year: "2025",
    label: "Velora Milk is Born",
    event:
      "We launched Velora Milk, bringing farm-fresh milk directly to families in Kallipatti with complete transparency, freshness, and our own dairy management.",
    status: "past",
  },
  {
    year: "June 2026",
    label: "Expanding to Gobichettipalayam",
    event:
      "Opened our first Velora retail store, introduced monthly subscription plans, launched doorstep delivery, and introduced the One Cow Program for premium customers.",
    status: "current",
  },
];

const visionMilestones = [
  {
    year: "Sep 2026",
    label: "Expanding to Erode",
    event:
      "Expansion into Erode, introducing a wider range of farm-fresh products including vegetables, fruits, curd, paneer, ghee, and butter through a direct farm-to-customer model.",
  },
  {
    year: "The Future",
    label: "Velora Across Tamil Nadu",
    event:
      "Expand Velora across Tamil Nadu through a carefully selected franchise network, ensuring every city receives the same farm-fresh quality, transparency, and customer experience.",
  },
];

// Multimedia assets for farm story gallery
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

export default function About() {
  return (
    <main className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <span className="text-xs font-bold tracking-widest uppercase text-green-300">
            Our Story
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Our Own Farm. Our Own Cows. Our Promise.
          </h1>
          <p className="mt-4 text-green-200 text-lg max-w-2xl leading-relaxed">
            Born in Kallipatti, Gobichettipalayam — Velora Milk is our mission
            to bring honest, own-farm dairy to every home. No middlemen. Just
            pure milk from our cows to you.
          </p>

          {/* Hook lines */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
              <span className="flex-shrink-0 w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center text-[10px] font-black text-white">
                '60
              </span>
              <p className="text-sm text-white font-medium">
                <span className="font-bold text-green-200">1960</span> — Our family's dairy journey began.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center text-[10px] font-black text-amber-900">
                '25
              </span>
              <p className="text-sm text-white font-medium">
                <span className="font-bold text-amber-300">2025</span> — The Velora Milk brand was launched.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Story */}
        <section className="py-16 md:py-20">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Our Farm Story
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Rooted in Gobichettipalayam
            </h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-12">
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Velora Milk was founded in 2025 with a straightforward belief:
                  families deserve dairy that is genuinely fresh, pure, and
                  traceable. We are not a middleman — we own the farm, raise the
                  cows, grow the fodder, and deliver directly to your door.
                </p>
                <p>
                  Our farm in Kallipatti, Gobichettipalayam is where every litre
                  of milk begins. Our cows are milked at 4:30 AM, and milk
                  reaches your doorstep before most people wake up. From our
                  farm gate to your door in under 3 hours.
                </p>
                <p>
                  We're not just a dairy brand — we're a community-driven
                  initiative rooted in Gobichettipalayam, delivering quality you
                  can see, smell, taste, and trace back to its exact source.
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-green-950 rounded-2xl p-6 text-white">
                <p className="text-xs font-bold tracking-widest uppercase text-green-200 mb-6">
                  Kallipatti Farm Vitals
                </p>
                <div className="space-y-4">
                  {[
                    { value: "100%", label: "Own farm production" },
                    { value: "4:30 AM", label: "Daily milking time" },
                    { value: "0", label: "External suppliers" },
                    { value: "1960", label: "Farming since" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="pb-4 border-b border-white/10 last:border-b-0"
                    >
                      <p className="text-green-200 text-xs font-semibold">
                        {item.label}
                      </p>
                      <p className="text-2xl font-bold text-white mt-2">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 pt-4 border-t border-white/10 text-xs text-green-200 leading-relaxed">
                  Sampath Thottam, Sathy Main Road, Kallipatti, Gobichettipalayam – 638505
                </p>
              </div>
            </div>
          </div>

          {/* Multimedia Gallery */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              See Our Farm in Action
            </h3>
            <FarmMediaGallery assets={farmAssets} />
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              What Guides Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 border-t border-gray-100">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Our Story
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Our Journey
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Six decades of dedication — from two cows in a small farm to Gobichettipalayam's own milk brand.
            </p>
          </div>

          <div className="relative max-w-3xl">
            {/* Vertical connector line */}
            <div className="absolute left-[2.375rem] top-8 bottom-8 w-px bg-green-100 hidden sm:block" />

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                  {/* Year badge */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-0 z-10">
                    <div
                      className={`w-[4.75rem] h-[4.75rem] rounded-2xl flex flex-col items-center justify-center text-center shadow-md ${
                        m.status === "current"
                          ? "bg-green-900 text-white shadow-green-900/30"
                          : "bg-white border-2 border-green-200 text-green-900"
                      }`}
                    >
                      <span className={`text-[10px] font-bold leading-none ${m.status === "current" ? "text-green-300" : "text-green-600"}`}>
                        {m.year.length > 4 ? m.year.split(" ")[0] : ""}
                      </span>
                      <span className="text-sm font-black leading-tight">
                        {m.year.length > 4 ? m.year.split(" ")[1] : m.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-2xl p-6 border transition-all ${
                      m.status === "current"
                        ? "bg-green-900 border-green-800 shadow-xl shadow-green-900/15"
                        : "bg-white border-gray-100 shadow-sm hover:border-green-100 hover:shadow-md"
                    }`}
                  >
                    {m.status === "current" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-700 text-green-100 text-[10px] font-bold rounded-full uppercase tracking-wider mb-3">
                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                        Now
                      </span>
                    )}
                    <h3
                      className={`font-bold text-base mb-2 ${
                        m.status === "current" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {m.label}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        m.status === "current" ? "text-green-100" : "text-gray-500"
                      }`}
                    >
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-600">
              What's Next
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Our Vision
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Where we're headed — bigger reach, same farm-fresh promise.
            </p>
          </div>

          <div className="relative max-w-3xl">
            {/* Dashed connector line for future */}
            <div className="absolute left-[2.375rem] top-8 bottom-8 w-px border-l-2 border-dashed border-amber-200 hidden sm:block" />

            <div className="space-y-0">
              {visionMilestones.map((m, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                  {/* Badge */}
                  <div className="flex-shrink-0 z-10">
                    <div className="w-[4.75rem] h-[4.75rem] rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-amber-600 leading-none">
                        {m.year.includes(" ") ? m.year.split(" ")[0] : ""}
                      </span>
                      <span className="text-xs font-black text-amber-800 leading-tight text-center px-1">
                        {m.year.includes(" ") ? m.year.split(" ").slice(1).join(" ") : m.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 hover:border-amber-200 hover:shadow-sm transition-all">
                    <span className="inline-block px-2.5 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-bold rounded-full uppercase tracking-wider mb-3">
                      Upcoming
                    </span>
                    <h3 className="font-bold text-base text-gray-900 mb-2">{m.label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 mb-4">
          <div className="bg-green-900 rounded-3xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto">
              "Pure dairy, honest process, and community first."
            </h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto mb-8">
              That's the promise we make to every farm we work with and every
              family we serve.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-white text-green-900 text-sm font-bold rounded-xl hover:bg-green-50 transition-all"
            >
              Connect With Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
