import { useState, useEffect } from "react";

const STORAGE_KEY = "veloraDeliveryConfig";

const DEFAULT_CONFIG = {
  baseRate: 2,
  longDistanceRate: 3.5,
  discountTiers: [
    { minDeliveries: 2, discount: 10 },
    { minDeliveries: 3, discount: 20 },
  ],
};

function loadConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

function calculateDelivery(distance, deliveries, config) {
  const baseDistance = Math.min(distance, 2);
  const longDistance = Math.max(0, distance - 2);
  const baseCharge = baseDistance * config.baseRate;
  const longDistanceCharge = longDistance * config.longDistanceRate;
  const subtotal = baseCharge + longDistanceCharge;
  const applicableTier = config.discountTiers
    .filter((t) => deliveries >= t.minDeliveries)
    .sort((a, b) => b.minDeliveries - a.minDeliveries)[0];
  const discountPercent = applicableTier ? applicableTier.discount : 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const totalCharge = subtotal - discountAmount;
  return { distance, deliveries, baseCharge, longDistanceCharge, subtotal, discountPercent, discountAmount, totalCharge, costPerDelivery: totalCharge / deliveries };
}

export default function Calculator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [distance, setDistance] = useState("");
  const [deliveries, setDeliveries] = useState("1");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});

  // Enquiry form — fields auto-bind from calculator state
  const [enquiry, setEnquiry] = useState({ name: "", phone: "", area: "" });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const handleEnquiryChange = (e) =>
    setEnquiry((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Velora! I'd like to enquire about a delivery route.\n\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nArea: ${enquiry.area}\nDistance: ${distance || "—"} km\nDeliveries: ${deliveries}\nEstimated Cost: ${result ? "₹" + result.totalCharge.toFixed(2) : "Not calculated yet"}`
    );
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, "_blank", "noopener");
    setEnquirySubmitted(true);
  };

  useEffect(() => { setConfig(loadConfig()); }, []);

  const validate = () => {
    const e = {};
    if (!distance || parseFloat(distance) <= 0) e.distance = "Enter a valid distance greater than 0";
    if (!deliveries || parseInt(deliveries) < 1) e.deliveries = "Minimum 1 delivery required";
    return e;
  };

  const handleCalculate = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setIsCalculating(true);
    setTimeout(() => {
      setResult(calculateDelivery(parseFloat(distance), parseInt(deliveries), config));
      setIsCalculating(false);
    }, 500);
  };

  const handleKeyDown = (ev) => { if (ev.key === "Enter") handleCalculate(); };

  const handleReset = () => { setDistance(""); setDeliveries("1"); setResult(null); setErrors({}); };

  const activeDiscount = config.discountTiers
    .filter((t) => parseInt(deliveries || "0") >= t.minDeliveries)
    .sort((a, b) => b.minDeliveries - a.minDeliveries)[0];

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-300">Route Planner</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Delivery Cost Calculator</h1>
          <p className="mt-4 text-blue-200 text-lg max-w-xl leading-relaxed">
            Instantly estimate your milk route delivery charges based on distance and number of deliveries.
          </p>
          {/* Rate badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white backdrop-blur-sm">
              <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ₹{config.baseRate}/km — first 2 km
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white backdrop-blur-sm">
              <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              ₹{config.longDistanceRate}/km — beyond 2 km
            </span>
            {config.discountTiers.map((t) => (
              <span key={t.minDeliveries} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white backdrop-blur-sm">
                <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                {t.minDeliveries}+ stops → {t.discount}% off
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Enter Route Details</h2>
                    <p className="text-xs text-gray-500">Fill in your delivery parameters</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Distance */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Delivery Distance
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => { setDistance(e.target.value); setErrors((p) => ({ ...p, distance: "" })); }}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. 5.5"
                      min="0"
                      step="0.1"
                      className={`w-full pl-10 pr-14 py-3.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${errors.distance ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-blue-200 focus:border-blue-400"}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">KM</span>
                  </div>
                  {errors.distance && <p className="mt-1.5 text-xs text-red-500">{errors.distance}</p>}
                  <p className="mt-1.5 text-xs text-gray-400">Total route distance in kilometers</p>
                </div>

                {/* Deliveries */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Deliveries on Route
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={deliveries}
                      onChange={(e) => { setDeliveries(e.target.value); setErrors((p) => ({ ...p, deliveries: "" })); }}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. 3"
                      min="1"
                      step="1"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${errors.deliveries ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:ring-blue-200 focus:border-blue-400"}`}
                    />
                  </div>
                  {errors.deliveries && <p className="mt-1.5 text-xs text-red-500">{errors.deliveries}</p>}
                  {activeDiscount && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {activeDiscount.discount}% shared route discount will be applied
                    </div>
                  )}
                  {!activeDiscount && parseInt(deliveries || "0") >= 1 && (
                    <p className="mt-1.5 text-xs text-gray-400">Add {2 - parseInt(deliveries || "0")} more stop{2 - parseInt(deliveries || "0") !== 1 ? "s" : ""} to unlock a 10% discount</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 py-3.5 bg-blue-800 text-white text-sm font-bold rounded-xl hover:bg-blue-700 active:bg-blue-900 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isCalculating ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" opacity=".3" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3" />
                        </svg>
                        Calculating…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Calculate
                      </>
                    )}
                  </button>
                  {result && (
                    <button onClick={handleReset} className="px-4 py-3.5 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Discount Info */}
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">Shared Route Discounts</p>
              <div className="space-y-2">
                {config.discountTiers.map((t) => (
                  <div key={t.minDeliveries} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t.minDeliveries}+ deliveries on same route</span>
                    <span className="font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full text-xs">{t.discount}% OFF</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            {!result ? (
              <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-24 text-center px-8">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Ready to Calculate</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Enter your delivery distance and the number of stops on the route, then hit Calculate to see the full cost breakdown.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Total Card */}
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/20">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Total Delivery Cost</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-6xl font-black tracking-tight">₹{result.totalCharge.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <svg className="w-7 h-7 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/20">
                    <div>
                      <p className="text-blue-300 text-xs">Distance</p>
                      <p className="text-white font-bold mt-0.5">{result.distance} km</p>
                    </div>
                    <div>
                      <p className="text-blue-300 text-xs">Deliveries</p>
                      <p className="text-white font-bold mt-0.5">{result.deliveries} stops</p>
                    </div>
                    <div>
                      <p className="text-blue-300 text-xs">Per Delivery</p>
                      <p className="text-white font-bold mt-0.5">₹{result.costPerDelivery.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">Cost Breakdown</h3>
                  </div>
                  <div className="p-6 space-y-3">

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Base Distance Charge</p>
                        <p className="text-xs text-gray-400 mt-0.5">First 2 km × ₹{config.baseRate}/km</p>
                      </div>
                      <span className="text-base font-bold text-gray-900">₹{result.baseCharge.toFixed(2)}</span>
                    </div>

                    {result.longDistanceCharge > 0 && (
                      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Long Distance Surcharge</p>
                          <p className="text-xs text-gray-400 mt-0.5">{(result.distance - 2).toFixed(1)} km × ₹{config.longDistanceRate}/km</p>
                        </div>
                        <span className="text-base font-bold text-orange-600">₹{result.longDistanceCharge.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-t-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">Subtotal</p>
                      <span className="text-base font-bold text-gray-900">₹{result.subtotal.toFixed(2)}</span>
                    </div>

                    {result.discountAmount > 0 && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div>
                          <p className="text-sm font-bold text-blue-800 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                            Shared Route Discount
                          </p>
                          <p className="text-xs text-blue-600 mt-0.5">{result.discountPercent}% off for {result.deliveries} deliveries</p>
                        </div>
                        <span className="text-base font-bold text-blue-700">−₹{result.discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-blue-900 rounded-xl">
                      <p className="text-sm font-bold text-white">Total Charge</p>
                      <span className="text-xl font-black text-white">₹{result.totalCharge.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Tip */}
                {result.discountPercent === 0 && (
                  <div className="flex items-start gap-3 p-4 bg-sky-50 border border-sky-100 rounded-xl text-sm text-sky-800">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Tip:</strong> Add more deliveries on the same route to unlock shared discount pricing and reduce your per-delivery cost.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Integrated Delivery Enquiry Form ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* Left — context */}
            <div className="p-10 md:p-12 text-white">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-300 mb-4">
                Request Coverage
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                Ready to start your route?
              </h2>
              <p className="text-blue-200 text-[15px] leading-relaxed mb-8">
                Fill in your details below. Your calculated route parameters will
                be sent directly to our team on WhatsApp so we can confirm
                coverage and schedule your deliveries.
              </p>

              {/* Live summary — binds to calculator state */}
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">
                  Route Summary (from calculator)
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Distance</span>
                  <span className="font-bold text-white">{distance ? `${distance} km` : "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Deliveries</span>
                  <span className="font-bold text-white">{deliveries} stop{deliveries !== "1" ? "s" : ""}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                  <span className="text-blue-300">Estimated Cost</span>
                  <span className="font-bold text-white text-base">
                    {result ? `₹${result.totalCharge.toFixed(2)}` : "Calculate first →"}
                  </span>
                </div>
                {result?.discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-300">
                    <span>Route discount applied</span>
                    <span>−₹{result.discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right — form */}
            <div className="p-10 md:p-12 bg-white/5 border-l border-white/5">
              {enquirySubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-5">
                  <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Enquiry sent!</p>
                    <p className="text-blue-300 text-sm mt-1">
                      We've opened WhatsApp with your route details. Expect a reply within the hour.
                    </p>
                  </div>
                  <button
                    onClick={() => setEnquirySubmitted(false)}
                    className="text-sm text-blue-300 hover:text-white transition-colors underline underline-offset-2"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-6">
                    Your Details
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wide">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={enquiry.name}
                      onChange={handleEnquiryChange}
                      placeholder="e.g. Ravi Kumar"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wide">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={enquiry.phone}
                      onChange={handleEnquiryChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wide">
                      Delivery Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={enquiry.area}
                      onChange={handleEnquiryChange}
                      placeholder="e.g. Gobichettipalayam, Kallipatti"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Read-only auto-populated fields from calculator */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wide">
                        Distance (km)
                      </label>
                      <input
                        readOnly
                        value={distance || ""}
                        placeholder="Auto from calculator"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-blue-300 placeholder-blue-300/30 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wide">
                        Stops
                      </label>
                      <input
                        readOnly
                        value={deliveries}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-blue-300 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-blue-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2.5 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Enquiry on WhatsApp
                  </button>
                  <p className="text-center text-xs text-blue-400">
                    Opens WhatsApp with your route details pre-filled. No account required.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
