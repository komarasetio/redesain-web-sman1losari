/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Grid, 
  Layers, 
  CheckSquare, 
  LayoutTemplate, 
  HelpCircle, 
  Cpu, 
  Sliders, 
  BookOpen, 
  Award, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Mail, 
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPageStructure() {
  const [selectedSection, setSelectedSection] = useState<string>('hero');

  const componentsChecklist = [
    {
      title: 'Hero / Banner Gembira',
      desc: 'Area penyambutan utama di bagian paling atas untuk calon siswa, alumni, dan pemangku kepentingan.',
      icon: LayoutTemplate,
      whyRequired: 'Membentuk kesan prestise pertama. Harus menggunakan foto resolusi tinggi, tipografi display tebal, dan tombol aksi ganda (Pendaftaran & Profil).',
      tags: ['Utama', 'Visual']
    },
    {
      title: 'Running Ticker Warta Terkini',
      desc: 'Running text responsif untuk menyebarkan berita kilat seperti tanggal tenggat pendaftaran atau ujian.',
      icon: Cpu,
      whyRequired: 'Menghilangkan kekakuan pengumuman lama. Tampil dinamis tepat di bawah header tanpa mengganggu fokus konten lain.',
      tags: ['Dinamis', 'Informasi']
    },
    {
      title: 'Bento Grid Berita (Kombinasi Kartu)',
      desc: 'Tata letak asimetris (Bento Grid) yang menggabungkan berita utama berdimensi besar dengan artikel kecil di sampingnya.',
      icon: Grid,
      whyRequired: 'Menggantikan grid horizontal 4-kolom yang membosankan pada website lama. Memberikan hirarki visual yang jelas.',
      tags: ['Kontemporer', 'Berita']
    },
    {
      title: 'Portal Hub Layanan Guru & Siswa (Tab Bebas)',
      desc: 'Gabungan menu Pengumuman, Blog Guru, Fasilitas, dan Ekskul dalam sistem TABS interaktif.',
      icon: Layers,
      whyRequired: 'Menyusutkan tinggi halaman hingga 60%! Pengunjung tinggal mengklik tab (misal "Fasilitas" atau "Kegiatan") tanpa perlu scroll berlebihan.',
      tags: ['Interaktif', 'Efisiensi']
    },
    {
      title: 'Kalender Agenda Terpadu',
      desc: 'Elemen penayangan jadwal kegiatan sekolah, rapat guru, & ujian dalam format baris linimasa mini yang rapi.',
      icon: Calendar,
      whyRequired: 'Menyelesaikan bagian kosong (empty-state) "Tidak ada agenda" dengan menyediakan layout interaktif yang anggun.',
      tags: ['Fungsional', 'Data']
    },
    {
      title: 'Galeri Kampus dengan Filter',
      desc: 'Galeri album aktivitas siswa (Teater, Olahraga, Lab) yang dapat difilter secara langsung tanpa reload halaman.',
      icon: ImageIcon,
      whyRequired: 'Menghadirkan keterlibatan emosional. Siswa & wali murid bisa mengeksplorasi dokumentasi sekolah dengan respons yang memanjakan mata.',
      tags: ['Multimedia', 'Seni']
    },
    {
      title: 'Pendidik & Staff Directory Carousels',
      desc: 'Slide pamer foto portrait para guru berlatar belakang studio bersih lengkap dengan mata pelajaran di bawahnya.',
      icon: Users,
      whyRequired: 'Memanusiakan institusi sekolah. Memperlihatkan dedikasi tenaga pendidik dengan visual portofolio modern.',
      tags: ['Komunitas', 'Profil']
    }
  ];

  const wireframeSections = {
    hero: {
      name: '1. Area Hero & Header Gateway',
      purpose: 'Membuka identitas SMAN 1 Losari berpilar modern.',
      specs: 'Gunakan perpaduan tipografi "Outfit" atau "Space Grotesk" 52px, overlay separuh miring, dan statistik ringkas sekolah (misal: "35 Akreditasi A", "1200+ Siswa", "20+ Prestasi").',
      recommendation: 'Hindari ilustrasi kartun polos yang berukuran terlalu raksasa tanpa keseimbangan ruang teks. Kombinasikan dengan potret siswa berprestasi asli.'
    },
    bentoNews: {
      name: '2. Bento Grid Berita Terbaru & Visi-Misi',
      purpose: 'Menampilkan berita utama (Visi-Misi) secara berwibawa.',
      specs: 'Gunakan rasio grid 2:1 atau 3:2. Sisi kiri besar memuat thumbnail "Visi & Misi SMAN 1 Losari" dengan transisi bayangan (transition-shadow), sisi kanan menumpuk berita harian ringkas.',
      recommendation: 'Gunakan badge kategori seperti #Akademik (Teal) atau #Pengumuman (Amber) agar tulisan rapi.'
    },
    resourceTab: {
      name: '3. Interactive Tabbed Resource Drawer',
      purpose: 'Menata file Pengumuman, Blog Guru, Fasilitas, dan Klub Kegiatan agar tidak tumpang tindih.',
      specs: 'Mengimplementasikan tab switcher dengan micro-animation garis geser (motion-slider) saat diklik.',
      recommendation: 'Ini adalah pembunuh kekakuan terbesar! Cukup tampilkan 3-4 item per tab secara horizontal agar hemat ruang.'
    },
    agendaBanner: {
      name: '4. Agenda & Kalender Kegiatan Interaktif',
      purpose: 'Menampilkan informasi hari-hari penting sekolah dengan atraktif.',
      specs: 'Sisi kiri menampilkan tanggalan kalender bergaya minimalis, sisi kanan menyajikan slider acara sekolah terdekat.',
      recommendation: 'Sediakan skeleton loader jernih apabila data kosong, hindari sekadar menulis teks hitam polos tanpa bingkai desain.'
    },
    facultyShowcase: {
      name: '5. Jajaran Guru & Pendidik Terhormat',
      purpose: 'Mempersembahkan rasa hormat dan integritas pada wali murid.',
      specs: 'Tampilan card bergaya polaroid modern. Ketika di-hover, memicu efek naik ke atas (translate-y) dan muncul link sosial media atau kontak pendaftaran bimbingan.',
      recommendation: 'Pastikan pencahayaan foto seragam (background serupa), ini memberi kesan sekolah internasional yang tersistem.'
    }
  };

  return (
    <div className="space-y-8" id="landing-structure-container">
      {/* Structural Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">ARSITEKTUR LAYOUT</span>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Struktur Halaman Depan yang Tidak Kaku</h2>
          <p className="text-slate-500 text-sm max-w-2xl">
            Merangkai ulang konten sekolah dari sekadar urutan kolom beruntun menjadi **Grid Sistem Bento** dan **Tergrup Tabs** yang kaya ritme visual.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Layout Map Wireframe (Lefthand Column 5/12) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-sm tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-400" /> Peta Arsitektur Halaman
            </h3>
            <p className="text-xs text-slate-400">Pilih salah satu blok bangunan di bawah ini untuk melihat detail rekomendasi komponen kami:</p>
          </div>

          {/* Interactive Wireframe Stack Representing the Layout pages */}
          <div className="space-y-3 my-4">
            {/* Nav Block Represent */}
            <div className="border border-slate-800 bg-slate-800/20 text-center p-2 rounded-lg text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              [Pondasi Navigasi Desktop Modern]
            </div>

            {/* Hero Block (Interactive selection) */}
            <button 
              onClick={() => setSelectedSection('hero')}
              className={`w-full text-center p-4 rounded-xl text-xs font-bold uppercase transition-all border block cursor-pointer ${
                selectedSection === 'hero' 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-102' 
                  : 'bg-slate-800/40 text-slate-300 border-slate-800 hover:bg-slate-800/90'
              }`}
            >
              🚀 1. Gateway Hero & Core Banner
            </button>

            {/* Bento News Block */}
            <button 
              onClick={() => setSelectedSection('bentoNews')}
              className={`w-full text-center p-4 rounded-xl text-xs font-bold uppercase transition-all border block cursor-pointer ${
                selectedSection === 'bentoNews' 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-102' 
                  : 'bg-slate-800/40 text-slate-300 border-slate-800 hover:bg-slate-800/90'
              }`}
            >
              🍱 2. Bento Grid Berita Utama
            </button>

            {/* Resource Tabs Block */}
            <button 
              onClick={() => setSelectedSection('resourceTab')}
              className={`w-full text-center p-4 rounded-xl text-xs font-bold uppercase transition-all border block cursor-pointer ${
                selectedSection === 'resourceTab' 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-102' 
                  : 'bg-slate-800/40 text-slate-300 border-slate-800 hover:bg-slate-800/90'
              }`}
            >
              📁 3. Tabbed Resources (Hub Pintar)
            </button>

            {/* Calendar Agenda Block */}
            <button 
              onClick={() => setSelectedSection('agendaBanner')}
              className={`w-full text-center p-4 rounded-xl text-xs font-bold uppercase transition-all border block cursor-pointer ${
                selectedSection === 'agendaBanner' 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-102' 
                  : 'bg-slate-800/40 text-slate-300 border-slate-800 hover:bg-slate-800/90'
              }`}
            >
              📅 4. Agenda & Kalender Linimasa
            </button>

            {/* Faculty Directory Block */}
            <button 
              onClick={() => setSelectedSection('facultyShowcase')}
              className={`w-full text-center p-4 rounded-xl text-xs font-bold uppercase transition-all border block cursor-pointer ${
                selectedSection === 'facultyShowcase' 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-102' 
                  : 'bg-slate-800/40 text-slate-300 border-slate-800 hover:bg-slate-800/90'
              }`}
            >
              🎓 5. Faculty Directory & Profil Guru
            </button>

            {/* Footer Block */}
            <div className="border border-slate-800 bg-slate-800/20 text-center p-2 rounded-lg text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              [Footer Terpadu (Peta & Kontak)]
            </div>
          </div>

          {/* Quick info-card base */}
          <div className="bg-slate-800/40 p-3 rounded-lg flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>Struktur ini dirancang asimetris untuk meniru ritme website universitas kelas dunia, menghilangkan kebosanan baris-baris seragam.</span>
          </div>
        </div>

        {/* Dynamic Specs details area (Righthand Column 7/12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700 tracking-wider uppercase inline-block">
                SPESIFIKASI VISUAL REKOMENDASI
              </span>
              <h4 className="text-xl font-bold text-slate-900">{wireframeSections[selectedSection as keyof typeof wireframeSections].name}</h4>
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 block uppercase">Tujuan Komponen</span>
                <p className="text-xs text-slate-700 font-medium">{wireframeSections[selectedSection as keyof typeof wireframeSections].purpose}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 block uppercase">Spesifikasi Teknis (CSS & UX)</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 p-4 rounded-xl font-mono">
                  {wireframeSections[selectedSection as keyof typeof wireframeSections].specs}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 block uppercase">Rujukan Khusus untuk SMAN 1 Losari</span>
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100/60 p-3.5 rounded-xl leading-relaxed">
                  💡 {wireframeSections[selectedSection as keyof typeof wireframeSections].recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE COMPONENTS RECOMMENDATIONS CHECKLIST */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-slate-950 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          Komponen Wajib pada Website Sekolah Modern
        </h3>
        <p className="text-xs text-slate-500">Berikut adalah daftar lengkap komponen beserta dasar kegunaannya yang telah kami susun dan implementasikan pada purwarupa di bawah:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentsChecklist.map((comp, idx) => {
            const IconComp = comp.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-xl p-5 hover:shadow-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-slate-50 text-blue-600 rounded-lg">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      {comp.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-bold tracking-wider uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{comp.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{comp.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Kenapa Harus Ada?</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/50">
                    {comp.whyRequired}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
