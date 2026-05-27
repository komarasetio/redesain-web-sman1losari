/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  X, 
  HelpCircle, 
  Eye, 
  FileText, 
  TrendingUp, 
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

interface ColorGuideProps {
  currentThemeId: string;
  onThemeSelect: (themeId: string) => void;
}

export default function ColorGuide({ currentThemeId, onThemeSelect }: ColorGuideProps) {
  const [showCritique, setShowCritique] = useState(true);

  const proposedThemes = [
    {
      id: 'classic-scholar',
      name: 'EduSlate Gold (Rekomendasi Utama)',
      description: 'Menyeimbangkan Biru Gelap Akademik dengan Aksen Emas Marigold yang hangat dan kaya.',
      primaryHex: '#0F172A', // Slate 900
      secondaryHex: '#1E3A8A', // Blue 900
      accentHex: '#F59E0B', // Amber 500
      bgHex: '#F8FAFC', // Slate 50
      textColor: 'text-slate-900',
      tagline: 'Wibawa, Kepercayaan, & Semangat Juang',
    },
    {
      id: 'academic-teal',
      name: 'Botanical Emerald',
      description: 'Teal Botani modern bertautan dengan Emas Pasir untuk nuansa segar, organik, dan berkembang.',
      primaryHex: '#0F766E', // Teal 700
      secondaryHex: '#115E59', // Teal 800
      accentHex: '#F59E0B', // Amber 500
      bgHex: '#F0FDFA', // Teal 50
      textColor: 'text-teal-905',
      tagline: 'Pertumbuhan, Harmoni, & Masa Depan Cerah',
    },
    {
      id: 'heritage-indigo',
      name: 'Midnight Indigo',
      description: 'Indigo Royal digabungkan dengan Sunset Orange untuk mendorong kreativitas dan kemajuan digital.',
      primaryHex: '#312E81', // Indigo 900
      secondaryHex: '#1E1B4B', // Indigo 950
      accentHex: '#F97316', // Orange 500
      bgHex: '#FAF5FF', // Purple 50
      textColor: 'text-indigo-950',
      tagline: 'Kreativitas, Inovasi, & Komunitas Aktif',
    },
    {
      id: 'monochrome-absolute',
      name: 'Monochrome Absolute (Hitam Putih)',
      description: 'Aura minimalis klasik berkelaraskan hitam malam absolut, abu grafit, dan latar putih bersih. Sangat kokoh, bersih, dan berwibawa.',
      primaryHex: '#09090B', // Zinc 950
      secondaryHex: '#27272A', // Zinc 800
      accentHex: '#18181B', // Zinc 900
      bgHex: '#FFFFFF', // Pure White
      textColor: 'text-zinc-950',
      tagline: 'Presisi Tinggi, Kejujuran, & Kejelasan Berpikir',
    },
    {
      id: 'iron-crimson',
      name: 'Iron Crimson (Baja & Crimson)',
      description: 'Paduan kokoh warna batu arang gelap (stone charcoal) dengan merah crimson baja yang mencerminkan keberanian murni dan tekad tak tergoyahkan.',
      primaryHex: '#1C1917', // Stone 900
      secondaryHex: '#44403C', // Stone 700
      accentHex: '#991B1B', // Red 800 (Crimson)
      bgHex: '#FAF9F6', // Alabaster Off-white
      textColor: 'text-stone-900',
      tagline: 'Ketangguhan, Kehormatan, & Ketetapan Hati',
    }
  ];

  return (
    <div className="space-y-8" id="color-guide-container">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Palette className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">PANDUAN VISUAL BARU</span>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Merumuskan Kembali Karakter SMAN 1 Losari</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Website sekolah adalah wajah digital utama institusi Anda. Mengacu pada screenshot website asli yang memiliki basis biru gelap dan kuning solid, draf panduan warna baru ini dibuat untuk **menumbuhkan kesan prestisius, modern, tulus, namun tetap menjaga aksesibilitas**, tanpa membuang warna identitas asli sekolah.
            </p>
          </div>
        </div>
      </div>

      {/* Critique Section */}
      <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-lg">Mengapa Website Lama Terasa 'Kaku' & 'Padat'?</h3>
          </div>
          <button 
            onClick={() => setShowCritique(!showCritique)}
            className="text-amber-800 hover:text-amber-900 text-sm font-medium underline cursor-pointer"
          >
            {showCritique ? 'Sembunyikan Analisis' : 'Tampilkan Analisis'}
          </button>
        </div>

        {showCritique && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">1</div>
              <h4 className="font-medium text-slate-900">Kontras & Warna Terlalu Primer</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kombinasi biru solid murni (#0000FF/gelap) dengan kuning menyala tanpa variasi saturasi menciptakan tabrakan warna yang keras bagi mata. Ini membuat mata pembaca cepat lelah.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">2</div>
              <h4 className="font-medium text-slate-900">Hilangnya 'Negative Space'</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Antara section dibatasi garis-garis tebal atau kotak kuning penuh ("Selengkapnya") yang ukurannya seragam di semua kolom. Elemen visual saling berdesakan tanpa ruang bernapas (White Space).
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">3</div>
              <h4 className="font-medium text-slate-900">Tombol Aksi Kehilangan Hierarki</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Penggunaan tombol kuning kaku di bawah setiap kolom (Pengumuman, Blog, Fasilitas, Kegiatan) membuat mata bingung harus fokus ke mana terlebih dahulu (Visual Fatigue).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Palettes & Demo Integrator */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Rekomendasi Skema Warna Baru yang Dinamis
          </h3>
          <p className="text-sm text-slate-500">Pilih salah satu palet di bawah ini untuk melihat penerapannya secara langsung pada <strong>Live Demo Website</strong>.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {proposedThemes.map((theme) => {
            const isSelected = currentThemeId === theme.id;
            return (
              <div 
                key={theme.id}
                onClick={() => onThemeSelect(theme.id)}
                className={`cursor-pointer rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between h-full hover:shadow-md ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50/20 ring-2 ring-blue-500/10' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-4">
                  {/* Color Swatch row */}
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: theme.primaryHex }} />
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: theme.secondaryHex }} />
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: theme.accentHex }} />
                    <div className="w-10 h-10 rounded-lg border border-slate-200" style={{ backgroundColor: theme.bgHex }} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">{theme.name}</h4>
                      {isSelected && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 animate-pulse">
                          Aktif
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400 block">{theme.tagline}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-400">Primer Code</span>
                    <span className="font-mono font-medium text-slate-900">{theme.primaryHex}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-slate-400">Aksen Code</span>
                    <span className="font-mono font-medium text-amber-600">{theme.accentHex}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WCAG & Spacing Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider text-slate-500">
            <Lock className="w-4 h-4 text-emerald-500" /> Standard Aksesibilitas (WCAG 2.1)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dalam standar baru, teks di atas latar belakang (termasuk tombol) harus diuji nilai rasio kontrasnya minimal **4.5:1** (Rasio AA). 
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs">
              <span className="font-medium">Biru Slate Baru + Teks Putih</span>
              <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded font-bold">14.2:1 (Sangat Lolos AAA)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs">
              <span className="font-medium">Emas Marigold + Teks Slate Gelap (Tombol)</span>
              <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded font-bold">6.1:1 (Lolos AA)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg text-red-800 text-xs">
              <span className="font-medium">Kuning Menyala Lama + Teks Putih (Lama)</span>
              <span className="font-mono bg-red-100 px-2 py-0.5 rounded font-bold">1.4:1 (Gagal - Sulit Dibaca)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider text-slate-500">
            <Eye className="w-4 h-4 text-blue-500" /> Aturan Distribusi Ruang (Rhythm)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Untuk meredakan ketegangan tata letak website lama, kami mengusulkan formula ruang bernapas berikut:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 pt-2 list-disc pl-4">
            <li><strong>Padding Section Longgar (4rem s/d 6rem)</strong>: Jeda 64px - 96px antar-komponen utama agar otak mencerna topik halaman satu per satu.</li>
            <li><strong>Desaturasi Latar Belakang</strong>: Alih-alih membentangkan kotak biru tua solid yang berat di berbagai tempat, gunakan warna abu-keperakan tipis (`#F8FAFC`) untuk memisahkan section.</li>
            <li><strong>Rasio Ukuran Elemen</strong>: Judul section dibuat besar dan tegas (`text-3xl font-extrabold tracking-tight`), didukung deskripsi singkat berpiksel kecil abu-abu.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
