/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Palette, 
  Compass, 
  Layout, 
  Sparkles, 
  BookOpen, 
  Award, 
  MousePointerClick, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ColorGuide from './components/ColorGuide';
import NavigationGuide from './components/NavigationGuide';
import LandingPageStructure from './components/LandingPageStructure';
import LiveWebsiteDemo from './components/LiveWebsiteDemo';

export default function App() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'live-demo' | 'color' | 'nav' | 'structure'>('welcome');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('classic-scholar');

  // Quick stats computed for the redesign overview card
  const summaryOutcomes = [
    { title: 'Bento Grid News', desc: 'Sistem peletakan asimetris yang membagi fokus berita utama (seperti visi misi) secara kokoh dan kontemporer.' },
    { title: 'Interactive Resource Tabs', desc: 'Menghilangkan kekakuan grid horizontal lama yang melelahkan diganti dengan drawer penjelajahan responsif.' },
    { title: 'Heritage Branding', desc: 'Mempertahankan keterkaitan emosional warna marigold tradisi Cirebon dengan sentuhan Biru Slate Akademik.' },
    { title: 'Fluid Navigation Hub', desc: 'Backdrop glassmorphic navigation bar yang mengambang anggun, memudahkan pencarian PPDB seketika.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans" id="portal-redesign-root">
      
      {/* PROFESSIONAL POLISH BRAND BAR */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 md:px-8 flex justify-between items-center text-xs border-b border-slate-800" id="workspace-top-bar">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
            WORKSPACE REDESAIN SMAN 1 LOSARI • KABUPATEN CIREBON
          </span>
          <div className="hidden md:flex gap-4 font-semibold text-slate-400">
            <span>Kurikulum Merdeka</span>
            <span>•</span>
            <span>Transformasi Digital Pendidikan</span>
          </div>
        </div>
      </div>

      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-200/20 via-slate-50/30 to-transparent pointer-events-none -z-10" />

      {/* CORE WORKSPACE CONTROL HEADER */}
      <header className="border-b border-slate-200 bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Sub styling aligned to design school structure */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-lg font-black shrink-0 relative hover:rotate-6 transition-transform">
                <div className="w-6 h-6 border border-amber-400 rotate-45 flex items-center justify-center">
                  <span className="text-[9px] -rotate-45 font-semibold text-white">S1L</span>
                </div>
              </span>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                  PROYEK MEROMBAK PORTAL KAMPUS SMAN 1 LOSARI
                </h1>
                <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">
                  Cerdas • Beradab • Inovatif
                </p>
              </div>
            </div>
          </div>

          {/* Quick theme status tracker */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-slate-650">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span>Skema Aktif: <strong className="font-extrabold text-slate-900 capitalize">{selectedThemeId.replace('-', ' ')}</strong></span>
          </div>
        </div>

        {/* TOP WORKSPACE TAB MENU SELECTOR */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex border-t border-slate-100/80 pt-1 gap-1">
            {[
              { id: 'welcome', label: '👋 Ringkasan Strategis', icon: Sparkles },
              { id: 'live-demo', label: '🖥️ Live Demo Website (Redesigned)', icon: Layout },
              { id: 'color', label: '🎨 Panduan Warna Baru', icon: Palette },
              { id: 'nav', label: '🧭 Rancangan Navigasi', icon: Compass },
              { id: 'structure', label: '📐 Aturan & Struktur Section', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider ${
                    isActive 
                      ? 'border-amber-500 text-slate-900 font-black' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE CONTENT AREA WITH ANIMATE TRANSITIONS */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'welcome' && (
            <motion.div
              key="welcome-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Grand Introduction Card */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
                
                <div className="max-w-3xl space-y-4">
                  <span className="text-[10px] font-extrabold tracking-widest px-3 py-1 bg-white/10 rounded-full inline-block">
                    KONSEPTUAL DESAIN DIGITAL
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    Mata Rantai Merombak Website SMAN 1 Losari Kabupaten Cirebon
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Berdasarkan analisis tangkapan layar website sekolah Anda yang lama, kami merancang reformasi tampilan digital yang mendasar. Kami mengeliminasi kekakuan tata letak baris lama, menyederhanakan kontras warna yang menyilaukan mata, dan menyusun bento grid interaktif yang seimbang.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveTab('live-demo')}
                      className="bg-amber-500 hover:bg-amber-650 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      Buka Live Redesign Demo <MousePointerClick className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('color')}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all border border-white/10 cursor-pointer"
                    >
                      Lihat Panduan Warna Baru
                    </button>
                  </div>
                </div>
              </div>

              {/* Core Deliverable Grid summary card columns */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">4 Pilar Utama Redesain Kami</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {summaryOutcomes.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-205 rounded-2xl p-6 shadow-3xs hover:shadow-2xs transition-shadow space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h4 className="font-black text-slate-900 text-sm">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed pl-8">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide how to use the playground */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" /> Playground Redesain Bersifat Interaktif!
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Anda dapat beralih ke tab <strong>"Panduan Warna Baru"</strong> untuk menguji rasio kontras warna akademis yang modern, dan memilih salah satu tema yang diusulkan. Pilihan warna Anda akan langsung diterapkan pada tab <strong>"Live Demo Website"</strong> di atas.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('color')}
                  className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 cursor-pointer hover:bg-blue-700 transition-all"
                >
                  Atur Tema Eksplorasi
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'live-demo' && (
            <motion.div
              key="live-demo-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Floating warning of active theme color */}
              <div className="bg-slate-900 text-white rounded-xl p-3.5 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">💡 Tip Interaktif:</span>
                  <span>Skema warna demo di bawah disetel mengikuti tema: <strong className="text-amber-500 capitalize">"{selectedThemeId.replace('-', ' ')}"</strong></span>
                </div>
                <button 
                  onClick={() => setActiveTab('color')}
                  className="underline font-bold text-amber-500 hover:text-white transition-colors cursor-pointer"
                >
                  Ubah tema warna
                </button>
              </div>

              {/* Renders the full modern home page design */}
              <LiveWebsiteDemo themeId={selectedThemeId} />
            </motion.div>
          )}

          {activeTab === 'color' && (
            <motion.div
              key="color-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Renders color critique, recommended palettes switcher */}
              <ColorGuide 
                currentThemeId={selectedThemeId}
                onThemeSelect={(id) => setSelectedThemeId(id)}
              />
            </motion.div>
          )}

          {activeTab === 'nav' && (
            <motion.div
              key="nav-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Renders responsive floating desktop megamenu layout blueprints */}
              <NavigationGuide />
            </motion.div>
          )}

          {activeTab === 'structure' && (
            <motion.div
              key="structure-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Renders section content wireframe mapping and component required checklists */}
              <LandingPageStructure />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16 py-8 text-center text-xs text-slate-500">
        <p>Proyek Redesain Portal SMA Negeri 1 Losari Kabupaten Cirebon • Dikembangkan untuk Kualitas Pendidikan Indonesia.</p>
        <p className="mt-1 text-slate-400">Copyright © 2026. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
