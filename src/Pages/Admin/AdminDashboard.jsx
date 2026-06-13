import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../Asset/Logo.png";
import { AdminSettings } from "../../calculator/components/AdminSettings";

const SESSION_KEY = "veloraAdminSession";
const ADMIN_KEY = "veloraAdminCredentials";
const CONFIG_KEY = "veloraDeliveryConfig";

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
    const stored = localStorage.getItem(CONFIG_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
  } catch { return DEFAULT_CONFIG; }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminUser, setAdminUser] = useState("Admin");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) { navigate("/admin"); return; }
    setConfig(loadConfig());
    try {
      const creds = JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}");
      if (creds.username) setAdminUser(creds.username);
    } catch {}
  }, [navigate]);

  const handleSave = (newConfig) => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
    setConfig(newConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Admin Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={Logo} alt="Velora Milk" className="w-8 h-8 object-contain" />
              <span className="font-bold text-white hidden sm:block">Velora Milk</span>
            </Link>
            <span className="text-blue-400 text-sm hidden sm:block">·</span>
            <div className="flex items-center gap-1.5 bg-blue-800 px-3 py-1 rounded-lg">
              <svg className="w-3.5 h-3.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-xs font-semibold text-blue-200">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-800 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white uppercase">{adminUser[0]}</span>
              </div>
              <span className="text-sm text-blue-200 font-medium">{adminUser}</span>
            </div>
            <Link to="/calculator" className="px-3 py-1.5 border border-blue-700 text-blue-200 text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors">
              View Calculator
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your delivery pricing configuration</p>
        </div>

        {/* Save success toast */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 font-semibold">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Configuration saved! The calculator will use the updated pricing.
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Base Rate</p>
            <p className="text-3xl font-black text-blue-900">₹{config.baseRate}<span className="text-sm font-semibold text-gray-400">/km</span></p>
            <p className="text-xs text-gray-400 mt-1">Applied for first 2 km</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Long Distance Rate</p>
            <p className="text-3xl font-black text-blue-900">₹{config.longDistanceRate}<span className="text-sm font-semibold text-gray-400">/km</span></p>
            <p className="text-xs text-gray-400 mt-1">Applied beyond 2 km</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Discount Tiers</p>
            <p className="text-3xl font-black text-blue-900">{config.discountTiers.length}<span className="text-sm font-semibold text-gray-400"> tiers</span></p>
            <p className="text-xs text-gray-400 mt-1">
              {config.discountTiers.length > 0
                ? `Up to ${Math.max(...config.discountTiers.map((t) => t.discount))}% discount`
                : "No discounts configured"}
            </p>
          </div>
        </div>

        {/* AdminSettings Component */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Pricing Configuration</h2>
              <p className="text-xs text-gray-500 mt-0.5">Changes are applied immediately to the public calculator</p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-semibold text-blue-700">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Protected
            </span>
          </div>
          <div className="p-6">
            <AdminSettings config={config} onSave={handleSave} />
          </div>
        </div>

      </div>
    </div>
  );
}
