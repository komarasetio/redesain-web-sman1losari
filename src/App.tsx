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
  Info,
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  X,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ColorGuide from './components/ColorGuide';
import NavigationGuide from './components/NavigationGuide';
import LandingPageStructure from './components/LandingPageStructure';
import LiveWebsiteDemo from './components/LiveWebsiteDemo';
import Sman1LosariLogo from './components/Sman1LosariLogo';
import CmsDashboard from './components/CmsDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'live-demo' | 'color' | 'nav' | 'structure' | 'cms'>('welcome');
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sman1losari_selected_theme_id') || 'classic-scholar';
    }
    return 'classic-scholar';
  });

  // Track if we are on the admin path/route
  const [isAdminPath, setIsAdminPath] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
    }
    return false;
  });

  // Dynamic reactive admin logged status
  const [isAdminLogged, setIsAdminLogged] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sman1losari_admin_logged') === 'true';
    }
    return false;
  });

  // Pull konfigurasi dari server secara periodik untuk mensinkronisasi seluruh layar pengunjung secara real-time
  React.useEffect(() => {
    const triggerPull = () => {
      import('./lib/apiSync')
        .then(m => m.pullConfigFromServer((config) => {
          setSelectedThemeId(config.themeId);
        }))
        .catch(err => console.error('Gagal mengambil sinkronisasi konfigurasi:', err));
    };

    // Ambil data pertama secara instan saat inisialisasi
    triggerPull();

    // Setup polling interval tiap 4 detik demi kesamaan tampilan yang real-time
    const interval = setInterval(triggerPull, 4000);

    return () => clearInterval(interval);
  }, []);

  // Memantau perubahan tema secara lokal maupun dari server sync
  React.useEffect(() => {
    const handleThemeUpdate = () => {
      setSelectedThemeId(localStorage.getItem('sman1losari_selected_theme_id') || 'classic-scholar');
    };
    window.addEventListener('sman1losari_theme_changed', handleThemeUpdate);
    return () => {
      window.removeEventListener('sman1losari_theme_changed', handleThemeUpdate);
    };
  }, []);

  // Polling / reactive route tracking
  React.useEffect(() => {
    const checkUrl = () => {
      if (typeof window !== 'undefined') {
        const isRouteAdmin = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
        setIsAdminPath(isRouteAdmin);
        setIsAdminLogged(localStorage.getItem('sman1losari_admin_logged') === 'true');
      }
    };

    window.addEventListener('popstate', checkUrl);
    window.addEventListener('hashchange', checkUrl);

    // Dynamic timer-based recovery check in case history pushState triggers without popstate
    const timer = setInterval(checkUrl, 500);

    return () => {
      window.removeEventListener('popstate', checkUrl);
      window.removeEventListener('hashchange', checkUrl);
      clearInterval(timer);
    };
  }, []);

  // Security Login States
  const [logoDownloadStatus, setLogoDownloadStatus] = useState<'idle' | 'success' | 'copied'>('idle');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      localStorage.setItem('sman1losari_admin_logged', 'true');
      localStorage.setItem('sman1losari_admin_token', 'admin123_authenticated');
      setIsAdminLogged(true);
      setLoginError('');
      setUsername('');
      setPassword('');
      window.dispatchEvent(new Event('sman1losari_theme_changed'));
    } else {
      setLoginError('ID Admin atau Kata Sandi salah! Hubungi Tim IT SMANSALOS.');
    }
  };

  const handleBackToWebsite = () => {
    if (typeof window !== 'undefined') {
      // Clear hash and route back to root index
      if (window.location.hash === '#admin') {
        window.location.hash = '';
      }
      if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState({}, '', '/');
      }
    }
    setIsAdminPath(false);
  };

  // Quick stats computed for the redesign overview card
  const summaryOutcomes = [
    { title: 'Bento Grid News', desc: 'Sistem peletakan asimetris yang membagi fokus berita utama (seperti visi misi) secara kokoh dan kontemporer.' },
    { title: 'Interactive Resource Tabs', desc: 'Menghilangkan kekakuan grid horizontal lama yang melelahkan diganti dengan drawer penjelajahan responsif.' },
    { title: 'Heritage Branding', desc: 'Mempertahankan keterkaitan emosional warna marigold tradisi Cirebon dengan sentuhan Biru Slate Akademik.' },
    { title: 'Fluid Navigation Hub', desc: 'Backdrop glassmorphic navigation bar yang mengambang anggun, memudahkan pencarian SPMB seketika.' }
  ];

  // RENDERS PUBLIC WEBSITE GUEST FACE WITH ABSOLUTELY NO SYSTEM WORKSPACE BUTTON CLUTTER
  if (!isAdminPath) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative" id="portal-redesign-root">
        {/* Full-width premium redesigned website, completely clean and free of evaluation toggles */}
        <LiveWebsiteDemo themeId={selectedThemeId} isFullPage={true} />
      </div>
    );
  }

  // RENDER ADMIN SCOPE AREA (SECURE DESAIN / WORKSPACE FOLDER HANDLER)
  // If not authenticated, we display a beautiful fullscreen corporate portal
  if (!isAdminLogged) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden" id="admin-login-fullscreen">
        {/* Abstract design elements matching Cirebon academic heritage */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative max-w-md w-full bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 z-10"
        >
          {/* Main School header badge */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 shadow-inner">
              <Sman1LosariLogo size="sm" primaryColor="#F59E0B" accentColor="#3B82F6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-400 tracking-widest uppercase">SMAN 1 LOSARI</h2>
              <h3 className="text-lg font-black text-white tracking-tight uppercase leading-tight">ADMIN PORTAL & DESAIN</h3>
              <p className="text-slate-400 text-xs">Otoritas Pengelolaan Konsep & Database Sekolah</p>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-200 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2 animate-pulse">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">ID Pengguna (Username)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="ID Admin..."
                  required
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-3 px-4 pl-11 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">Kata Sandi (Password)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Kata sandi..."
                  required
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-3 px-4 pl-11 pr-11 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 active:scale-[0.98] cursor-pointer"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
              Verifikasi Masuk
            </button>
          </form>

          {/* Test Account Credentials Helpful Card */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/50 space-y-1.5 text-xs text-slate-450 leading-normal">
            <span className="font-bold text-amber-500 flex items-center gap-1">🔑 Akun Penguji Resmi:</span>
            <p className="pl-4">ID Admin: <code className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">admin</code></p>
            <p className="pl-4">Kata Sandi: <code className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">admin123</code></p>
          </div>

          <button
            type="button"
            onClick={handleBackToWebsite}
            className="w-full text-center text-xs text-slate-500 hover:text-white transition-colors cursor-pointer py-1 font-bold flex items-center justify-center gap-1 hover:underline"
          >
            ← Kembali ke Portal Utama Sekolah
          </button>
        </motion.div>
      </div>
    );
  }

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
              <Sman1LosariLogo size="md" primaryColor="#1E293B" accentColor="#F59E0B" />
              <div>
                <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 uppercase leading-none">
                  PROYEK MEROMBAK PORTAL KAMPUS SMAN 1 LOSARI
                </h1>
                <p className="font-script text-[15px] sm:text-[17px] italic text-amber-600 font-extrabold tracking-wide mt-1.5 leading-none">
                  Pasti Bisa!
                </p>
              </div>
            </div>
          </div>

          {/* Quick theme status tracker + Public Website Quick Switch */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToWebsite}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 text-center uppercase tracking-wider"
            >
              <CheckCircle className="w-4 h-4 shrink-0" /> Lihat Situs Utama
            </button>
            <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-slate-650">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span>Skema Aktif: <strong className="font-extrabold text-slate-900 capitalize">{selectedThemeId.replace('-', ' ')}</strong></span>
            </div>
          </div>
        </div>

        {/* TOP WORKSPACE TAB MENU SELECTOR */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex border-t border-slate-100/80 pt-1 gap-1">
            {[
              { id: 'welcome', label: '👋 Ringkasan Strategis', icon: Sparkles },
              { id: 'live-demo', label: '🖥️ Live Demo Website (Redesigned)', icon: Layout },
              { id: 'cms', label: '⚙️ Kelola Data (Database Sim)', icon: Zap },
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
              
              {/* BRANDING HUB & SVG DOWNLOAD CENTER */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100/80 md:col-span-1">
                  <Sman1LosariLogo size="xl" className="w-32 h-32 md:w-40 md:h-40 relative z-10 hover:scale-110 hover:rotate-3 transition-transform duration-500" />
                  <span className="text-[10px] font-mono text-slate-400 mt-4 tracking-wider font-semibold">500 x 500 PX • VECTOR SVG</span>
                </div>
                
                <div className="md:col-span-2 space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-widest text-amber-605 bg-amber-50 border border-amber-200/55 px-2.5 py-1 rounded uppercase font-semibold">REKOGNISI WARISAN & KULTUR</span>
                    <h3 className="font-black text-xl text-slate-900">🛡️ Pusat Unduh Logo SVG Resmi SMAN 1 Losari</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kami telah merencanakan dan merekonstruksi seluruh lambang sekolah SMA Negeri 1 Losari Kabupaten Cirebon dari format raster pecah yang lama menjadi <strong>vektor SVG murni berpresisi tinggi</strong>. Visual ikonik penting seperti <em>Candi Bentar Cirebon</em>, <em>Bawang Merah Losari</em>, <em>Sepasang Ikan Bandeng Pantai Cisanggarung</em>, serta <em>Buku & Bintang</em> telah digambar ulang secara presisi agar siap dipakai untuk kop surat, seragam, dan media cetak tanpa pecah sama sekali.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-xs">✓</span>
                      <span>Format Vektor Murni (Scalable tanpa batas)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-xs">✓</span>
                      <span>Kompatibel Adobe Illustrator & Figma</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-xs">✓</span>
                      <span>Ukuran File Sangat Ringan (&lt;15 KB)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-xs">✓</span>
                      <span>Dirender Responsif dengan warna tema</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        const svgElement = document.getElementById('sman-1-losari-logo-svg');
                        if (svgElement) {
                          const serializer = new XMLSerializer();
                          let svgString = serializer.serializeToString(svgElement);
                          if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
                            svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                          }
                          const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'logo_sman1_losari_cirebon_resmi.svg';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(url);
                          
                          setLogoDownloadStatus('success');
                          setTimeout(() => setLogoDownloadStatus('idle'), 4000);
                        }
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1.5 uppercase tracking-wide"
                      title="Unduh logo format SVG"
                    >
                      <Download className="w-4 h-4" /> Unduh File SVG Resmi
                    </button>

                    <button
                      onClick={() => {
                        const svgElement = document.getElementById('sman-1-losari-logo-svg');
                        if (svgElement) {
                          const serializer = new XMLSerializer();
                          let svgString = serializer.serializeToString(svgElement);
                          if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
                            svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                          }
                          navigator.clipboard.writeText(svgString);
                          setLogoDownloadStatus('copied');
                          setTimeout(() => setLogoDownloadStatus('idle'), 4000);
                        }
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      title="Salin XML SVG ke papan klip"
                    >
                      <span>📋</span> Salin Kode Sumber SVG
                    </button>
                  </div>

                  {logoDownloadStatus === 'success' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] font-bold text-emerald-700 animate-pulse">
                      🎉 Berhasil diunduh! File "logo_sman1_losari_cirebon_resmi.svg" telah berhasil disimpan di komputer Anda. Anda dapat menggunakannya langsung untuk kebutuhan cetak Anda.
                    </div>
                  )}

                  {logoDownloadStatus === 'copied' && (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-[11px] font-bold text-amber-700 animate-pulse">
                      📋 Berhasil disalin! Kode xml SVG telah tersimpan di papan klip Anda. Anda bisa menempelkannya (paste) di program desain profesional pilihan Anda seperti Adobe Illustrator, CorelDRAW, atau Figma.
                    </div>
                  )}
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
                onThemeSelect={(id) => {
                  setSelectedThemeId(id);
                  localStorage.setItem('sman1losari_selected_theme_id', id);
                  window.dispatchEvent(new Event('sman1losari_theme_changed'));
                  
                  // Auto sync ke server jika masuk sebagai admin
                  if (localStorage.getItem('sman1losari_admin_logged') === 'true') {
                    import('./lib/apiSync')
                      .then(m => m.pushLocalConfigToServer())
                      .catch(err => console.error('Gagal mensinkronisasikan kustomisasi tema ke server:', err));
                  }
                }}
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

          {activeTab === 'cms' && (
            <motion.div
              key="cms-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Renders data management & local database controls */}
              <CmsDashboard />
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
