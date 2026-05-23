/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Berita' | 'Pengumuman' | 'Prestasi' | 'Eskul';
  excerpt: string;
  imageUrl: string;
  author?: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  subject: string;
  quote?: string;
  socials?: {
    instagram?: string;
    email?: string;
  };
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  capacity?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'Akan Datang' | 'Selesai' | 'Batal';
}

export interface NavMenuLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface ColorTheme {
  name: string;
  id: string;
  primary: string; // Tailwind class equivalent
  secondary: string;
  accent: string;
  text: string;
  bgGrad: string;
}
