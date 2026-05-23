import { useState, useEffect } from 'react';
import { NewsItem, TeacherItem, FacilityItem, ActivityItem } from '../types';

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

export interface BlogItem {
  id: string;
  title: string;
  author: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: 'akademik' | 'eskul' | 'fasilitas';
  img: string;
}

export interface SchoolData {
  news: NewsItem[];
  announcements: AnnouncementItem[];
  blogs: BlogItem[];
  facilities: FacilityItem[];
  activities: ActivityItem[];
  teachers: TeacherItem[];
  gallery: GalleryItem[];
}

const INITIAL_DATA: SchoolData = {
  news: [
    {
      id: 'news-1',
      title: 'Ekosistem Pendidikan Digital melalui Sinergi Kemendikbudristek dan Pemerintah Daerah',
      date: 'Kamis, 30 Mei 2026',
      category: 'Berita',
      excerpt: 'SMAN 1 Losari terpilih sebagai pusat uji coba integrasi portal belajar pintar guna memperlancar penyaluran materi ajar kurikulum mandiri.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'news-2',
      title: 'Tinjau Kesiapan SPMB, Plh. Kepala Dinas Pendidikan Provinsi Kunjungi SMAN 1 Losari',
      date: 'Rabu, 29 Mei 2026',
      category: 'Pengumuman',
      excerpt: 'Kunjungan formal guna meninjau kelengkapan server dan panitia ad-hoc demi menjamin keadilan pendaftaran siswa baru wilayah perbatasan Cirebon.',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
    }
  ],
  announcements: [
    { id: 'ann-1', title: 'Linimasa Simulasi Kompetensi TKA Terpadu Mandiri 2026', date: 'Mulai 1 November 2026', type: 'Penting' },
    { id: 'ann-2', title: 'Pembukaan Pendaftaran Seleksi Masuk Perguruan Tinggi (SPMB) Tahap I', date: 'Terbit 19 Mei 2026', type: 'Ujian' },
    { id: 'ann-3', title: 'Penerimaan Berkas Kartu Indonesia Pintar (KIP) Sekolah', date: 'Selesai 15 Juni 2026', type: 'Layanan' }
  ],
  blogs: [
    { id: 'blog-1', title: 'Menggali Filosofi Pendidikan Cirebonan: Sinergi Adab dan Sains Modern', author: 'Faturrochman, S.Pd', date: '11 Juli 2026' },
    { id: 'blog-2', title: 'Metodologi Heuristik dalam Eksperimen Fisika Sederhana', author: 'Nur Rosalina, M.Si', date: '30 Juni 2026' },
    { id: 'blog-3', title: 'Menumbuhkan Kepercayaan Diri Siswa melalui Panggung Teater', author: 'Yayun Ciuss, S.Pd', date: '18 Juni 2026' }
  ],
  facilities: [
    {
      id: 'fac-1',
      name: 'Masjid At-Taqwa SMAN 1 Losari',
      description: 'Pusat pembinaan IMTAK siswa yang bersih, luas, dan representatif dengan hembusan udara alami.',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'fac-2',
      name: 'Pusat Laboratorium Bahasa Digital',
      description: 'Layanan audio mutakhir terkomputerisasi guna latihan listening & speaking siswa menyambut sertifikasi global.',
      imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'fac-3',
      name: 'Sport Center & Lapangan Basket',
      description: 'Kompleks olahraga luar ruangan dengan standard permukaan solid demi keselamatan bermain para atlet sekolah.',
      imageUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=600'
    }
  ],
  activities: [
    { id: 'act-1', title: 'Ekstrakurikuler Seni Teater / Seni Peran', date: 'Aktif Sabtuan', category: 'Seni', imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=400' },
    { id: 'act-2', title: 'Klub Sepak Bola SMAN 1 Losari', date: 'Latihan Rutin', category: 'Olahraga', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400' },
    { id: 'act-3', title: 'Cheerleaders & Seni Dance Modern', date: 'Pendukung Liga', category: 'Seni', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400' }
  ],
  teachers: [
    { id: 't-1', name: 'Mardiana, S.Pd', role: 'Wali Kelas 10A • Bahasa Indonesia', subject: 'Bahasa Indonesia', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300' },
    { id: 't-2', name: 'Nur Rosalina, M.Pd', role: 'Guru Fisika Senior • Kelas 12', subject: 'Fisika Eksperimental', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300' },
    { id: 't-3', name: 'Faturrochman, S.Si', role: 'Guru Geografi Inteligent • Kelas 10', subject: 'Geometris Sistem', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' },
    { id: 't-4', name: 'Meilani Safitri, M.Hum', role: 'Guru Kelas 10 • Sejarah & Seni Budaya', subject: 'Sejarah Kebudayaan', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300' },
    { id: 't-5', name: 'Yayun Ciuss, S.Sn', role: 'Pembina Utama Teater SMAN 1 Losari', subject: 'Seni Pertunjukan', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
    { id: 't-6', name: 'Mutia Andini, M.Biomed', role: 'Wali Kelas 11 • Biologi Terapan', subject: 'Sains Genetika', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300' },
  ],
  gallery: [
    { id: 'gal-1', title: 'Praktik Medis & PMR', tag: 'akademik', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-2', title: 'Kreativitas Mading Elektronik', tag: 'akademik', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-3', title: 'Pengembangan Bakat Siswa', tag: 'eskul', img: 'https://images.unsplash.com/photo-1520156473397-031e18d6c3c5?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-4', title: 'Kumpulan Buku & Lab Mandiri', tag: 'fasilitas', img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-5', title: 'Turnamen Futsal Antar-Sekolah', tag: 'eskul', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-6', title: 'Uji Eksperimen Seni Musik', tag: 'eskul', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-7', title: 'Perkemahan Bakti Penegak Pramuka', tag: 'eskul', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400' },
    { id: 'gal-8', title: 'Siswa Berkolaborasi Memecahkan Rumus', tag: 'akademik', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400' }
  ]
};

const STORAGE_KEY = 'sman1losari_school_data';

// Custom listener system so multiple components synchronized in real-time
const listeners: Set<() => void> = new Set();

export function getStoredSchoolData(): SchoolData {
  if (typeof window === 'undefined') return INITIAL_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading localStorage data:', error);
    return INITIAL_DATA;
  }
}

export function saveStoredSchoolData(data: SchoolData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Trigger custom listeners
    listeners.forEach(listener => listener());
  } catch (error) {
    console.error('Error saving localStorage data:', error);
  }
}

export function resetStoredSchoolData(): SchoolData {
  saveStoredSchoolData(INITIAL_DATA);
  return INITIAL_DATA;
}

export function useSchoolData() {
  const [data, setData] = useState<SchoolData>(() => getStoredSchoolData());

  useEffect(() => {
    const handleChange = () => {
      setData(getStoredSchoolData());
    };
    
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const updateSection = <K extends keyof SchoolData>(key: K, list: SchoolData[K]) => {
    const current = getStoredSchoolData();
    current[key] = list;
    saveStoredSchoolData(current);
  };

  const addItem = <K extends keyof SchoolData>(key: K, item: SchoolData[K][number]) => {
    const current = getStoredSchoolData();
    // Ensure item has ID, if not generated
    if (!item.id) {
      item.id = `${key}-${Date.now()}`;
    }
    current[key] = [...current[key], item] as any;
    saveStoredSchoolData(current);
  };

  const editItem = <K extends keyof SchoolData>(key: K, id: string, updatedFields: Partial<SchoolData[K][number]>) => {
    const current = getStoredSchoolData();
    current[key] = current[key].map((item: any) => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    }) as any;
    saveStoredSchoolData(current);
  };

  const deleteItem = <K extends keyof SchoolData>(key: K, id: string) => {
    const current = getStoredSchoolData();
    current[key] = current[key].filter((item: any) => item.id !== id) as any;
    saveStoredSchoolData(current);
  };

  return {
    data,
    updateSection,
    addItem,
    editItem,
    deleteItem,
    resetToDefault: resetStoredSchoolData
  };
}
