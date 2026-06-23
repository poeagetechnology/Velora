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
    year: "2025",
    event:
      "Velora Milk founded in Kallipatti, Gobichettipalayam with a mission to deliver 100% own-farm dairy.",
  },
  {
    year: "2025",
    event:
      "Own farm operations established — our own cows, our own fodder, zero external suppliers.",
  },
  {
    year: "2025",
    event:
      "Full product range launched: fresh milk, curd, ghee, paneer, and butter from our farm.",
  },
  {
    year: "2025",
    event:
      "One Cow Program introduced — dedicated cows for individual families across Gobichettipalayam.",
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
                <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-6">
                  Kallipatti Farm Vitals
                </p>
                <div className="space-y-4">
                  {[
                    { value: "100%", label: "Own farm production" },
                    { value: "4:30 AM", label: "Daily milking time" },
                    { value: "0", label: "External suppliers" },
                    { value: "2025", label: "Year established" },
                  ].map((item) => (
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
                <p className="mt-6 pt-4 border-t border-white/10 text-xs text-green-400 leading-relaxed">
                  Gobichettipalayam, Tamil Nadu, India
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

        {/* Timeline */}
        <section className="py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-green-700">
              Milestones
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Our Journey So Far
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-green-900 text-white rounded-xl flex items-center justify-center text-sm font-bold">
                  {m.year}
                </div>
                <div className="flex-1 pt-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
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
