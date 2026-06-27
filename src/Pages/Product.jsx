import React, { useState } from "react";
import { Link } from "react-router-dom";
import Milk from "../Asset/Milk.png";
import Curd from "../Asset/Curd.png";
import Ghee from "../Asset/Ghee.png";
import Paneer from "../Asset/Paneer.png";
import Butter from "../Asset/Butter.png";

const products = [
  {
    name: "Fresh Milk",
    qty: "1 Litre",
    price: "₹55",
    deliveryPrice: "₹60",
    category: "Milk",
    img: Milk,
    tag: "Bestseller",
    tagColor: "bg-green-100 text-green-800",
    desc: "Pure whole milk collected fresh every morning from our Kallipatti farm. Rich in calcium, protein, and essential vitamins — zero additives.",
    highlights: ["No additives", "Collected daily", "Rich in calcium"],
  },
  {
    name: "Natural Curd",
    qty: "500 ml",
    price: "₹40",
    category: "Curd",
    img: Curd,
    tag: "Rich in Probiotics",
    tagColor: "bg-green-100 text-green-800",
    desc: "Thick, creamy curd set naturally overnight using our fresh whole milk. Packed with probiotics that support healthy digestion.",
    highlights: ["Probiotic-rich", "Naturally set", "Gut-friendly"],
  },
  {
    name: "Pure Ghee",
    qty: "250 ml",
    price: "₹600",
    category: "Ghee",
    img: Ghee,
    tag: "Traditionally Made",
    tagColor: "bg-amber-100 text-amber-800",
    desc: "Hand-churned from the finest cream, our ghee is golden, aromatic, and traditionally crafted using time-honored methods.",
    highlights: ["Hand-churned", "Golden aroma", "Traditional recipe"],
  },
  {
    name: "Fresh Paneer",
    qty: "200 g",
    price: "₹80",
    category: "Paneer",
    img: Paneer,
    tag: "High Protein",
    tagColor: "bg-indigo-100 text-indigo-800",
    desc: "Soft, fresh paneer made daily from pure milk. High in protein and calcium — perfect for nutritious family meals.",
    highlights: ["Made daily", "High protein", "Soft texture"],
  },
  {
    name: "Creamy Butter",
    qty: "500 ml",
    price: "₹200",
    category: "Butter",
    img: Butter,
    tag: "Farm Fresh",
    tagColor: "bg-orange-100 text-orange-800",
    desc: "Smooth, rich butter churned from fresh cream. Pure, natural flavor with no artificial colors or flavors.",
    highlights: ["Churned fresh", "No artificial color", "Smooth & rich"],
  },
];

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function Product() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main className="bg-white min-h-screen">

      {/* Page Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <span className="text-xs font-bold tracking-widest uppercase text-green-300">Our Range</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Pure Dairy Products</h1>
          <p className="mt-4 text-green-200 text-lg max-w-2xl leading-relaxed">
            Every product comes from our own farm in Kallipatti, Gobichettipalayam —
            minimal processing, no middlemen, and freshness you can taste.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-green-800 text-white shadow-md shadow-green-900/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">

              {/* Fixed-ratio image well — prevents crop & overflow for any image shape */}
              <div className="relative bg-gradient-to-br from-slate-50 to-green-50 aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{item.qty}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mt-2 mb-3">{item.desc}</p>

                {/* Price */}
                {item.deliveryPrice ? (
                  <div className="mb-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-800">{item.price}</span>
                      <span className="text-xs text-gray-400">store pickup / {item.qty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-green-600">{item.deliveryPrice}</span>
                      <span className="text-xs text-gray-400">doorstep / {item.qty}</span>
                      <span className="text-[10px] font-semibold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">+ km fee</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-800">{item.price}</span>
                    <span className="text-xs text-gray-400">per {item.qty}</span>
                  </div>
                )}

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enquiry Banner */}
        <div className="mt-16 bg-green-50 border border-green-100 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to know more about our products?</h3>
          <p className="text-gray-500 max-w-xl mx-auto mb-6">
            Have a question about ingredients, availability, or delivery? Our team is happy to help.
          </p>
          <Link to="/contact" className="inline-block px-8 py-3.5 bg-green-800 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/20">
            Get in Touch
          </Link>
        </div>

      </div>
    </main>
  );
}
