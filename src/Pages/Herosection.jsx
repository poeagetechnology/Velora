import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../Asset/Logo.png";

const trustBadges = [
  "100% Own Farm",
  "Milked at 4:30 AM",
  "Delivered by 6 AM",
  "Zero Additives",
  "Gobichettipalayam",
];

export default function Herosection() {
  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-green-900 text-white text-center py-2.5 px-4">
        <p className="text-sm font-medium">
          <span className="text-green-300 font-semibold">
            நம்ம ஊர் பசும்பால், நம்ம வீட்டு ஆரோக்கியம்.
          </span>
          <span className="mx-3 text-green-600">·</span>
          <span className="text-white font-semibold">
            Opening Soon in Gobichettipalayam
          </span>
        </p>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] bg-green-50 rounded-full opacity-50" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-green-50 rounded-full opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 border border-green-100 rounded-full text-xs font-semibold text-green-700 mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Own Farm · Kallipatti, Gobichettipalayam
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">
              From Our Farm
              <br />
              <span className="text-green-800">to Your Family.</span>
            </h1>

            <p className="mt-6 text-gray-500 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
              Pure, farm-fresh dairy from our own cows in Gobichettipalayam —
              milked at 4:30 AM and at your doorstep between 5:00 AM – 7:00 AM.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/products"
                className="px-7 py-3.5 bg-green-800 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
              >
                Explore Products
              </Link>
              <Link
                to="/about"
                className="px-7 py-3.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Our Farm Story
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600"
                >
                  <svg
                    className="w-3 h-3 text-green-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Background circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 bg-green-50 rounded-full" />
              </div>

              <img
                src={HeroImg}
                alt="Velora Milk — Farm Fresh Dairy"
                className="relative w-full max-w-sm md:max-w-lg object-contain drop-shadow-2xl"
              />

              {/* Float card — Milked Today */}
              <div className="absolute top-8 -left-6 md:-left-12 hidden sm:flex bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 items-center gap-3 min-w-max">
                <div className="w-9 h-9 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">
                    Milked Today
                  </p>
                  <p className="text-sm font-bold text-gray-900">4:30 AM</p>
                </div>
              </div>

              {/* Float card — Delivery */}
              <div className="absolute bottom-8 -right-6 md:-right-10 hidden sm:flex bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 items-center gap-3 min-w-max">
                <div className="w-9 h-9 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">
                    Delivery Window
                  </p>
                  <p className="text-sm font-bold text-gray-900">5–7 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
