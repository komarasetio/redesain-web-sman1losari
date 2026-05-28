import { SchoolData, getStoredSchoolData, saveStoredSchoolData } from './schoolDataStore';

export interface SiteConfig {
  schoolData: SchoolData;
  themeId: string;
  customLogo: string | null;
  showQuotes: boolean;
  showTeachers: boolean;
  showMaps: boolean;
  showActivities: boolean;
  showGallery: boolean;
}

export function getLocalSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') {
    return {
      schoolData: getStoredSchoolData(),
      themeId: 'classic-scholar',
      customLogo: null,
      showQuotes: true,
      showTeachers: true,
      showMaps: true,
      showActivities: true,
      showGallery: true,
    };
  }
  return {
    schoolData: getStoredSchoolData(),
    themeId: localStorage.getItem('sman1losari_selected_theme_id') || 'classic-scholar',
    customLogo: localStorage.getItem('sman1losari_custom_logo'),
    showQuotes: localStorage.getItem('sman1losari_show_quotes') !== 'false',
    showTeachers: localStorage.getItem('sman1losari_show_teachers') !== 'false',
    showMaps: localStorage.getItem('sman1losari_show_maps') !== 'false',
    showActivities: localStorage.getItem('sman1losari_show_activities') !== 'false',
    showGallery: localStorage.getItem('sman1losari_show_gallery') !== 'false',
  };
}

export async function pushLocalConfigToServer() {
  if (typeof window === 'undefined') return;
  
  const config = getLocalSiteConfig();
  // We use this token to authenticate mutations securely on the server
  const token = localStorage.getItem('sman1losari_admin_token') || 'unauthorized';
  
  try {
    const res = await fetch('/api/site-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(config)
    });
    if (!res.ok) {
      console.warn('Gagal mensinkronisasikan kustomisasi ke server backend.');
    } else {
      console.log('Kustomisasi berhasil disinkronisasikan ke server.');
    }
  } catch (err) {
    console.error('Error jaringan ketika mengirim kustomisasi ke server:', err);
  }
}

export async function pullConfigFromServer(onUpdate?: (updatedConfig: SiteConfig) => void) {
  if (typeof window === 'undefined') return;
  
  // SANGAT PENTING: Jika pengguna mendaftar sebagai Admin (masuk panel edit), 
  // kita TIDAK BOLEH menimpa data/logo lokal admin dengan data lama dari server lewat polling.
  // Admin adalah satu-satunya "Sumber Kebenaran" (Authoritative Writer) yang mengunggah data.
  if (localStorage.getItem('sman1losari_admin_logged') === 'true') {
    return;
  }
  
  try {
    const res = await fetch('/api/site-config');
    if (!res.ok) return;
    const serverConfig: SiteConfig = await res.json();
    
    const local = getLocalSiteConfig();
    let hasChanged = false;
    
    // 1. Sync School Data
    if (JSON.stringify(serverConfig.schoolData) !== JSON.stringify(local.schoolData)) {
      saveStoredSchoolData(serverConfig.schoolData);
      hasChanged = true;
    }
    
    // 2. Sync Selected Theme ID
    if (serverConfig.themeId !== local.themeId) {
      localStorage.setItem('sman1losari_selected_theme_id', serverConfig.themeId);
      hasChanged = true;
      window.dispatchEvent(new Event('sman1losari_theme_changed'));
    }
    
    // 3. Sync Custom Logo
    if (serverConfig.customLogo !== local.customLogo) {
      if (serverConfig.customLogo) {
        localStorage.setItem('sman1losari_custom_logo', serverConfig.customLogo);
      } else {
        localStorage.removeItem('sman1losari_custom_logo');
      }
      hasChanged = true;
      window.dispatchEvent(new Event('sman1losari_logo_changed'));
    }
    
    // 4. Sync Section Layout Settings
    const layoutConfigKeys: (keyof SiteConfig)[] = ['showQuotes', 'showTeachers', 'showMaps', 'showActivities', 'showGallery'];
    let layoutChanged = false;
    
    for (const key of layoutConfigKeys) {
      const storageKey = `sman1losari_${key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)}`;
      const serverVal = serverConfig[key];
      const localVal = local[key];
      if (String(serverVal) !== String(localVal)) {
        localStorage.setItem(storageKey, String(serverVal));
        hasChanged = true;
        layoutChanged = true;
      }
    }
    
    if (layoutChanged) {
      window.dispatchEvent(new Event('sman1losari_layout_changed'));
    }
    
    if (hasChanged && onUpdate) {
      onUpdate(serverConfig);
    }
  } catch (err) {
    console.error('Error jaringan saat mengambil kustomisasi dari server:', err);
  }
}
