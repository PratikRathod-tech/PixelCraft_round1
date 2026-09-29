import React from 'react';
import { CONTACT_INFO } from '../data/contact';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const contact = CONTACT_INFO;

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Official Information Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            {contact.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Coordinator Details */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
              Organizing Council & Helpdesks
            </h3>

            <div className="space-y-4">
              {contact.coordinators.map((c, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 shadow-sm space-y-2.5"
                >
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {c.role}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {c.namePlaceholder}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.contactPlaceholder}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.emailPlaceholder}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Venue Card */}
            <div className="p-5 rounded-2xl border bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Event Venue & Format
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {contact.venue.locationPlaceholder} • {contact.venue.cityPlaceholder}
              </p>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 block">
                Format: {contact.venue.mode}
              </span>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-6 p-8 rounded-3xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xl space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
                Send an Inquiry to the Council
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Responses will be routed to the respective technical or administrative lead.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted! Organizing council desk has received your ticket."); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@team.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-500 block mb-1">Inquiry Department</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500">
                  {contact.inquiryTypes.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-500 block mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your question or feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry Ticket</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
