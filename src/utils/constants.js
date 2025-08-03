// Kullanıcı rolleri
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

// Desteklenen Diller
export const SUPPORTED_LANGUAGES = [
  { value: 'tr', label: 'Türkçe', countryCode: 'TR' },
  { value: 'en', label: 'English', countryCode: 'GB' },
];


// Menü öğeleri (rol bazlı)
export const MENU_ITEMS = {
  [USER_ROLES.ADMIN]: [
  {
    title: 'Genel'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard'
  },
  {
    title: 'Yönetim'
  },
  {
    id: 'users',
    label: 'Kullanıcılar',
    path: '/dashboard/users',
    icon: 'Users'
  },
  {
    id: 'products',
    label: 'Ürünler',
    path: '/dashboard/products',
    icon: 'Package',
    children: [
      {
        id: 'all-products',
        label: 'Tüm Ürünler',
        path: '/dashboard/products'
      },
      {
        id: 'add-product',
        label: 'Ürün Ekle',
        path: '/dashboard/products/add'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analitik',
    path: '/dashboard/analytics',
    icon: 'BarChart3'
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    path: '/dashboard/settings',
    icon: 'Settings'
  }
],
  [USER_ROLES.MANAGER]: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      id: 'products',
      label: 'Ürünler',
      path: '/dashboard/products',
      icon: 'Package'
    },
    {
      id: 'analytics',
      label: 'Analitik',
      path: '/dashboard/analytics',
      icon: 'BarChart3'
    },
    {
      id: 'settings',
      label: 'Ayarlar',
      path: '/dashboard/settings',
      icon: 'Settings'
    }
  ],
  [USER_ROLES.USER]: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      id: 'products',
      label: 'Ürünler',
      path: '/dashboard/products',
      icon: 'Package'
    }
  ]
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  USERS: '/api/users',
  PRODUCTS: '/api/products',
  ANALYTICS: '/api/analytics'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme'
};

// Tema renkleri
export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4'
};

// Breakpoints
export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Bu alan zorunludur',
  EMAIL: 'Geçerli bir email adresi girin',
  PASSWORD_MIN: 'Şifre en az 6 karakter olmalıdır',
  PASSWORD_MATCH: 'Şifreler eşleşmiyor',
  PHONE: 'Geçerli bir telefon numarası girin'
};

// Demo kullanıcılar (development için)
export const DEMO_USERS = [
  {
    id: 1,
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Admin User',
    role: USER_ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'manager@demo.com',
    password: 'manager123',
    name: 'Manager User',
    role: USER_ROLES.MANAGER,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    email: 'user@demo.com',
    password: 'user123',
    name: 'Regular User',
    role: USER_ROLES.USER,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];
