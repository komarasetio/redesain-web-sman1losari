/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  FileText, 
  Award, 
  Users, 
  Trophy, 
  Bell, 
  ArrowRight, 
  Share2, 
  Play, 
  Pause, 
  Compass, 
  Activity, 
  ArrowUpRight, 
  Heart, 
  MessageCircle,
  Hash,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem, TeacherItem, FacilityItem, ActivityItem, AgendaItem } from '../types';
import Sman1LosariLogo from './Sman1LosariLogo';
import { useSchoolData } from '../lib/schoolDataStore';

// Bilingual Static Translations Dictionary
const translations = {
  id: {
    spmbOpen: "SPMB SMAN 1 Losari TA 2026/2027 Telah Resmi Dibuka!",
    phone: "Tlp",
    timeLocal: "Waktu Lokal",
    alumni: "Alumni",
    library: "Perpustakaan",
    learning: "E-Learning",
    home: "Beranda",
    profile: "Profil",
    visimisi: "Visi & Misi SMAN 1 Losari",
    visimisiSub: "Prinsip panduan akademik utama",
    sambutan: "Sambutan Kepala Sekolah",
    sambutanSub: "Pesan Nining Mulyati, S.E., M.Si.",
    teachers: "Jajaran Guru",
    teachersSub: "Direktori tenaga kependidikan",
    academicLink: "Akademik",
    kesiswaan: "Kesiswaan",
    facilities: "Fasilitas",
    contact: "Kontak",
    search: "Cari disini...",
    portalSpmb: "PORTAL SPMB",
    qualityEducation: "Pendidikan Berkualitas Global Cirebonan",
    heroTitle1: "Membangun Generasi",
    heroTitle2: "Unggul & Berkarakter",
    heroDesc: "Kami berkomitmen menyediakan lingkungan belajar inklusif, inovatif, dan berprestasi tingkat nasional guna mencetak pemimpin masa depan berakhlak mulia di pesisir utara SMAN 1 Losari.",
    registerNow: "Daftar SPMB Sekarang",
    virtualTour: "Tur Virtual Kampus",
    studentDoc: "DOKUMENTASI SISWA",
    diversification: "RUANG DIVERSIFIKASI KEGIATAN",
    docDesc: "Upacara Kebangkitan Nasional & Demonstrasi Kolosal Kreasi Seni Daerah SMAN 1 Losari",
    activeSiswa: "Siswa Aktif",
    accreditation: "Akreditasi BAN-SM",
    runningNews: "Info Kilat",
    newsTicker1: "🔊 Pendaftaran Siswa baru jalur Zonasi SPMB dibuka tanggal 01 - 10 Juni 2026. Siapkan berkas administratif Anda",
    newsTicker2: "📅 Raport Semester Genap akan dibagikan serentak tanggal 20 Juni 2026",
    newsTicker3: "🏆 SMAN 1 Losari menyabet Juara I Lomba Teater Remaja se-Kabupaten Cirebon! Berjaya SMANSALOS!",
    latestNews: "BERITA TERKINI",
    newsTitle: "Kanal Berita & Visi Utama",
    newsDesc: "Informasi otentik seputar kegiatan, laporan humas, dan filosofi mendasar SMAN 1 Losari.",
    characterMain: "Karakter Utama",
    readMore: "Selengkapnya",
    visiExcerpt: '"Unggul dalam prestasi, luhur dalam iman dan taqwa, mandiri, peduli lingkungan, serta berkebhinekaan global menuju kancah internasional."',
    visiLead: "Visi SMAN 1 Losari",
    misiLead: "Misi Utama",
    quoteWelcoming: "SAMBUTAN HANGAT",
    quoteWelcomeDesc: '"Mendidik generasi berafiliasi luhur dengan integrasi sains dan teknologi masa depan. Di SMAN 1 Losari, kami berkomitmen merawat mimpi, membina akhlak mulia siswa pesisir utara Cirebon."',
    principalName: "Nining Mulyati, S.E., M.Si.",
    principalTitle: "Kepala SMAN 1 Losari",
    quoteWelcomingTitle: "Kolom Editorial Utama",
    close: "Tutup",
    agendaSpmb: "Agenda & Layanan SPMB",
    agendaSub: "Kelayakan kalender ujian, syarat admin, dan jadwal penyerahan berkas fisik.",
    exploreSchool: "Eksplorasi SMAN 1 Losari",
    exploreSchoolSub: "Dua belas s/d dua puluh empat kriteria ruang belajar, laboratorium, dan klaster kegiatan penunjang minat bakat siswa.",
    allTitle: "Semua",
    curriculumUnit: "Kurikulum Merdeka",
    studentStatus: "Kategori Siswa",
    schoolFacility: "Prasarana Fisik",
    teachersRoster: "Direktori Guru & Pendidik",
    teachersRosterSub: "Guru-guru berdedikasi tinggi dengan kualifikasi standar akademik nasional Jawa Barat.",
    testimonialHeader: "Apa Kata Mereka?",
    testimonialHeaderSub: "Aspirasi jujur, testimoni tulus, dan harapan terbaik dari para alumni serta jajaran tokoh pendidik.",
    activeSiswaCount: "1,400+",
    interactivePoll: "Jajak Pendapat Publik (Interactive Poll)",
    pollQuestion: "Menurut Anda, elemen fasilitas apa yang paling mendesak untuk dikembangkan di SMAN 1 Losari?",
    pollA1: "Modernisasi Laboratorium Bahasa & Komputer",
    pollA2: "Penambahan Koleksi Buku Perpustakaan Digital (E-Library)",
    pollA3: "Perluasan Fasilitas Olahraga & Outdoor Sport Center",
    pollA4: "Pembinaan Intensif Klub Seni Budaya & Teater",
    votePls: "Pilih salah satu opsi untuk memberikan suara Anda secara interaktif!",
    voteSucceed: "Terima kasih atas partisipasi Anda! Suara Anda sangat berharga bagi peningkatan sarana.",
    voteSummary: "Persentase Suara Sementara",
    voteTotal: "Total suara masuk",
    ta2026: "Tahun Ajaran 2026/2027",
    taActive: "Aktif",
    beritaTab: "Berita",
    pengumumanTab: "Pengumuman",
    blogTab: "Blog Guru",
    fasilitasTab: "Fasilitas",
    hubungiKami: "Hubungi Kami (Lokasi SMAN 1 Losari)",
    operationalHours: "Jam Operasional Kantor",
    monFri: "Senin - Jumat: 07:00 - 15:30 WIB",
    satSun: "Sabtu & Minggu: Libur (Kecuali Eskul)",
    contactDesc: "Silakan hubungi kami untuk informasi pendaftaran, layanan administrasi, atau kunjungan sekolah langsung di alamat resmi.",
    addressComplete: "Jl. Jenderal Sudirman No. 1, Losari Kidul, Kec. Losari, Kabupaten Cirebon, Jawa Barat 45192",
    watchVideo: "Tonton Profil SMAN 1 Losari",
    watchVideoDesc: "Kisah inspiratif, tinjauan sudut laboratorium bahasa, masjid megah, dan penayangan panggung teater siswa kami yang fenomenal.",
    duration: "Durasi: 5:42 Menit",
    officialRelease: "Rilis Resmi Sekolah",
    playbackStreaming: "Memutarkan Profil SMANSALOS Streaming...",
    contactTeacher: "Hubungi Guru",
    schoolDesc: "SMA Negeri 1 Losari merupakan bagian dari akselerasi kecakapan literasi digital and prestasi akademik di Kabupaten Cirebon, Jawa Barat.",
    allMading: "🖼️ Semua Mading",
    academicPmr: "🥼 Akademik & PMR",
    extraCurricular: "⚽ Ekstrakurikuler",
    independentLearn: "🏫 Belajar Mandiri",
    zoomAct: "Zoom Aktivitas",
    galKampus: "GALERI KAMPUS",
    galKampusDesc: "Momen nyata dari berbagai kegiatan olahraga, kesenian, dan kecakapan akademik siswa SMAN 1 Losari.",
    quoteInspiratif: "KUTIPAN INSPIRATIF MINGGU INI",
    editorialKolom: "Kolom Editorial Utama",
    schoolVids: "Profil Sekolah Interaktif",
    latestBerita: "Kanal Berita & Visi Utama",
    tautDir: "Tautan Direktori",
    lokSek: "Lokasi Sekolah",
    searchPlholder: "Cari disini...",
    virtualVirtual: "Tur Virtual Kampus",
    tabResourceHub: "TAB RESOURCE HUB PINTAR",
    tabResourceDesc: "Informasi terpilah rapi, mengurangi beban tinggi halaman website.",
    downloadPdf: "Unduh Berkas PDF",
    catatGuru: "Catatan Guru",
    madingAktivitas: "Dokumentasi Aktivitas Siswa"
  },
  en: {
    spmbOpen: "SPMB SMAN 1 Losari Admission FY 2026/2027 is Now Officially Open!",
    phone: "Tel",
    timeLocal: "Local Time",
    alumni: "Alumni",
    library: "Library",
    learning: "E-Learning",
    home: "Home",
    profile: "Profile",
    visimisi: "Vision & Mission of SMAN 1 Losari",
    visimisiSub: "Core academic principles and guidelines",
    sambutan: "Principal Welcoming Speech",
    sambutanSub: "Message from Nining Mulyati, S.E., M.Si.",
    teachers: "Teaching Staff",
    teachersSub: "Directory of academic educators",
    academicLink: "Academics",
    kesiswaan: "Student Affairs",
    facilities: "Facilities",
    contact: "Contact Us",
    search: "Search here...",
    portalSpmb: "SPMB PORTAL",
    qualityEducation: "Cirebonan Global Quality Education",
    heroTitle1: "Empowering Outstanding",
    heroTitle2: "Generations of Character",
    heroDesc: "We are committed to providing an inclusive, innovative, and nationally accomplished learning environment to foster future virtuous leaders on the northern coast of SMAN 1 Losari.",
    registerNow: "Register SPMB Now",
    virtualTour: "Campus Virtual Tour",
    studentDoc: "STUDENT DOCUMENTATION",
    diversification: "DIVERSIFIED SPACE OF ACTIVITIES",
    docDesc: "National Awakening Ceremony & Regional Art Creations Showcase at SMAN 1 Losari",
    activeSiswa: "Active Students",
    accreditation: "BAN-SM A-Accredited",
    runningNews: "Flash News",
    newsTicker1: "🔊 Zoning-based SPMB Student Registration is open from June 1-10, 2026. Prepare your documents",
    newsTicker2: "📅 Even Semester Report Cards distribution is scheduled for June 20, 2026",
    newsTicker3: "🏆 SMAN 1 Losari wins 1st Prize in Cirebon Youth Theater Competition! Glory to SMANSALOS!",
    latestNews: "LATEST NEWS",
    newsTitle: "News & Core Vision Channel",
    newsDesc: "Authentic information about activities, public relations updates, and core philosophies of SMAN 1 Losari.",
    characterMain: "Core Character",
    readMore: "Read More",
    visiExcerpt: '"Outstanding in achievement, virtuous in faith and piety, independent, environmental-friendly, and globally diverse toward international stage."',
    visiLead: "SMAN 1 Losari Vision",
    misiLead: "Core Missions",
    quoteWelcoming: "WARM WELCOMING",
    quoteWelcomeDesc: '"Educating generations with high-integrity through the integration of modern science and future technology. At SMAN 1 Losari, we cherish dreams and nurture noble character of coastline students."',
    principalName: "Nining Mulyati, S.E., M.Si.",
    principalTitle: "Principal of SMAN 1 Losari",
    quoteWelcomingTitle: "Core Editorial Column",
    close: "Close",
    agendaSpmb: "SPMB Schedule & Services",
    agendaSub: "View exam dates, administrative requirements, and physical document submission timelines.",
    exploreSchool: "Explore SMAN 1 Losari",
    exploreSchoolSub: "Discover classroom sizes, computer labs, and activity clusters that support student achievements.",
    allTitle: "All",
    curriculumUnit: "Independent Curriculum",
    studentStatus: "Student Category",
    schoolFacility: "Physical Facilities",
    teachersRoster: "Educators & Teachers Directory",
    teachersRosterSub: "Highly dedicated teachers holding National Academic standard certifications in West Java.",
    testimonialHeader: "What They Say",
    testimonialHeaderSub: "Honest feedback, warm testimonials, and top aspirations from alumni and educational figures.",
    activeSiswaCount: "1,400+",
    interactivePoll: "Public Interactive Poll",
    pollQuestion: "In your opinion, which school facility is the most urgent to develop at SMAN 1 Losari?",
    pollA1: "Modernization of Language & Computer Labs",
    pollA2: "Expanding Digital Library Book Collections (E-Library)",
    pollA3: "Expansion of Sports Facilities & Outdoor Sport Center",
    pollA4: "Intensive training for Art, Culture, and Theater Club",
    votePls: "Select one of the options to vote interactively!",
    voteSucceed: "Thank you for participating! Your feedback is highly valuable for planning facility improvements.",
    voteSummary: "Current Poll Results",
    voteTotal: "Total votes registered",
    ta2026: "Academic Year 2026/2027",
    taActive: "Active",
    beritaTab: "News",
    pengumumanTab: "Announcements",
    blogTab: "Teacher Blog",
    fasilitasTab: "Facilities",
    hubungiKami: "Contact Us (SMAN 1 Losari Location)",
    operationalHours: "Office Working Hours",
    monFri: "Monday - Friday: 07:00 - 15:30 WIB",
    satSun: "Saturday & Sunday: Closed (Except Extra Activities)",
    contactDesc: "Please contact us for admission details, administrative inquiries, or direct school registration.",
    addressComplete: "Jl. Jenderal Sudirman No. 1, Losari Kidul, Losari, Cirebon Regency, West Java 45192",
    watchVideo: "Watch SMAN 1 Losari Profile",
    watchVideoDesc: "Inspirational stories, a tour of digital language labs, the magnificent mosque, and our phenomenal student-theater performances.",
    duration: "Duration: 5:42 Mins",
    officialRelease: "Official School Release",
    playbackStreaming: "Playing SMANSALOS Streaming Profile...",
    contactTeacher: "Contact Teacher",
    schoolDesc: "SMA Negeri 1 Losari stands as an integral part of digital literacy acceleration and academic excellence in Cirebon Regency, West Java.",
    allMading: "🖼️ All Boards",
    academicPmr: "🥼 Academic & PMR",
    extraCurricular: "⚽ Extra-curricular",
    independentLearn: "🏫 Self-Study Facility",
    zoomAct: "Zoom Activity",
    galKampus: "CAMPUS GALLERY",
    galKampusDesc: "Real moments from sports, arts, and academic excellence of SMAN 1 Losari students.",
    quoteInspiratif: "INSPIRATIONAL QUOTE OF THE WEEK",
    editorialKolom: "Core Editorial Column",
    schoolVids: "Interactive School Profile",
    latestBerita: "News & Core Vision Channel",
    tautDir: "Directory Links",
    lokSek: "School Location",
    searchPlholder: "Search here...",
    virtualVirtual: "Campus Virtual Tour",
    tabResourceHub: "SMART TAB RESOURCE HUB",
    tabResourceDesc: "Optimized, well-structured resources preventing page bloat.",
    downloadPdf: "Download PDF File",
    catatGuru: "Teacher Note",
    madingAktivitas: "Student Activity Documentation"
  }
};

