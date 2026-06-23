import React, { useState } from "react";

const contactInfo = [
  {
    icon: <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
    label: "Location", value: "Kallipatti, Gobichettipalayam, Tamil Nadu",
  },
  {
    icon: <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
    label: "Phone", value: "+91 98765 43210",
  },
  {
    icon: <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
    label: "Email", value: "hello@veloramilk.com",
  },
  {
    icon: <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    label: "Delivery Hours", value: "5:00 AM – 7:00 AM (varies by distance)",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <main className="bg-white min-h-screen">

      <div className="bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <span className="text-xs font-bold tracking-widest uppercase text-green-300">Reach Out</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">We'd Love to Hear From You</h1>
          <p className="mt-4 text-green-200 text-lg max-w-xl leading-relaxed">
            Have a question about our products, delivery, or want to learn more?
            Drop us a message — our team is always happy to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">

          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you're curious about our dairy products, want to know about our farms, or have a general inquiry — we're here.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{c.label}</p>
                    <p className="text-gray-800 font-medium mt-0.5">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-sm text-green-800 font-semibold mb-1">Based in Gobichettipalayam</p>
              <p className="text-sm text-green-700 leading-relaxed">
                We are a local dairy brand serving families across Gobichettipalayam and surrounding areas.
                Reach out to learn about availability in your area.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-16 px-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Received!</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 px-6 py-2.5 text-sm font-semibold text-green-800 border border-green-300 rounded-lg hover:bg-green-50 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-100 p-8 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Send Us a Message</h3>
                  <p className="text-sm text-gray-400">We typically respond within 24 hours.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Your Name <span className="text-red-400">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ravi Kumar" required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
                    <option value="">Select a topic…</option>
                    <option>Product Enquiry</option>
                    <option>Delivery Information</option>
                    <option>Farm Partnership</option>
                    <option>General Question</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message <span className="text-red-400">*</span></label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us how we can help…" required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-green-800 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/20">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
