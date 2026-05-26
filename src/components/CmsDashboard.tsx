import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit2, 
  RotateCcw, 
  Check, 
  X, 
  Calendar, 
  Bookmark, 
  Briefcase, 
  Library, 
  Sparkles,
  Camera,
  Image,
  User,
  Activity,
  Award,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';
import { useSchoolData } from '../lib/schoolDataStore';
import { NewsItem, TeacherItem, FacilityItem, ActivityItem } from '../types';
import Sman1LosariLogo from './Sman1LosariLogo';

export default function CmsDashboard() {
  const { data, addItem, editItem, deleteItem, resetToDefault } = useSchoolData();
  const [activeSubTab, setActiveSubTab] = useState<'news' | 'announcements' | 'blogs' | 'facilities' | 'teachers' | 'activities' | 'gallery' | 'logo' | 'layout_settings'>('news');
  
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('sman1losari_custom_logo');
  });

  // Section Visibility/Layout States
  const [showQuotes, setShowQuotes] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sman1losari_show_quotes') !== 'false';
  });
  const [showTeachers, setShowTeachers] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sman1losari_show_teachers') !== 'false';
  });
  const [showMaps, setShowMaps] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sman1losari_show_maps') !== 'false';
  });
  const [showActivities, setShowActivities] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sman1losari_show_activities') !== 'false';
  });
  const [showGallery, setShowGallery] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sman1losari_show_gallery') !== 'false';
  });

  const toggleSetting = (key: string, currentValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const nextValue = !currentValue;
    setter(nextValue);
    localStorage.setItem(key, String(nextValue));
    window.dispatchEvent(new Event('sman1losari_layout_changed'));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Maaf, file harus berupa gambar!');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      localStorage.setItem('sman1losari_custom_logo', base64);
      setCustomLogo(base64);
      window.dispatchEvent(new Event('sman1losari_logo_changed'));
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUrlChange = (url: string) => {
    if (!url.trim()) return;
    localStorage.setItem('sman1losari_custom_logo', url);
    setCustomLogo(url);
    window.dispatchEvent(new Event('sman1losari_logo_changed'));
  };

  const handleLogoDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus logo kustom dan mengembalikan logo ke lambang bawaan resmi SMAN 1 Losari?')) {
      localStorage.removeItem('sman1losari_custom_logo');
      setCustomLogo(null);
      window.dispatchEvent(new Event('sman1losari_logo_changed'));
    }
  };
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sman1losari_admin_logged') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Editing state controls
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Berita',
    excerpt: '',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400',
    date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  });
  
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    date: 'Terbit ' + new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    type: 'Penting'
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    author: '',
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const [facilityForm, setFacilityForm] = useState<Partial<FacilityItem>>({
    name: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400'
  });

  const [teacherForm, setTeacherForm] = useState<Partial<TeacherItem>>({
    name: '',
    role: '',
    subject: '',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300'
  });

  const [activityForm, setActivityForm] = useState<Partial<ActivityItem>>({
    title: '',
    date: 'Latihan Rutin',
    category: 'Seni',
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=400'
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    tag: 'akademik' as 'akademik' | 'eskul' | 'fasilitas',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400'
  });

  const handleResetAll = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang seluruh data website kembali ke setelan pabrik/awal SMAN 1 Losari? Semua tambahan data kustom Anda akan hilang.')) {
      resetToDefault();
    }
  };

  const startEdit = (id: string, type: string) => {
    setEditingId(id);
    setIsAdding(false);
    
    if (type === 'news') {
      const item = data.news.find(i => i.id === id);
      if (item) setNewsForm(item);
    } else if (type === 'announcements') {
      const item = data.announcements.find(i => i.id === id);
      if (item) setAnnouncementForm(item);
    } else if (type === 'blogs') {
      const item = data.blogs.find(i => i.id === id);
      if (item) setBlogForm(item);
    } else if (type === 'facilities') {
      const item = data.facilities.find(i => i.id === id);
      if (item) setFacilityForm(item);
    } else if (type === 'teachers') {
      const item = data.teachers.find(i => i.id === id);
      if (item) setTeacherForm(item);
    } else if (type === 'activities') {
      const item = data.activities.find(i => i.id === id);
      if (item) setActivityForm(item);
    } else if (type === 'gallery') {
      const item = data.gallery.find(i => i.id === id);
      if (item) setGalleryForm(item);
    }
  };

  const saveEdit = (type: 'news' | 'announcements' | 'blogs' | 'facilities' | 'teachers' | 'activities' | 'gallery') => {
    if (!editingId) return;

    if (type === 'news') {
      editItem('news', editingId, newsForm);
    } else if (type === 'announcements') {
      editItem('announcements', editingId, announcementForm);
    } else if (type === 'blogs') {
      editItem('blogs', editingId, blogForm);
    } else if (type === 'facilities') {
      editItem('facilities', editingId, facilityForm);
    } else if (type === 'teachers') {
      editItem('teachers', editingId, teacherForm);
    } else if (type === 'activities') {
      editItem('activities', editingId, activityForm);
    } else if (type === 'gallery') {
      editItem('gallery', editingId, galleryForm);
    }

    setEditingId(null);
  };

  const handleCreate = (type: 'news' | 'announcements' | 'blogs' | 'facilities' | 'teachers' | 'activities' | 'gallery') => {
    const id = `${type}-${Date.now()}`;
    if (type === 'news') {
      addItem('news', { ...newsForm, id } as any);
      // Reset form
      setNewsForm({
        title: '', category: 'Berita', excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400',
        date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      });
    } else if (type === 'announcements') {
      addItem('announcements', { ...announcementForm, id } as any);
      setAnnouncementForm({
        title: '', date: 'Terbit ' + new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }), type: 'Penting'
      });
    } else if (type === 'blogs') {
      addItem('blogs', { ...blogForm, id } as any);
      setBlogForm({
        title: '', author: '', date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    } else if (type === 'facilities') {
      addItem('facilities', { ...facilityForm, id } as any);
      setFacilityForm({
        name: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400'
      });
    } else if (type === 'teachers') {
      addItem('teachers', { ...teacherForm, id } as any);
      setTeacherForm({
        name: '', role: '', subject: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300'
      });
    } else if (type === 'activities') {
      addItem('activities', { ...activityForm, id } as any);
      setActivityForm({
        title: '', date: 'Latihan Rutin', category: 'Seni', imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=400'
      });
    } else if (type === 'gallery') {
      addItem('gallery', { ...galleryForm, id } as any);
      setGalleryForm({
        title: '', tag: 'akademik', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400'
      });
    }

    setIsAdding(false);
  };

  const handleDelete = (type: 'news' | 'announcements' | 'blogs' | 'facilities' | 'teachers' | 'activities' | 'gallery', id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data item ini dari sistem?')) {
      deleteItem(type, id);
    }
  };

  const categories = [
    { id: 'news', label: '📰 Berita Utama', icon: FileText, count: data.news.length },
    { id: 'announcements', label: '📢 Pengumuman', icon: Bookmark, count: data.announcements.length },
    { id: 'blogs', label: '✍️ Blog Guru', icon: Sparkles, count: data.blogs.length },
    { id: 'facilities', label: '🏢 Fasilitas', icon: Library, count: data.facilities.length },
    { id: 'teachers', label: '👩‍🏫 Guru / Staff', icon: User, count: data.teachers.length },
    { id: 'activities', label: '⚽ Aktivitas / Eskul', icon: Activity, count: data.activities.length },
    { id: 'gallery', label: '🖼️ Galeri Foto', icon: Image, count: data.gallery.length },
    { id: 'logo', label: '🛡️ Logo Sekolah', icon: ShieldCheck, count: customLogo ? 1 : 0 },
    { id: 'layout_settings', label: '⚙️ Tata Letak & Menu', icon: Server, count: 5 },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      localStorage.setItem('sman1losari_admin_logged', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('ID Admin atau Kata Sandi salah! Hubungi Tim IT SMANSALOS.');
    }
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari Sesi Pengelolaan Admin?')) {
      localStorage.removeItem('sman1losari_admin_logged');
      setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto space-y-8" id="admin-login-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Educational Requirements for cPanel, Vercel & CRUD (Lines of explanation) */}
          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black tracking-widest text-[#1E293B] bg-slate-100 px-2.5 py-1 rounded inline-block uppercase">Bimbingan Arsitektur</span>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                Persyaratan Rilis & CRUD Produksi Real
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Aplikasi SMAN 1 Losari ini menggunakan arsitektur <strong className="text-slate-800">React + Vite SPA</strong>. Saat ini, perubahan tambah/edit/hapus data disimpan di <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">localStorage</code> browser Anda secara instan.
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                Agar perubahan data CRUD Anda dapat diakses secara publik oleh seluruh pengguna lewat internet, berikut adalah syarat-syarat produksinya:
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 text-xs leading-relaxed">
                <div className="w-5 h-5 bg-amber-100 rounded-full text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-slate-800">Database Berbasis Server (MySQL / Firestore)</h4>
                  <p className="text-[11px] text-slate-550">
                    Membutuhkan pangkalan data persisten terpusat, seperti relational <strong className="text-slate-700">MySQL</strong> di cPanel / VPS Anda atau NoSQL cloud gratis seperti <strong className="text-slate-700">Firebase Firestore</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-xs leading-relaxed">
                <div className="w-5 h-5 bg-indigo-100 rounded-full text-indigo-800 font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-slate-800">API Backend / Web Service (PHP / Express)</h4>
                  <p className="text-[11px] text-slate-550">
                    React tidak boleh tersambung langsung ke database demi aspek keamanan. Diperlukan skrip perantara seperti <strong className="text-slate-700">API PHP (koneksi PDO)</strong> pada hosting cPanel Anda untuk memproses query SQL <code className="bg-slate-100 px-1 py-0.5 text-[10px] rounded font-mono">INSERT/UPDATE/DELETE</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-xs leading-relaxed">
                <div className="w-5 h-5 bg-teal-100 rounded-full text-teal-800 font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-slate-800">Tata Cara Deploy di cPanel Hosting</h4>
                  <p className="text-[11px] text-slate-550">
                    Jalankan perintah build lokal, lalu kompres isi folder hasil build yaitu folder <code className="text-emerald-700 font-bold font-mono">dist/</code> menjadi file ZIP. Unggah langsung melalui File Manager cPanel ke dalam folder <strong className="text-slate-800">public_html</strong>. Buat folder <strong className="text-indigo-600 font-mono">/api</strong> berisi file skrip PHP Anda untuk melayani data MySQL.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 flex gap-2 text-[11px] text-amber-800 leading-relaxed">
              <span className="shrink-0 font-bold">💡 Informasi Keamanan:</span>
              <span>Kunci enkripsi API, kredensial password admin mentah, atau akses database SQL wajib ditaruh di sisi server hosting (backend) dan tidak boleh dipaparkan langsung di client-side React demi mencegah peretasan!</span>
            </div>
          </div>

          {/* Right Column: Interactive Login form */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-amber-500 text-slate-900 font-black rounded-full flex items-center justify-center mx-auto shadow-md mb-2">
                <Lock className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="font-black text-md text-white tracking-tight uppercase">Login Administrasi</h3>
              <p className="text-slate-400 text-[11px]">Gerbang Otoritas Utama Pengelolaan Konten SMANSALOS</p>
            </div>

            {loginError && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-2.5 rounded-lg text-xs font-semibold flex items-start gap-1.5 animate-pulse">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">ID Pengguna (Username)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Contoh: admin"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 pl-10 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Kata Sandi (Password)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contoh: admin123"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 pl-10 pr-10 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] cursor-pointer"
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                Verifikasi & Masuk
              </button>
            </form>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 text-[11px] text-slate-400 leading-normal">
              <span className="font-bold text-amber-500 block">🔑 Akun Simulasi Penguji:</span>
              <p>ID Admin: <code className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-white font-mono">admin</code></p>
              <p>Kata Sandi: <code className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-white font-mono">admin123</code></p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="cms-dashboard-container">
      
      {/* 1. Welcoming header with dynamic states */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10" />
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">PUSAT KONTROL CONTENT (CMS)</span>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Pengelolaan Portal Informasi Sekolah</h2>
          <p className="text-slate-500 text-sm max-w-2xl">
            Sesi Aktif: <strong className="text-emerald-600">Administrator SMANSALOS</strong>. Perubahan yang Anda lakukan akan langsung di-sinkronisasikan dan di-update secara real-time ke halaman Demo Website Utama.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer border border-slate-800"
          >
            <LogOut className="w-4 h-4 text-amber-400" />
            Keluar Sesi
          </button>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-650 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer border border-red-200/50"
            title="Kembalikan semua data ke setelan awal pabrikan"
          >
            <RotateCcw className="w-4 h-4 text-red-550" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDE BAR SECTIONS SELECTOR */}
        <div className="lg:col-span-1 space-y-2 bg-white p-4 rounded-2xl border border-slate-200/60 max-h-[500px] overflow-y-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 block mb-3">Daftar Modul Konten</span>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isTabActive = activeSubTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveSubTab(cat.id as any);
                  setEditingId(null);
                  setIsAdding(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-3 text-xs font-bold rounded-xl transition-all text-left cursor-pointer ${
                  isTabActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4.5 h-4.5 ${isTabActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{cat.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isTabActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* DETAILS CRUD BODY CONTENT */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-xs space-y-6">
          
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
              <span>Kelola Data {categories.find(c => c.id === activeSubTab)?.label.split(' ').slice(1).join(' ')}</span>
            </h3>
            
            {!isAdding && !editingId && activeSubTab !== 'logo' && activeSubTab !== 'layout_settings' && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Tambah Baru
              </button>
            )}
          </div>

          {/* DYNAMIC FORMS FOR CREATING / ADDING DATA */}
          {(isAdding || editingId) && activeSubTab !== 'logo' && activeSubTab !== 'layout_settings' && (
            <div className="p-5 bg-slate-50 border border-slate-150 rounded-xl space-y-4">
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider text-indigo-600">
                {isAdding ? 'Formulir Tambah Data Baru' : 'Formulir Edit Data Item'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. NEWS FORM FIELDS */}
                {activeSubTab === 'news' && (
                  <>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Judul Berita</label>
                      <input 
                        type="text" 
                        value={newsForm.title} 
                        onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                        placeholder="Masukkan judul artikel berita..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.55">
                      <label className="text-xs font-bold text-slate-700">Kategori</label>
                      <select 
                        value={newsForm.category}
                        onChange={e => setNewsForm({...newsForm, category: e.target.value as any})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="Berita">Berita Utama</option>
                        <option value="Pengumuman">Pengumuman Terkini</option>
                        <option value="Prestasi">Prestasi Karya</option>
                        <option value="Eskul">Ekstrakurikuler</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Tanggal Posting</label>
                      <input 
                        type="text" 
                        value={newsForm.date} 
                        onChange={e => setNewsForm({...newsForm, date: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Foto Ilustrasi URL</label>
                      <input 
                        type="text" 
                        value={newsForm.imageUrl} 
                        onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})}
                        placeholder="https://images.unsplash.com/..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Deskripsi / Ringkasan</label>
                      <textarea 
                        rows={3}
                        value={newsForm.excerpt} 
                        onChange={e => setNewsForm({...newsForm, excerpt: e.target.value})}
                        placeholder="Tuliskan ringkasan singkat isi berita..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 2. ANNOUNCEMENTS FORM */}
                {activeSubTab === 'announcements' && (
                  <>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Pengumuman / Memo</label>
                      <input 
                        type="text" 
                        value={announcementForm.title} 
                        onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})}
                        placeholder="Contoh: Seleksi SPMB Gelombang II Dibuka"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Tanggal / Deadline</label>
                      <input 
                        type="text" 
                        value={announcementForm.date} 
                        onChange={e => setAnnouncementForm({...announcementForm, date: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Label Warna</label>
                      <select 
                        value={announcementForm.type}
                        onChange={e => setAnnouncementForm({...announcementForm, type: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="Penting">Penting (Merah)</option>
                        <option value="Ujian">Ujian (Emas)</option>
                        <option value="Layanan">Layanan (Biru)</option>
                        <option value="Umum">Umum (Slate)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 3. BLOGS FORM */}
                {activeSubTab === 'blogs' && (
                  <>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Judul Artikel Blog Guru</label>
                      <input 
                        type="text" 
                        value={blogForm.title} 
                        onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                        placeholder="Misal: Pendidikan Cirebonan dan Karakter Maritim..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Penulis (Guru)</label>
                      <input 
                        type="text" 
                        value={blogForm.author} 
                        onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                        placeholder="Contoh: Drs. Suwito, M.Pd"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Tanggal Rilis</label>
                      <input 
                        type="text" 
                        value={blogForm.date} 
                        onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 4. FACILITIES FORM */}
                {activeSubTab === 'facilities' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Sarana / Fasilitas</label>
                      <input 
                        type="text" 
                        value={facilityForm.name} 
                        onChange={e => setFacilityForm({...facilityForm, name: e.target.value})}
                        placeholder="Contoh: Perpustakaan Digital Cerdas"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Gambar Ilustrasi Fasilitas URL</label>
                      <input 
                        type="text" 
                        value={facilityForm.imageUrl} 
                        onChange={e => setFacilityForm({...facilityForm, imageUrl: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Ulasan Singkat Deskripsi</label>
                      <textarea 
                        rows={3}
                        value={facilityForm.description} 
                        onChange={e => setFacilityForm({...facilityForm, description: e.target.value})}
                        placeholder="Gambarkan fungsi fasilitas ke siswa..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 5. TEACHERS FORM */}
                {activeSubTab === 'teachers' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Lengkap Guru / Staf</label>
                      <input 
                        type="text" 
                        value={teacherForm.name} 
                        onChange={e => setTeacherForm({...teacherForm, name: e.target.value})}
                        placeholder="Contoh: Drs. Setiadi, M.Pd"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Mata Pelajaran Utama</label>
                      <input 
                        type="text" 
                        value={teacherForm.subject} 
                        onChange={e => setTeacherForm({...teacherForm, subject: e.target.value})}
                        placeholder="Contoh: Sejarah Indonesia, Biologi"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Jabatan Akademik / Wali Kelas</label>
                      <input 
                        type="text" 
                        value={teacherForm.role} 
                        onChange={e => setTeacherForm({...teacherForm, role: e.target.value})}
                        placeholder="Contoh: Wali Kelas 11B • Guru Sosiologi"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Foto Formal URL</label>
                      <input 
                        type="text" 
                        value={teacherForm.imageUrl} 
                        onChange={e => setTeacherForm({...teacherForm, imageUrl: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 6. ACTIVITIES FORM */}
                {activeSubTab === 'activities' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Kegiatan / Klub Eskul</label>
                      <input 
                        type="text" 
                        value={activityForm.title} 
                        onChange={e => setActivityForm({...activityForm, title: e.target.value})}
                        placeholder="Contoh: Pramuka Penegak Bantara"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Jadwal Aktif</label>
                      <input 
                        type="text" 
                        value={activityForm.date} 
                        onChange={e => setActivityForm({...activityForm, date: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Kategori</label>
                      <input 
                        type="text" 
                        value={activityForm.category} 
                        onChange={e => setActivityForm({...activityForm, category: e.target.value})}
                        placeholder="Olahraga, Seni, Akademik..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">URL Foto Ekskul</label>
                      <input 
                        type="text" 
                        value={activityForm.imageUrl} 
                        onChange={e => setActivityForm({...activityForm, imageUrl: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 7. GALLERY FORM */}
                {activeSubTab === 'gallery' && (
                  <>
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Keterangan Foto</label>
                      <input 
                        type="text" 
                        value={galleryForm.title} 
                        onChange={e => setGalleryForm({...galleryForm, title: e.target.value})}
                        placeholder="Deskripsikan momen yang tertangkap di foto..."
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Kategori Galeri</label>
                      <select 
                        value={galleryForm.tag}
                        onChange={e => setGalleryForm({...galleryForm, tag: e.target.value as any})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="akademik">Kegiatan Akademik (akademik)</option>
                        <option value="eskul">Ekstrakurikuler (eskul)</option>
                        <option value="fasilitas">Lingkungan & Fasilitas (fasilitas)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">URL Gambar</label>
                      <input 
                        type="text" 
                        value={galleryForm.img} 
                        onChange={e => setGalleryForm({...galleryForm, img: e.target.value})}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* ACTION CONTROL BUTTON FLOWS */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-250">
                <button
                  type="button"
                  onClick={() => isAdding ? handleCreate(activeSubTab) : saveEdit(activeSubTab)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setIsAdding(false);
                  }}
                  className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-755 font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  Batalkan
                </button>
              </div>

            </div>
          )}

          {/* RENDERING CURRENT DATA LIST FOR EACH ACTIVE SECTION */}
          {!isAdding && !editingId && activeSubTab !== 'logo' && activeSubTab !== 'layout_settings' && (
            <div className="space-y-3" id="cms-item-records-holder">
              
              {/* If section is empty */}
              {data[activeSubTab as keyof typeof data].length === 0 && (
                <div className="text-center p-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                  Tidak ada data untuk modul ini. Silakan klik "Tambah Baru" untuk mengisinya kembali.
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {(data[activeSubTab as keyof typeof data] as any[]).map((item: any) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-150 p-4 rounded-xl hover:bg-slate-50 transition-colors gap-4 bg-white"
                  >
                    
                    {/* Visual representative for record */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {(item.imageUrl || item.img) && (
                        <img 
                          src={item.imageUrl || item.img} 
                          alt="" 
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                        />
                      )}
                      
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">{item.title || item.name}</h4>
                        
                        {/* Subtexts depending on models */}
                        <div className="flex items-center gap-3 text-[10px] text-slate-450 font-semibold font-mono uppercase">
                          {item.date && (
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.date}</span>
                          )}
                          {item.role && (
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.role}</span>
                          )}
                          {item.subject && (
                            <span className="text-indigo-600">Maple: {item.subject}</span>
                          )}
                          {item.category && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{item.category}</span>
                          )}
                          {item.type && (
                            <span className={`px-2 py-0.5 rounded-full ${
                              item.type === 'Penting' ? 'bg-red-100 text-red-800' :
                              item.type === 'Ujian' ? 'bg-amber-100 text-amber-800' :
                              item.type === 'Layanan' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>{item.type}</span>
                          )}
                          {item.author && (
                            <span className="text-indigo-600">Oleh: {item.author}</span>
                          )}
                          {item.tag && (
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{item.tag}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => startEdit(item.id, activeSubTab as any)}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-100 hover:border-indigo-100"
                        title="Edit data item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(activeSubTab as any, item.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-100 hover:border-red-100"
                        title="Hapus data item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {activeSubTab === 'logo' && (
            <div className="space-y-6" id="logo-manager-panel">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between animate-fadeIn">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-slate-200 rounded-full flex items-center justify-center p-2 shadow-xs shrink-0">
                    <Sman1LosariLogo size="xl" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-sm">Logo Aktif Saat Ini</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {customLogo 
                        ? 'Menggunakan logo kustom yang diunggah oleh administrator.' 
                        : 'Menggunakan lambang vektor SVG bawaan resmi SMAN 1 Losari.'}
                    </p>
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${customLogo ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                      {customLogo ? 'Logo Kustom' : 'Logo Bawaan'}
                    </span>
                  </div>
                </div>
                {customLogo && (
                  <button
                    onClick={handleLogoDelete}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-650 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all border border-red-200 cursor-pointer text-center"
                  >
                    <Trash2 className="w-4 h-4" /> Hapus Logo Kustom
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Opsi 1: Upload File Gambar */}
                <div className="border border-slate-200/80 p-5 rounded-2xl bg-white space-y-4 shadow-3xs">
                  <div className="space-y-1">
                    <h5 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-indigo-600" />
                      Opsi 1: Unggah Gambar Baru
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Pilih file logo baru berformat PNG, JPEG, atau WebP dari komputer Anda.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50 transition-colors p-6 rounded-xl cursor-pointer text-center group">
                      <span className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5 text-indigo-600" />
                      </span>
                      <span className="text-xs font-bold text-slate-700 mt-2 block">Pilih File Logo</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Format persegi (misal: 500x500px)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                {/* Opsi 2: URL Link Gambar */}
                <div className="border border-slate-200/80 p-5 rounded-2xl bg-white space-y-4 shadow-3xs">
                  <div className="space-y-1">
                    <h5 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Image className="w-4 h-4 text-emerald-600" />
                      Opsi 2: Pasang dari Tautan URL
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Tentukan alamat URL absolut dari gambar eksternal yang ada di internet.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <input 
                        type="url" 
                        id="logo-url-input"
                        placeholder="Contoh: https://example.com/logo.png"
                        className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('logo-url-input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          handleLogoUrlChange(input.value.trim());
                        } else {
                          alert('Silakan masukkan url gambar yang valid!');
                        }
                      }}
                      className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Pasang dari URL
                    </button>
                  </div>
                </div>

              </div>
              
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-2 text-[11px] text-amber-800 leading-relaxed">
                <span className="shrink-0 font-bold">💡 Catatan Sinkronisasi:</span>
                <span>Perubahan logo di atas akan langsung diperbarui di seluruh bagian header website SMAN 1 Losari, panel dashboard admin, dan footer secara dinamis. Menghapus logo kustom akan memulihkan lambang vektor bawaan.</span>
              </div>
            </div>
          )}

          {activeSubTab === 'layout_settings' && (
            <div className="space-y-6 animate-fadeIn" id="layout-settings-panel">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-650 rounded-xl">
                    <Server className="w-5 h-5 text-indigo-600" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Pengaturan Visibilitas Halaman Utama</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Sembunyikan atau tampilkan modul bagian tertentu dari website SMAN 1 Losari sesuai kebutuhan dinamis sekolah.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'sman1losari_show_quotes',
                    title: '💬 Kutipan Inspiratif Mingguan',
                    desc: 'Kutipan motivasi mingguan dari tokoh ternama (seperti Socrates) di atas daftar guru.',
                    value: showQuotes,
                    setter: setShowQuotes
                  },
                  {
                    key: 'sman1losari_show_teachers',
                    title: '👩‍🏫 Profil Guru & Tenaga Pendidik',
                    desc: 'Daftar biodata ringkas guru SMAN 1 Losari beserta mata pelajaran yang diampu.',
                    value: showTeachers,
                    setter: setShowTeachers
                  },
                  {
                    key: 'sman1losari_show_gallery',
                    title: '🖼️ Galeri Foto Aktivitas Kampus',
                    desc: 'Madding visual yang menampilkan pameran dokumentasi kegiatan belajar atau fasilitas.',
                    value: showGallery,
                    setter: setShowGallery
                  },
                  {
                    key: 'sman1losari_show_activities',
                    title: '⚽ Ruang Diversifikasi / Aktivitas Siswa',
                    desc: 'Publikasi visual program ekstrakurikuler serta klub olahraga aktif di halaman utama.',
                    value: showActivities,
                    setter: setShowActivities
                  },
                  {
                    key: 'sman1losari_show_maps',
                    title: '📍 Peta Lokasi Google Maps',
                    desc: 'Sematkan koordinat peta interaktif SMAN 1 Losari di dalam area footer bawah website.',
                    value: showMaps,
                    setter: setShowMaps
                  }
                ].map((item) => (
                  <div 
                    key={item.key} 
                    className="border border-slate-200 rounded-2xl p-5 bg-white flex items-center justify-between shadow-xs hover:border-slate-350 transition-colors gap-4"
                  >
                    <div className="space-y-1 max-w-[80%]">
                      <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm">{item.title}</h5>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed pr-1">
                        {item.desc}
                      </p>
                      <span className={`inline-block text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full mt-1.5 ${item.value ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-slate-100 text-slate-400'}`}>
                        {item.value ? '● TAMPIL' : '○ DISEMBUNYIKAN'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting(item.key, item.value, item.setter)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.value ? 'bg-indigo-600' : 'bg-slate-250'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          item.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-2 text-[11px] text-amber-805 leading-relaxed">
                <span className="shrink-0 font-bold">💡 Informasi Real-time:</span>
                <span>Visibilitas bagian ini akan langsung disinkronkan secara instan ketiadaan atau keberadaannya di dalam iframe demo website sebelah kanan tanpa perlu memuat ulang keseluruhan halaman (hot-swapping).</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