// Dynamic database content translation dictionary mapping original Indonesian to English
const dynamicTranslations: Record<string, string> = {
  // News
  'Ekosistem Pendidikan Digital melalui Sinergi Kemendikbudristek dan Pemerintah Daerah':
    'Digital Education Ecosystem through Synergy of MoECRT and Regional Government',
  'SMAN 1 Losari terpilih sebagai pusat uji coba integrasi portal belajar pintar guna memperlancar penyaluran materi ajar kurikulum mandiri.':
    'SMAN 1 Losari was chosen as the test center for integrating the smart learning portal to streamline the distribution of Merdeka Curriculum learning school materials.',
  'Tinjau Kesiapan SPMB, Plh. Kepala Dinas Pendidikan Provinsi Kunjungi SMAN 1 Losari':
    'Reviewing SPMB Readiness, Acting Head of West Java Education Department Visits SMAN 1 Losari',
  'Kunjungan formal guna meninjau kelengkapan server dan panitia ad-hoc demi menjamin keadilan pendaftaran siswa baru wilayah perbatasan Cirebon.':
    'A formal visit to inspect server completeness and the ad-hoc committee to ensure fair registration in Cirebon border areas.',
  'Kamis, 30 Mei 2026': 'Thursday, May 30, 2026',
  'Rabu, 29 Mei 2026': 'Wednesday, May 29, 2026',

  // Announcements
  'Linimasa Simulasi Kompetensi TKA Terpadu Mandiri 2026':
    'Timeline for Integrated Independent Entrance Examination (TKA) 2026',
  'Mulai 1 November 2026': 'Starts Nov 1, 2026',
  'Pembukaan Pendaftaran Seleksi Masuk Perguruan Tinggi (SPMB) Tahap I':
    'Opening of Phase I SPMB Student Admission Registration',
  'Terbit 19 Mei 2026': 'Published May 19, 2026',
  'Penerimaan Berkas Kartu Indonesia Pintar (KIP) Sekolah':
    'Submission of Smart Indonesia Card (KIP) School Documents',
  'Selesai 15 Juni 2026': 'Ends June 15, 2026',
  'Penting': 'Urgent',
  'Ujian': 'Exam',
  'Layanan': 'Service',

  // Blogs
  'Menggali Filosofi Pendidikan Cirebonan: Sinergi Adab dan Sains Modern':
    'Exploring Cirebonan Education Philosophy: Synergy of Adab and Modern Science',
  'Metodologi Heuristik dalam Eksperimen Fisika Sederhana':
    'Heuristic Methodology in Simple Physics Experiments',
  'Menumbuhkan Kepercayaan Diri Siswa melalui Panggung Teater':
    'Nurturing Student Self-Confidence through the Theater Stage',
  'Faturrochman, S.Pd': 'Faturrochman, B.Ed',
  'Nur Rosalina, M.Si': 'Nur Rosalina, M.Sc',
  'Yayun Ciuss, S.Pd': 'Yayun Ciuss, B.Ed',

  // Facilities
  'Masjid At-Taqwa SMAN 1 Losari': 'At-Taqwa Mosque of SMAN 1 Losari',
  'Pusat pembinaan IMTAK siswa yang bersih, luas, dan representatif dengan hembusan udara alami.':
    'Centred student spiritual development space that is clean, spacious, and representative with natural ventilation.',
  'Pusat Laboratorium Bahasa Digital': 'Digital Language Laboratory Center',
  'Layanan audio mutakhir terkomputerisasi guna latihan listening & speaking siswa menyambut sertifikasi global.':
    'State-of-the-art computerized audio services for students listening & speaking practice in preparation for global certification.',
  'Sport Center & Lapangan Basket': 'Sport Center & Basketball Court',
  'Kompleks olahraga luar ruangan dengan standard permukaan solid demi keselamatan bermain para atlet sekolah.':
    'Outdoor sports complex with solid surface standards to ensure safety of school athletes.',

  // Activities
  'Ekstrakurikuler Seni Teater / Seni Peran': 'Theater Art / Role Play Extracurricular',
  'Aktif Sabtuan': 'Active on Saturdays',
  'Seni': 'Arts',
  'Klub Sepak Bola SMAN 1 Losari': 'SMAN 1 Losari Football Club',
  'Latihan Rutin': 'Regular Practice',
  'Olahraga': 'Sports',
  'Cheerleaders & Seni Dance Modern': 'Cheerleaders & Modern Dance Art',
  'Pendukung Liga': 'League Supports',

  // Teachers
  'Mardiana, S.Pd': 'Mardiana, B.Ed',
  'Wali Kelas 10A • Bahasa Indonesia': 'Homeroom Teacher 10A • Indonesian Language',
  'Bahasa Indonesia': 'Indonesian',
  'Nur Rosalina, M.Pd': 'Nur Rosalina, M.Ed',
  'Guru Fisika Senior • Kelas 12': 'Senior Physics Teacher • Grade 12',
  'Fisika Eksperimental': 'Experimental Physics',
  'Faturrochman, S.Si': 'Faturrochman, B.Sc',
  'Guru Geografi Inteligent • Kelas 10': 'Intelligent Geography Teacher • Grade 10',
  'Geometris Sistem': 'System Geometry',
  'Meilani Safitri, M.Hum': 'Meilani Safitri, M.A',
  'Guru Kelas 10 • Sejarah & Seni Budaya': 'Grade 10 Teacher • History & Art Culture',
  'Sejarah Kebudayaan': 'Cultural History',
  'Yayun Ciuss, S.Sn': 'Yayun Ciuss, B.A (Arts)',
  'Pembina Utama Teater SMAN 1 Losari': 'Lead Coordinator SMAN 1 Losari Theater Portfolio',
  'Seni Pertunjukan': 'Performing Arts',
  'Mutia Andini, M.Biomed': 'Mutia Andini, M.Biomed',
  'Wali Kelas 11 • Biologi Terapan': 'Homeroom Teacher 11 • Applied Biology',
  'Sains Genetika': 'Genetic Science',

  // Gallery
  'Praktik Medis & PMR': 'Medical & Youth Red Cross Practices',
  'Kreativitas Mading Elektronik': 'Electronic Bulletin Board Innovation',
  'Pengembangan Bakat Siswa': 'Student Talent Development',
  'Kumpulan Buku & Lab Mandiri': 'Library & Independent Study Lab',
  'Turnamen Futsal Antar-Sekolah': 'Inter-School Futsal Tournament',
  'Uji Eksperimen Seni Musik': 'Music Art Experimental Testing',
  'Perkemahan Bakti Penegak Pramuka': 'Scout Rover Dedication Camp',
  'Siswa Berkolaborasi Memecahkan Rumus': 'Collaborative Formula Solving',
};


