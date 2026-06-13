import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../Asset/Logo.png";

const ADMIN_KEY = "veloraAdminCredentials";
const SESSION_KEY = "veloraAdminSession";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) { navigate("/admin/dashboard"); return; }
    setAdminExists(!!localStorage.getItem(ADMIN_KEY));
  }, [navigate]);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const stored = localStorage.getItem(ADMIN_KEY);
    if (!stored) { setError("No admin account found. Please sign up first."); setTab("signup"); return; }
    const creds = JSON.parse(stored);
    if (form.username === creds.username && form.password === creds.password) {
      sessionStorage.setItem(SESSION_KEY, "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!form.username.trim() || form.username.length < 3) { setError("Username must be at least 3 characters."); return; }
    if (!form.password || form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (localStorage.getItem(ADMIN_KEY)) { setError("An admin account already exists. Please log in."); setTab("login"); return; }
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ username: form.username.trim(), password: form.password }));
    setAdminExists(true);
    setSuccess("Admin account created! You can now log in.");
    setForm({ username: form.username, password: "", confirmPassword: "" });
    setTab("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4 py-12">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-950/50 overflow-hidden">

          {/* Top bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 pt-8 pb-6">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <img src={Logo} alt="Velora Milk" className="w-10 h-10 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-white">Velora</span>
                <span className="text-[10px] text-blue-300 font-medium tracking-widest uppercase">Milk</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-blue-300 text-sm mt-1">Manage pricing and delivery settings</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${
                  tab === t ? "text-blue-800 border-b-2 border-blue-800 bg-blue-50/50" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="px-8 py-8">
            {success && (
              <div className="flex items-center gap-2 p-3.5 bg-blue-50 border border-blue-100 rounded-xl mb-5 text-sm text-blue-800">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-100 rounded-xl mb-5 text-sm text-red-700">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Username</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="admin" required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        {showPassword
                          ? <><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></>
                          : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-blue-800 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                  Sign In to Admin Panel
                </button>
                {!adminExists && (
                  <p className="text-center text-xs text-gray-400">
                    No account yet?{" "}
                    <button type="button" onClick={() => setTab("signup")} className="text-blue-700 font-semibold hover:underline">
                      Create one
                    </button>
                  </p>
                )}
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                {adminExists && (
                  <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700">
                    An admin account already exists. Only one admin account is allowed per installation.
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Choose Username</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="e.g. velora_admin" required disabled={adminExists}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required disabled={adminExists}
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50" />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" required disabled={adminExists}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50" />
                  </div>
                </div>
                <button type="submit" disabled={adminExists} className="w-full py-3.5 bg-blue-800 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  Create Admin Account
                </button>
                <p className="text-center text-xs text-gray-400">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setTab("login")} className="text-blue-700 font-semibold hover:underline">Sign in</button>
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-200 text-sm hover:text-white transition-colors">← Back to Velora Milk</Link>
        </div>
      </div>
    </div>
  );
}
