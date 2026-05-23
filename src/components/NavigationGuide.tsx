/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  ChevronDown, 
  Clock, 
  Mail, 
  Phone, 
  CornerDownRight, 
  ExternalLink,
  Laptop,
  Check,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NavigationGuide() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [searchMock, setSearchMock] = useState('');
  const [activeTab, setActiveTab] = useState<'wireframe' | 'philosophy'>('wireframe');

  // Menus matching SMAN 1 Losari's structure but highly modernized
  const menuLinks = [
    {
      label: 'Beranda',
      id: 'beranda',
      hasDropdown: false,
    },
    {
      label: 'Profil Sekolah',
      id: 'profil',
      hasDropdown: true,
      items: [
        { label: 'Visi & Misi', desc: 'Rancangan cita-cita mendasar SMAN 1 Losari.' },
        { label: 'Sejarah Singkat', desc: 'Latar sejarah berdirinya sekolah di Kabupaten Cirebon.' },
        { label: 'Struktur Organisasi', desc: 'Bagan kepemimpinan, komite, dan tata usaha.' },
        { label: 'Daftar Guru & Staf', desc: 'Direktori lengkap pendidik berprestasi.' }
      ]
    },
    {
      label: 'Akademik & Layanan',
      id: 'layanan',
      hasDropdown: true,
      items: [
        { label: 'PPDB Online 2026', desc: 'Sistem pendaftaran peserta didik baru.' },
        { label: 'Perpustakaan E-Library', desc: 'Kumpulan katalog buku pembelajaran digital.' },
        { label: 'Layanan Konseling (BK)', desc: 'Konsultasi bimbingan perkembangan psikologis siswa.' },
        { label: 'Agenda Akademik', desc: 'Kalender acara sekolah sepanjang semester.' }
      ]
    },
    {
      label: 'Prestasi & Eskul',
      id: 'prestasi',
      hasDropdown: true,
      items: [
        { label: 'Galeri Prestasi', desc: 'Piala dan piagam penghargaan karya siswa.' },
        { label: 'Ekstrakurikuler', desc: 'Berbagai klub bakat, seni teater, basket, pramuka.' },
        { label: 'Dokumentasi Kegiatan', desc: 'Kumpulan momen-momen emas siswa.' }
      ]
    },
    {
      label: 'Kontak',
      id: 'kontak',
      hasDropdown: false,
    }
  ];

  return (
    <div className="space-y-8" id="navigation-guide-container">
      {/* Intro & Toggle */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">NAVIGASI MODERN</span>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Struktur Header & Desktop Menu modern</h2>
          <p className="text-slate-500 text-sm max-w-2xl">
            Menghilangkan beban visual bertumpuk dari navigasi lama dengan menerapkan konsep **Backdrop Glassmorphic Navigation Hub** terintegrasi.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl self-start">
          <button 
            onClick={() => setActiveTab('wireframe')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'wireframe' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Simulator Interaktif
          </button>
          <button 
            onClick={() => setActiveTab('philosophy')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'philosophy' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Filosofi Layout
          </button>
        </div>
      </div>

      {activeTab === 'wireframe' ? (
        <div className="space-y-6">
          {/* Header Bar Emulator Label */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5" /> EMULATOR NAVIGASI DESKTOP (Arahkan kursor Anda untuk melihat megamenu)</span>
            <span className="text-emerald-500 font-medium flex items-center gap-1">🟢 Responsif & Mengambang</span>
          </div>

          {/* SIMULATED MENU BAR CONTAINER */}
          <div className="border border-slate-200/55 rounded-2xl bg-slate-950/5 p-4 md:p-10 relative overflow-visible">
            
            {/* Real mockup layout header */}
            <header className="w-full bg-white rounded-xl shadow-lg border border-slate-100 divide-y divide-slate-100 overflow-visible relative">
              
              {/* TOP STRIP BAR (Clean, Non-Intrusive) */}
              <div className="px-6 py-2.5 flex justify-between items-center text-xs text-slate-500 bg-slate-50 rounded-t-xl">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[11px]"><Phone className="w-3.5 h-3.5 text-blue-600" /> 0231-831999</span>
                  <span className="hidden md:flex items-center gap-1 text-[11px]"><Mail className="w-3.5 h-3.5 text-blue-600" /> smansalos2023@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[11px] font-medium"><Clock className="w-3.5 h-3.5 text-amber-500" /> Waktu Lokal: 17:28 WIB</span>
                  <span className="hidden bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-full font-bold text-[10px]">PPDB 2026/2027</span>
                </div>
              </div>

              {/* MAIN NAVIGATION BAR */}
              <div className="px-6 py-4 flex items-center justify-between relative overflow-visible">
                {/* School Brand Logo Layout (Aligned) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-amber-400 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                    S1L
                  </div>
                  <div>
                    <h1 className="font-extrabold text-slate-900 tracking-tight leading-none text-base">SMAN 1 LOSARI</h1>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-0.5">Kab. Cirebon • Pasti Bisa!</span>
                  </div>
                </div>

                {/* Desktop Center Links */}
                <nav className="hidden lg:flex items-center gap-1 relative z-50">
                  {menuLinks.map((link) => (
                    <div 
                      key={link.id}
                      className="relative px-3 py-2 cursor-pointer"
                      onMouseEnter={() => setHoveredMenu(link.id)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <button className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                        {link.label}
                        {link.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />}
                      </button>

                      {/* Dropdown Container (Megamenu Style) */}
                      <AnimatePresence>
                        {link.hasDropdown && hoveredMenu === link.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100/80 p-4 space-y-3 z-50"
                          >
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Sub Menu: {link.label}</div>
                            <div className="grid grid-cols-1 gap-1">
                              {link.items?.map((item, idx) => (
                                <a 
                                  key={idx}
                                  href="#"
                                  className="group flex flex-col p-2 hover:bg-slate-50/80 rounded-lg transition-colors"
                                >
                                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 flex items-center gap-1">
                                    <CornerDownRight className="w-3.5 h-3.5 text-slate-300" /> {item.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 ml-4 group-hover:text-slate-500">{item.desc}</span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                {/* Desktop Action Center (Search Omnibar & Admission Button) */}
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <input 
                      type="text" 
                      placeholder="Cari berita & info..."
                      value={searchMock}
                      onChange={(e) => setSearchMock(e.target.value)}
                      className="bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3.5 py-1.5 pl-9 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none w-48 transition-all"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-xs hover:shadow-xs transition-all pointer-events-none">
                    PPDB 2026/2027
                  </button>
                </div>
              </div>
            </header>

            {/* Simulated Canvas underlay */}
            <div className="mt-4 p-8 bg-white/40 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs">
              Scroll-port Canvas
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" /> Mengapa Desain Runtuh Merugikan Brand?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pada menu navigasi lama yang kaku, informasi ditumpuk dalam 2 tumpukan bar tebal berwarna solid, dilengkapi logo dengan tulisan kecil, serta kolom pencarian terputus. Ini menghasilkan efek sesak pada layar lebar dan menyulitkan navigasi pengguna baru.
            </p>
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-semibold text-xs text-slate-700">Penyebab Kekecewaan Pengguna (UI Bottlenecks):</h4>
              <ul className="text-xs text-slate-600 space-y-2 list-none">
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✕</span> Menu yang tidak menonjolkan prioritas aksi siswa.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✕</span> Teks logo bertumpuk menyulitkan keterbacaan pada viewport kecil.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✕</span> Kontak bar mengonsumsi terlalu banyak real-estate layar di bagian atas.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" /> Blueprint Navigasi yang Kami Bangun
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Berikut adalah standard komponen navigasi modern yang berorientasi pada kemudahan guru, siswa, dan calon walimurid:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-blue-50/50 rounded-lg text-blue-900 flex items-start gap-2">
                <span className="bg-blue-100 px-1.5 py-0.5 rounded font-bold text-[10px] mt-0.5">1</span>
                <div>
                  <h5 className="font-semibold text-[11px]">Sistem Megamenu Deskriptif</h5>
                  <p className="text-[10px] text-slate-500">Setiap link sub-menu dilengkapi deskripsi ringkas agar pengunjung tidak perlu menebak isi halaman sebelum mengklik.</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50/50 rounded-lg text-blue-900 flex items-start gap-2">
                <span className="bg-blue-100 px-1.5 py-0.5 rounded font-bold text-[10px] mt-0.5">2</span>
                <div>
                  <h5 className="font-semibold text-[11px]">Fokus Tombol PPDB (Admission Call-To-Action)</h5>
                  <p className="text-[10px] text-slate-500">Tombol pendaftaran PPDB ditempatkan sebagai pilar utama navigasi dengan warna mencolok agar menarik perhatian calon siswa dengan instan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