interface LiveWebsiteDemoProps {
  themeId: string;
  isFullPage?: boolean;
}

export default function LiveWebsiteDemo({ themeId, isFullPage = false }: LiveWebsiteDemoProps) {
  const [lang, setLang] = useState<'id' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sman1losari_lang') as 'id' | 'en') || 'id';
    }
    return 'id';
  });
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Core helper translation function that parses translations and dynamic database strings
  const t = (key: string): string => {
    const currentTranslations = translations[lang] || translations['id'];
    const translated = (currentTranslations as any)[key];
    if (translated) return translated;

    if (lang === 'en') {
      return dynamicTranslations[key] || key;
    }
    return key;
  };

  const handleLangChange = (newLang: 'id' | 'en') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sman1losari_lang', newLang);
    }
    setShowLangDropdown(false);
  };

  const [activeTab, setActiveTab] = useState<'berita' | 'pengumuman' | 'blog' | 'fasilitas'>('berita');
  const [galleryFilter, setGalleryFilter] = useState<'semua' | 'akademik' | 'eskul' | 'fasilitas'>('semua');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showVisiMisi, setShowVisiMisi] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  // Dynamic style parser depending on current theme
  const getThemeStyles = (id: string) => {
    switch (id) {
      case 'academic-teal':
        return {
          textPrimary: 'text-teal-950',
          bgPrimary: 'bg-teal-900',
          bgPrimaryLight: 'bg-teal-50',
          bgPrimaryHover: 'hover:bg-teal-950',
          bgGradient: 'from-teal-900 to-teal-950',
          textAccent: 'text-amber-500',
          bgAccent: 'bg-amber-500',
          bgAccentHover: 'hover:bg-amber-600',
          borderAccent: 'border-amber-500',
          accentTextBg: 'bg-amber-100 text-amber-800',
          primaryHex: '#0F766E',
          accentHex: '#F59E0B'
        };
      case 'heritage-indigo':
        return {
          textPrimary: 'text-indigo-950',
          bgPrimary: 'bg-indigo-900',
          bgPrimaryLight: 'bg-indigo-50',
          bgPrimaryHover: 'hover:bg-indigo-950',
          bgGradient: 'from-indigo-900 to-indigo-950',
          textAccent: 'text-orange-500',
          bgAccent: 'bg-orange-500',
          bgAccentHover: 'hover:bg-orange-600',
          borderAccent: 'border-orange-500',
          accentTextBg: 'bg-orange-100 text-orange-800',
          primaryHex: '#312E81',
          accentHex: '#F97316'
        };
      case 'classic-scholar':
      default:
        return {
          textPrimary: 'text-slate-950',
          bgPrimary: 'bg-slate-900',
          bgPrimaryLight: 'bg-slate-50',
          bgPrimaryHover: 'hover:bg-slate-950',
          bgGradient: 'from-slate-900 to-slate-950',
          textAccent: 'text-amber-500',
          bgAccent: 'bg-amber-500',
          bgAccentHover: 'hover:bg-amber-600',
          borderAccent: 'border-amber-500',
          accentTextBg: 'bg-amber-100 text-amber-800',
          primaryHex: '#0F172A',
          accentHex: '#F59E0B'
        };
    }
  };

  const c = getThemeStyles(themeId);
  const { data: db } = useSchoolData();

  const newsList = db.news;
  const announcementsList = db.announcements;
  const teacherBlogs = db.blogs;
  const facilitiesList = db.facilities;
  const activitiesList = db.activities;
  const teachersList = db.teachers;
  const galleryItems = db.gallery;

  const staticQuotes = lang === 'id' ? [
    { text: "Pendidikan bukanlah proses mengisi wadah kosong, melainkan upaya menyalakan api kreativitas dalam lubuk hati.", author: "Socrates" },
    { text: "Satu-satunya batasan dalam meraih sukses hari esok adalah keraguan kita hari ini. SMAN 1 Losari, Pasti Bisa!", author: "Nining Mulyati, S.E., M.Si." },
    { text: "Tujuan utama pendidikan adalah menghasilkan insan unggul berakhlak mulia yang mandiri bagi nusa bangsa.", author: "Ki Hajar Dewantara" }
  ] : [
    { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "Socrates" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today. SMAN 1 Losari, We Definitely Can!", author: "Nining Mulyati, S.E., M.Si." },
    { text: "The primary purpose of education is to cultivate outstanding, virtuous, and independent citizens for the nation.", author: "Ki Hajar Dewantara" }
  ];

  const handleVote = (option: string) => {
    setUserVote(option);
  };

  const filteredGallery = galleryFilter === 'semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.tag === galleryFilter);

  return (
    <div className={`bg-slate-50 overflow-x-hidden relative ${isFullPage ? '' : 'rounded-2xl border border-slate-200 shadow-sm'}`} id="live-demo-parent">
      
      {/* 1. INFORMATIONAL TOP-BAR */}
      <div className="text-slate-200 py-2.5 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[10px] md:text-xs relative z-45 border-b" style={{ backgroundColor: c.primaryHex, borderColor: `${c.accentHex}15` }} id="live-demo-top-bar">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-center md:text-left">
          <span className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-semibold tracking-wide text-white">{t('spmbOpen')}</span>
          </span>
          <span className="hidden md:inline text-slate-500 opacity-40">|</span>
          <span className="hidden md:flex items-center gap-1"><Phone className="w-3.5 h-3.5" style={{ color: c.accentHex }} /> {t('phone')}: (0231) 831999</span>
        </div>
        <div className="hidden sm:flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0" style={{ borderColor: `${c.accentHex}15` }}>
          <span className="flex items-center gap-1.5 font-medium flex-nowrap"><Clock className="w-3.5 h-3.5" style={{ color: c.accentHex }} /> {lang === 'id' ? 'Sab, 23 Mei 2026' : 'Sat, May 23, 2026'} | 17:28 WIB</span>
          <div className="flex gap-4 font-bold text-slate-300">
            <a href="#resources" className="hover:text-white transition-colors">{t('alumni')}</a>
            <a href="#resources" className="hover:text-white transition-colors">{t('library')}</a>
            <a href="#resources" className="hover:text-white transition-colors">{t('learning')}</a>
          </div>
        </div>
      </div>
          {/* 2. HEADER GLASSMORPHIC NAVIGATION BAR */}
      <header className="sticky top-0 bg-white px-3 sm:px-6 md:px-8 py-4 sm:py-5 flex justify-between items-center shadow-md z-30 transition-all border-b border-slate-100" id="live-demo-header">
        {/* Brand section (Rotated square emblem as requested by design HTML) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Sman1LosariLogo size="sm" primaryColor={c.primaryHex} accentColor={c.accentHex} />
          <div>
            <h1 className="text-xs sm:text-sm md:text-base font-black leading-none uppercase tracking-tight" style={{ color: c.primaryHex }}>SMAN 1 LOSARI</h1>
            <p className="font-script text-sm sm:text-base italic font-bold tracking-wide -mt-0.5 leading-none" style={{ color: c.accentHex }}>Pasti Bisa!</p>
          </div>
        </div>

        {/* Navigation Core (Desktop UI - High polish states) */}
        <nav className="hidden lg:flex gap-6 text-xs font-semibold text-slate-600">
          <a href="#" className="pb-1 font-bold border-b-2" style={{ color: c.primaryHex, borderBottomColor: c.accentHex }}>{t('home')}</a>
          
          <div className="relative group pb-1">
            <button className="flex items-center gap-1 hover:opacity-85 transition-colors cursor-pointer font-bold" style={{ color: c.primaryHex }}>
              {t('profile')} <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-900" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-150 shadow-xl rounded-xl p-3 space-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <a href="#" onClick={() => setShowVisiMisi(true)} className="p-2 rounded-lg hover:bg-slate-50 flex flex-col transition-all">
                <span className="text-xs font-bold text-slate-800">{t('visimisi')}</span>
                <span className="text-[10px] text-slate-400">{t('visimisiSub')}</span>
              </a>
              <a href="#sambutan" className="p-2 rounded-lg hover:bg-slate-50 flex flex-col transition-all">
                <span className="text-xs font-bold text-slate-800">{t('sambutan')}</span>
                <span className="text-[10px] text-slate-400">{t('sambutanSub')}</span>
              </a>
              <a href="#guru" className="p-2 rounded-lg hover:bg-slate-50 flex flex-col transition-all">
                <span className="text-xs font-bold text-slate-800">{t('teachers')}</span>
                <span className="text-[10px] text-slate-400">{t('teachersSub')}</span>
              </a>
            </div>
          </div>

          <a href="#resources" className="transition-colors font-bold" style={{ color: `${c.primaryHex}dd` }}>{t('academicLink')}</a>
          <a href="#resources" className="transition-colors font-bold" style={{ color: `${c.primaryHex}dd` }}>{t('kesiswaan')}</a>
          <a href="#resources" className="transition-colors font-bold" style={{ color: `${c.primaryHex}dd` }}>{t('facilities')}</a>
          <a href="#guru" className="transition-colors font-bold" style={{ color: `${c.primaryHex}dd` }}>{t('contact')}</a>
        </nav>

        {/* Action Center - Search & Button */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* AESTHETIC EN-ID TRANSLATOR DROP-DOWN */}
          <div className="relative">
            <button 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all border border-slate-205 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer shadow-3xs"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'id' ? 'ID' : 'EN'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            
            {showLangDropdown && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-150 shadow-2xl rounded-xl p-1 z-50 flex flex-col gap-0.5">
                <button 
                  onClick={() => handleLangChange('id')}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${lang === 'id' ? 'bg-slate-100 text-slate-900 border-l-4 border-amber-500' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>🇮🇩</span> Indo (ID)
                </button>
                <button 
                  onClick={() => handleLangChange('en')}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${lang === 'en' ? 'bg-slate-100 text-slate-900 border-l-4 border-amber-500' : 'text-slate-650 hover:bg-slate-50'}`}
                >
                  <span>🇬🇧</span> Eng (EN)
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden xl:block">
            <input 
              type="text" 
              placeholder={t('searchPlholder')}
              className="bg-slate-50 border border-slate-205 pl-8 pr-3 py-1.5 rounded-full text-xs w-44 focus:outline-none focus:bg-white transition-all shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Core Portal capsule style button with ambient drop shadow from design HTML */}
          <a 
            href="https://spmb.jabarprov.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold shadow-lg tracking-wider uppercase cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center whitespace-nowrap"
            style={{ backgroundColor: c.primaryHex }}
          >
            {t('portalSpmb')}
          </a>

          {/* Hamburger Menu (Mobile Layout) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 sm:p-2 bg-slate-50 rounded-lg lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 p-4 space-y-3 relative z-20"
          >
            <div className="grid grid-cols-1 gap-1">
              <a href="#" className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('home')}</a>
              <a href="#" onClick={() => { setShowVisiMisi(true); setMobileMenuOpen(false); }} className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('visimisi')}</a>
              <a href="#sambutan" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('sambutan')}</a>
              <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('beritaTab')} & {t('pengumumanTab')}</a>
              <a href="#galeri" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('galKampus')}</a>
              <a href="#guru" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-800 block">{t('teachers')}</a>
            </div>

            {/* Quick links for mobile screen layout efficiency */}
            <div className="border-t border-slate-100 pt-3">
              <p className="px-3 text-[9px] font-black tracking-widest text-slate-400 uppercase mb-2">{t('tautDir')}</p>
              <div className="grid grid-cols-3 gap-2 px-1">
                <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-extrabold text-slate-700 block border border-slate-100">{t('alumni')}</a>
                <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-extrabold text-slate-700 block border border-slate-100">{t('library')}</a>
                <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-extrabold text-slate-700 block border border-slate-100">{t('learning')}</a>
              </div>
            </div>

            {/* Language Selection inside mobile drawer */}
            <div className="border-t border-slate-100 pt-3 pb-1">
              <p className="px-3 text-[9px] font-black tracking-widest text-slate-400 uppercase mb-2">Language / Bahasa</p>
              <div className="flex gap-2 px-3">
                <button 
                  onClick={() => { handleLangChange('id'); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-lg border ${lang === 'id' ? 'bg-slate-900 border-transparent text-white' : 'bg-slate-50 border-slate-205 text-slate-700'}`}
                >
                  🇮🇩 Indonesia
                </button>
                <button 
                  onClick={() => { handleLangChange('en'); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-lg border ${lang === 'en' ? 'bg-slate-900 border-transparent text-white' : 'bg-slate-50 border-slate-205 text-slate-700'}`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>

            <div className="relative pt-2">
              <input 
                type="text" 
                placeholder={t('searchPlholder')}
                className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-2 rounded-lg text-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-4.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO/WELCOME BANNER WITH MODERN ASYMMETRICAL STATS */}
      <section className="relative text-slate-100 py-16 md:py-24 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: c.primaryHex }} id="hero-section">
        {/* Background Overlay & Geometric Grid from Professional Polish */}
        <div className="absolute inset-0 bg-gradient-to-r opacity-95 z-10" style={{ backgroundImage: `linear-gradient(to right, ${c.primaryHex}FA, ${themeId === 'academic-teal' ? '#115E59' : themeId === 'heritage-indigo' ? '#1E1B4B' : '#0F172A'}CA)` }}></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
          <div className="grid grid-cols-6 grid-rows-4 w-full h-full gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="bg-slate-400"></div>
            ))}
          </div>
        </div>

        {/* Ambient Lights */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl -z-10" style={{ backgroundColor: `${c.accentHex}15` }} />
        <div className="absolute -bottom-10 left-10 w-60 h-60 rounded-full blur-3xl -z-10" style={{ backgroundColor: `${c.accentHex}10` }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          {/* Taglines (Left 7/12) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block animate-pulse" style={{ color: c.accentHex }}>
              {t('qualityEducation')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {t('heroTitle1')} <br/>
              <span style={{ color: c.accentHex }}>{t('heroTitle2')}</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              {t('heroDesc')}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="https://spmb.jabarprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-950 px-8 py-3 rounded-md font-bold text-xs hover:brightness-110 transition-all shadow-xl font-extrabold uppercase tracking-wider cursor-pointer inline-flex items-center justify-center"
                style={{ backgroundColor: c.accentHex }}
              >
                {t('registerNow')}
              </a>
              <button 
                onClick={() => {
                  const el = document.getElementById('sambutan');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-md font-bold text-xs hover:bg-white/20 transition-all uppercase tracking-wider cursor-pointer"
              >
                {t('virtualTour')}
              </button>
            </div>
          </div>

          {/* Quick Stats Grid with Double Floating design and Photo Showcase (Right 5/12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Photo Frame for Activities */}
            <div className="relative group overflow-hidden rounded-2xl min-h-[220px] md:min-h-[260px] shadow-2xl flex items-end border" style={{ backgroundColor: `${c.primaryHex}dd`, borderColor: `${c.accentHex}20` }}>
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" 
                alt="Kegiatan Pembelajaran SMAN 1 Losari" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10"></div>
              
              {/* Floating highlight absolute stats overlay */}
              <div className="absolute top-4 left-4 z-20 text-slate-950 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1.5" style={{ backgroundColor: c.accentHex }}>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                {t('studentDoc')}
              </div>

              <div className="relative z-20 p-5 text-left w-full">
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: c.accentHex }}>{t('diversification')}</span>
                <p className="text-xs font-bold text-white leading-tight">{t('docDesc')}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[8px] bg-white/10 backdrop-blur-xs text-slate-200 px-2 py-0.5 rounded-sm font-semibold">{t('ta2026')}</span>
                  <span className="text-[8px] px-2 py-0.5 rounded-sm font-semibold animate-pulse" style={{ backgroundColor: `${c.accentHex}30`, color: c.accentHex }}>{t('taActive')}</span>
                </div>
              </div>
            </div>

            {/* Microstats block beneath the preview frame */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center min-w-[120px] transition-all hover:scale-105 duration-300 text-center">
                <span className="text-3xl font-black tracking-tighter" style={{ color: c.primaryHex }}>{t('activeSiswaCount')}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{t('activeSiswa')}</span>
              </div>
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center min-w-[120px] transition-all hover:scale-105 duration-300 text-center">
                <span className="text-3xl font-black tracking-tighter" style={{ color: c.primaryHex }}>A</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{t('accreditation')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RUNNING NEWS TICKER */}
      <div className="py-3 border-y text-xs px-4 flex items-center gap-3 overflow-hidden relative z-10 font-medium" style={{ backgroundColor: `${c.accentHex}12`, borderColor: `${c.accentHex}20` }}>
        <span className="shrink-0 flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs text-white px-2.5 py-1 rounded-md shadow-xs select-none z-20" style={{ backgroundColor: c.primaryHex }}>
          <Bell className="w-3.5 h-3.5 animate-bounce" style={{ color: c.accentHex }} /> {t('runningNews')}
        </span>
        <div className="overflow-hidden flex-1 relative flex items-center py-0.5">
          <div className="animate-marquee whitespace-nowrap flex gap-12" style={{ color: c.primaryHex }}>
            <span>{t('newsTicker1')}</span>
            <span>{t('newsTicker2')}</span>
            <span>{t('newsTicker3')}</span>
          </div>
        </div>
      </div>

      {/* 5. REDESIGNED BENTO GRID FOR LATEST NEWS */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-md mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('latestNews')}</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{t('newsTitle')}</h3>
          <p className="text-slate-500 text-xs">{t('newsDesc')}</p>
        </div>

        {/* BENTO GRID CONTEMPORARY BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Huge Card: Visi-Misi (6/12) */}
          <div 
            onClick={() => setShowVisiMisi(true)}
            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-md relative group cursor-pointer border flex flex-col justify-end min-h-[380px] p-6 text-white"
            style={{ backgroundColor: c.primaryHex, borderColor: `${c.accentHex}15` }}
          >
            {/* Dark image background */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=700" 
                alt="Visi SMAN 1 Losari" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            {/* Content Overlays */}
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded inline-block text-slate-950" style={{ backgroundColor: c.accentHex }}>
                {t('characterMain')}
              </span>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight">{t('visimisi')}</h4>
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                {t('visiExcerpt')}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1.5 transition-all" style={{ color: c.accentHex }}>
                {lang === 'id' ? 'Klik untuk Membaca Visi Lengkap' : 'Click to Read Full Vision'} <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Sided Grid stacked items (6/12) */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsList.map((news) => (
              <div 
                key={news.id}
                className="bg-white border border-slate-200/55 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden relative">
                    <img 
                      src={news.imageUrl} 
                      alt={t(news.title)}
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider" style={{ backgroundColor: c.primaryHex }}>
                      {t(news.category)}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-405 block">{t(news.date)}</span>
                    <h5 className="font-extrabold text-slate-900 text-xs line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {t(news.title)}
                    </h5>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {t(news.excerpt)}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button className="text-[11px] font-bold flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer" style={{ color: c.primaryHex }}>
                    {t('readMore')} <ChevronRight className="w-3.5 h-3.5" style={{ color: c.accentHex }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. COMPACT EDITORIAL PANEL (Sambutan & List) */}
      <section className="bg-white py-16 px-4 md:px-8 border-y border-slate-100" id="sambutan">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Portrait & Speech layout (7/12) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 items-center">
            {/* Visual Frame wrapper */}
            <div className="relative shrink-0 w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-sm border-4 border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300" 
                alt="Nining Mulyati, S.E.,M.Si. - Kepala Sekolah SMAN 1 Losari" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className={`absolute bottom-0 inset-x-0 p-2 text-center text-xs font-bold text-slate-900`} style={{ backgroundColor: c.accentHex }}>
                {lang === 'id' ? 'Kepala Sekolah' : 'School Principal'}
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: c.primaryHex }}>{t('quoteWelcoming')}</span>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{t('principalName')}</h4>
              <p className="text-slate-600 text-xs leading-relaxed italic">
                {t('quoteWelcomeDesc')}
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">NIP: 196803241995121002</span>
              </div>
            </div>
          </div>

          {/* Right panel: Modernized editorial articles block (5/12) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h5 className="font-extrabold text-xs text-slate-800 tracking-wider uppercase flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: c.accentHex }} /> {t('quoteWelcomingTitle')}
            </h5>

            <div className="space-y-3">
              {[
                { title: lang === 'id' ? 'Keteladanan Kepahlawanan Guru di Era Transformasi Digital' : 'Teacher Heroism Exemplar in Digital Transformation Era', id: 'ed-1' },
                { title: lang === 'id' ? 'Tugas Kepala Sekolah Sebagai Dinamisator Kurikulum Mandiri' : 'Duties of Principal as Kurikulum Merdeka Catalyst', id: 'ed-2' },
                { title: lang === 'id' ? 'Membentuk Karakter Gotong Royong pada Siswa Losari' : 'Nurturing Gotong Royong Collaboration in Losari Students', id: 'ed-3' }
              ].map((ed, idx) => (
                <div 
                  key={ed.id}
                  className="bg-white p-3.5 rounded-xl border border-slate-205 shadow-2xs hover:border-slate-300 hover:shadow-3xs transition-all flex justify-between items-center group cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'id' ? 'Artikel Guru' : 'Teacher Article'} • {idx+1}</span>
                    <h6 className="font-bold text-xs text-slate-800 leading-tight transition-colors group-hover:opacity-85" style={{ color: c.primaryHex }}>
                      {ed.title}
                    </h6>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" style={{ color: c.accentHex }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. THE MASTER REPLAY BOARD: TABS OF RESOURCE DRAWER */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-8" id="resources">
        
        {/* Header explaining this tabbed redesign solves the flat table structure of the old layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: c.primaryHex }}>{t('resourceHubTitle')}</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{t('resourceHubSub')}</h3>
            <p className="text-slate-500 text-xs">{t('resourceHubDesc')}</p>
          </div>

          {/* Interactive Switchers */}
          <div className="flex flex-wrap gap-1.5 bg-slate-150 p-1 rounded-xl self-start">
            {[
              { id: 'berita', label: `🔔 ${t('announcementsT')}` },
              { id: 'blog', label: `📝 ${t('teacherBlogsT')}` },
              { id: 'fasilitas', label: `🏫 ${t('facilitiesT')}` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'shadow-xs text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={activeTab === tab.id ? { backgroundColor: c.primaryHex } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic content rendering inside switcher box with crisp animations */}
        <div className="bg-white border border-slate-200/55 rounded-2xl p-6 min-h-[320px]">
          <AnimatePresence mode="wait">
            {activeTab === 'berita' && (
              <motion.div 
                key="announcements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {announcementsList.map((ann, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200/40 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{t(ann.date)}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.accentTextBg}`}>
                          {t(ann.type)}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 text-xs leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                        {t(ann.title)}
                      </h5>
                    </div>
                    <button className="text-[11px] font-bold text-slate-700 flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                      {t('downloadPdf')} <ArrowUpRight className="w-3.5 h-3.5 animate-bounce-horizontal" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'blog' && (
              <motion.div 
                key="blogs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {teacherBlogs.map((blg, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200/40 flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow">
                    <div className="space-y-2">
                       <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">{t('catatanGuruT')}</span>
                      <h5 className="font-extrabold text-slate-900 text-xs leading-snug">"{t(blg.title)}"</h5>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <div>
                        <span className="text-[10px] font-bold block text-slate-800">{t(blg.author)}</span>
                        <span className="text-[9px] block text-slate-400">{t(blg.date)}</span>
                      </div>
                      <span className="text-xs">📖</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'fasilitas' && (
              <motion.div 
                key="facilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {facilitiesList.map((fac) => (
                  <div key={fac.id} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200/40 flex flex-col justify-between">
                    <div>
                      <div className="h-32 w-full overflow-hidden relative">
                        <img 
                          src={fac.imageUrl} 
                          alt={t(fac.name)} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h5 className="font-extrabold text-slate-900 text-xs">{t(fac.name)}</h5>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{t(fac.description)}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200/60 inline-block">
                        {t('readyToUse')}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 8. NEW INTERACTIVE AGENDA COMPONENT (Solves Empty blank space of old site) */}
      <section className="bg-slate-900 text-white py-16 px-4 md:px-8 relative overflow-hidden">
        {/* Soft layout designs */}
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Calendar visual (Left 4/12) */}
          <div className="lg:col-span-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{t('calendarTitle')}</span>
              <span className="text-xs text-slate-400">{lang === 'id' ? 'Mei 25 & 26' : 'May 25 & 26'}</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
              {lang === 'id' ? ['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => (
                <div key={idx} className="font-bold py-1 text-slate-500">{day}</div>
              )) : ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className="font-bold py-1 text-slate-500">{day}</div>
              ))}
              {Array.from({ length: 28 }).map((_, idx) => {
                const dayNum = idx + 1;
                const isSpecial = dayNum === 23 || dayNum === 29 || dayNum === 30;
                return (
                  <div 
                    key={idx} 
                    className={`p-1.5 rounded-md font-bold transition-all ${
                      isSpecial 
                        ? 'bg-amber-500 text-slate-950 scale-105' 
                        : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 p-3 rounded-lg flex items-start gap-1.5 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
              <span>{t('orangeDot')}</span>
            </div>
          </div>

          {/* Core Content (Right 8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">{t('agendaBrief')}</span>
              <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('agendaTitle')}</h4>
              <p className="text-slate-400 text-xs">{t('agendaDesc')}</p>
            </div>

            <div className="space-y-4">
              {[
                { date: lang === 'id' ? '29 Mei 2026' : 'May 29, 2026', title: lang === 'id' ? 'Sosialisasi Alur Pendaftaran SPMB Online 2026' : 'Socialization of 2026 Online SPMB Registration Procedures', time: '09:00 - 12:00', loc: lang === 'id' ? 'Aula Serbaguna SMANSALOS' : 'SMANSALOS Multi-purpose Hall' },
                { date: lang === 'id' ? '15 Juni 2026' : 'Jun 15, 2026', title: lang === 'id' ? 'Rapat Pleno Komite & Istighosah Kelulusan Kelas XII' : 'General Committee Plenary & Spiritual Prayer for Grade XII Graduation', time: '13:00 - End', loc: lang === 'id' ? 'Masjid At-Taqwa Kampus' : 'Kampus At-Taqwa Mosque' }
              ].map((ag, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-500/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-500">{ag.date}</span>
                      <span className="text-[9px] text-slate-500 font-mono">| {ag.time}</span>
                    </div>
                    <h5 className="font-extrabold text-xs text-white leading-normal">{ag.title}</h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" /> {ag.loc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Poll / Interaction to solve stiffness */}
            <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 space-y-3">
              <h5 className="font-bold text-xs text-slate-200">📊 {t('pollAspirasi')}</h5>
              {userVote ? (
                <p className="text-xs text-emerald-400 font-bold">{t('pollVoteThanks')} (65% {t('pollAgreed')})</p>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: 'Studio Podcast', label: lang === 'id' ? 'Studio Podcast Siswa' : 'Student Podcast Studio' },
                    { id: 'Laboratorium Robotika', label: lang === 'id' ? 'Laboratorium Robotika' : 'Robotics Laboratory' },
                    { id: 'Sintesis Audio Teater', label: lang === 'id' ? 'Sintesis Audio Teater' : 'Audio Synthesizer Theater' }
                  ].map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg text-slate-350 transition-colors cursor-pointer"
                    >
                      👍 {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. MASONRY STYLE PHOTO GALLERY (Fully filterable, solves rigid grid) */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-8" id="galeri">
        <div className="text-center space-y-2 max-w-sm mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('galKampus')}</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{t('galTitle')}</h3>
          <p className="text-slate-500 text-xs">{t('galDesc')}</p>
        </div>

        {/* Filters buttons */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {[
            { filter: 'semua', label: `🖼️ ${t('allMading')}` },
            { filter: 'akademik', label: `🥼 ${t('akademikFilter')}` },
            { filter: 'eskul', label: `⚽ ${t('eskulFilter')}` },
            { filter: 'fasilitas', label: `🏫 ${t('fasilitasFilter')}` }
          ].map((btn) => (
            <button 
              key={btn.filter}
              onClick={() => setGalleryFilter(btn.filter as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                galleryFilter === btn.filter 
                  ? 'text-white' 
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/90'
              }`}
              style={galleryFilter === btn.filter ? { backgroundColor: c.primaryHex } : {}}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery grid of original images types reconstructed in premium cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredGallery.map((item, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200/50 rounded-xl overflow-hidden shadow-2xs group relative hover:shadow-xs transition-shadow"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={t(item.title)} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      {lang === 'id' ? 'Zoom Aktivitas' : 'Zoom Activity'} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <span className="text-[10px] font-bold text-slate-800 leading-tight block truncate">
                    {t(item.title)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. MOTIVATION QUOTES SLIDER (Solves flat quote indicator text of old site) */}
      <section className={`py-12 text-slate-100 text-center relative z-10 overflow-hidden`} style={{ backgroundColor: c.primaryHex }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase block">{lang === 'id' ? 'KUTIPAN INSPIRATIF MINGGU INI' : 'INSPIRATIONAL QUOTE OF THE WEEK'}</span>
          
          <div className="min-h-[60px] flex items-center justify-center">
            <p className="text-sm md:text-base font-medium tracking-wide italic leading-relaxed">
              "{staticQuotes[activeQuoteIndex].text}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {staticQuotes.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveQuoteIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeQuoteIndex === idx ? 'bg-amber-500 w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-bold text-slate-400 block">— {staticQuotes[activeQuoteIndex].author}</span>
        </div>
      </section>

      {/* 11. DAFTAR GURU / FACULTY CAROUSEL SHOWCASE */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-8" id="guru">
        <div className="text-center space-y-2 max-w-sm mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">TENAGA PENDIDIK</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Profil Guru Terhormat</h3>
          <p className="text-slate-500 text-xs">{t('teachersSectionDesc')}</p>
        </div>

        {/* Guru Grid (Resolves rigid circular overlay profile grids) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {teachersList.map((teacher) => (
            <div 
              key={teacher.id}
              className="bg-white border border-slate-205 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <img 
                    src={teacher.imageUrl} 
                    alt={t(teacher.name)} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                  />
                  {/* Subject Tag badge absolutely mounted */}
                  <span className="absolute bottom-2 left-2 text-[8px] font-black px-1.5 py-0.5 rounded bg-slate-950 text-white uppercase tracking-wider">
                    {t(teacher.subject)}
                  </span>
                </div>
                <div className="p-3 text-center space-y-1">
                  <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                    {t(teacher.name)}
                  </h5>
                  <span className="text-[9px] text-slate-400 font-medium block">
                    {t(teacher.role)}
                  </span>
                </div>
              </div>

              {/* Interaction Panel */}
              <div className="p-3 pt-0 border-t border-slate-100">
                <button className="w-full py-1 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all rounded text-[9px] font-bold text-slate-600 flex items-center justify-center gap-1">
                  {t('contactTeacher')} 💬
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. VIDEO PROFILE OF SMAN 1 LOSARI */}
      <section className="py-12 bg-slate-50 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative">
          
          <div className="space-y-4 max-w-md">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">{t('schoolProfile')}</span>
            <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">{t('watchProfile')}</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t('schoolProfileDesc')}
            </p>
            <div className="flex gap-4 text-[11px] text-slate-400">
              <span>⏱️ {lang === 'id' ? 'Durasi: 5:42 Menit' : 'Duration: 5:42 Minutes'}</span>
              <span>• {lang === 'id' ? 'Rilis Resmi Sekolah' : 'School Official Release'}</span>
            </div>
          </div>

          {/* Interactive Player Mockup Layout */}
          <div className="relative shrink-0 w-full lg:w-96 aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {isPlayingVideo ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                {/* Simulated playback visual */}
                <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mb-3" />
                <span className="text-xs text-slate-400 font-mono">{lang === 'id' ? 'Memutarkan Profil SMANSALOS Streaming...' : 'Streaming SMANSALOS Profile Video...'}</span>
                <button 
                  onClick={() => setIsPlayingVideo(false)}
                  className="mt-4 text-[10px] font-bold text-amber-500 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" /> {lang === 'id' ? 'Pause pratinjau' : 'Pause preview'}
                </button>
              </div>
            ) : (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400" 
                  alt="Video thumbnail" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-45"
                />
                <button 
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      {/* 13. MODERN FOOTER GRID WITH LOCATOR MAP */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Sman1LosariLogo size="sm" primaryColor="#0F172A" accentColor="#F59E0B" />
              <div>
                <h5 className="font-extrabold text-white text-sm leading-none">SMAN 1 LOSARI</h5>
                <p className="font-script text-[13px] text-amber-500 font-bold leading-none mt-1">Pasti Bisa!</p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {t('footerDesc')}
            </p>
            <div className="text-[10px] text-slate-500 font-semibold font-mono">
              NPSN: 20214981 • {lang === 'id' ? 'Akreditasi A' : 'Accreditation A'}
            </div>
          </div>

          {/* Quick links list */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">{t('tautDir')}</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">{t('spmbOpen')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Smart Library Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'id' ? 'Kalender Pendidikan Semester Ganjil' : 'Odd Semester Educational Calendar'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{lang === 'id' ? 'Berita Kurikulum Mandiri' : 'Kurikulum Merdeka News'}</a></li>
            </ul>
          </div>

          {/* Location contact text */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">{lang === 'id' ? 'Hub Kontak' : 'Contact Hub'}</h5>
            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Losari No. 1, Losari Lor, Kec. Losari, Kabupaten Cirebon, Jawa Barat 45192</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-500 inline shrink-0" />
                <span>(0231) 831999</span>
              </p>
            </div>
          </div>

          {/* Simulator Maps Placeholder to complete layout */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">{lang === 'id' ? 'Lokasi Sekolah' : 'School Location'}</h5>
            <div className="rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-900 flex items-center justify-center p-3 text-center text-slate-500 text-[10px]">
              <div>
                <span className="block font-bold mb-1 text-slate-400">{lang === 'id' ? 'Map Widget SMAN 1 Losari' : 'SMAN 1 Losari Map Widget'}</span>
                <span className="block text-[9px]">{lang === 'id' ? 'Gmaps API Terpasang • Koordinat Cirebon Timur' : 'Gmaps API Active • East Cirebon Coordinates'}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <span>{lang === 'id' ? '© 2026 SMA Negeri 1 Losari Kabupaten Cirebon. Hak Cipta Dilindungi.' : '© 2026 SMAN 1 Losari Cirebon Regency. All Rights Reserved.'}</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">{lang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">{lang === 'id' ? 'Peta Situs' : 'Sitemap'}</a>
          </div>
        </div>
      </footer>

      {/* DIALOG POPUP MODAL FOR VISI & MISI */}
      <AnimatePresence>
        {showVisiMisi && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 py-10 px-4 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowVisiMisi(false)}
                className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all cursor-pointer border border-slate-100"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-600 block uppercase tracking-wider">{lang === 'id' ? 'PILAR DASAR SMANSALOS' : 'SMANSALOS CORE PILLARS'}</span>
                <h4 className="text-xl font-extrabold tracking-tight">{lang === 'id' ? 'Visi & Misi Konstruksi Baru' : 'Vision & Mission Statement'}</h4>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">{lang === 'id' ? 'VISI UTAMA' : 'PRIMARY VISION'}</span>
                  <p className="font-extrabold text-slate-900 leading-normal">
                    {t('modalVisiText')}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">{lang === 'id' ? 'MISI STRATEGIS' : 'STRATEGIC MISSIONS'}</span>
                  <ul className="list-disc pl-4 space-y-2 text-slate-700 font-medium">
                    <li>{lang === 'id' ? 'Menyelenggarakan sistem pengajaran heuristik berbasis teknologi guna meluluskan generasi literat mandiri.' : 'Implementing technology-driven heuristic teaching systems to graduate independent, literate future leaders.'}</li>
                    <li>{lang === 'id' ? 'Membina karakter budi pekerti luhur melalui pembiasaan IMTAK, kegiatan mading m2, dan teater seni sosial.' : 'Fostering noble moral character through daily faith integration, student group activities, and creative social arts theater.'}</li>
                    <li>{lang === 'id' ? 'Membangun infrastruktur laboratorium bahasa dan komputer guna menyambut standar globalisasi pendidikan.' : 'Developing language and computer laboratory infrastructure to align with global education standards.'}</li>
                    <li>{lang === 'id' ? 'Melaksanakan sinergitas yang hangat dengan komite, wali murid, dinas pendidikan prov, dan pemerintah daerah.' : 'Sustaining collaborative synergy with school committees, parents, provincial education office, and local government.'}</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setShowVisiMisi(false)}
                  className={`text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 cursor-pointer`}
                  style={{ backgroundColor: c.primaryHex }}
                >
                  {lang === 'id' ? 'Selesai Membaca' : 'Done Reading'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
