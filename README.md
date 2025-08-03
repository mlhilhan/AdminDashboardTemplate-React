# Modern Dashboard Template

React + Vite ile oluşturulmuş modern, responsive dashboard template'i.

## 🚀 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Rol bazlı menü sistemi
- ✅ Login/Register sistemi
- ✅ Dashboard, Kullanıcı ve Ürün yönetimi
- ✅ Modern UI componentleri
- ✅ Tailwind CSS ile styling
- ✅ Mobil uyumlu tasarım
- ✅ Dark mode desteği (hazır)

## 📦 Kurulum

### 1. Proje oluşturma
```bash
npm create vite@latest dashboard-template -- --template react
cd dashboard-template
```

### 2. Bağımlılıkları yükleme
```bash
# Temel bağımlılıklar
npm install react-router-dom lucide-react

# Dev bağımlılıkları
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Dosya yapısını oluşturma
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   └── common/
│       └── ProtectedRoute.jsx
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── dashboard/
│       ├── Dashboard.jsx
│       ├── Users.jsx
│       └── Products.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── styles/
│   └── globals.css
└── App.jsx
```

### 4. Çalıştırma
```bash
npm run dev
```

## 🔐 Demo Hesapları

Uygulamaya giriş yapmak için aşağıdaki demo hesapları kullanabilirsiniz:

### Admin Hesabı
- **Email:** admin@demo.com
- **Şifre:** admin123
- **Yetkiler:** Tüm sayfalara erişim

### Manager Hesabı  
- **Email:** manager@demo.com
- **Şifre:** manager123
- **Yetkiler:** Dashboard, Ürünler, Analitik, Ayarlar

### User Hesabı
- **Email:** user@demo.com  
- **Şifre:** user123
- **Yetkiler:** Dashboard, Ürünler

## 🛠️ Kullanılan Teknolojiler

- **React 18** - UI kütüphanesi
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Context API** - State management

## 📱 Responsive Tasarım

Template, tüm cihaz boyutları için optimize edilmiştir:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🎨 UI Componentleri

### Button Component
```jsx
<Button variant="primary" size="lg" loading={false}>
  Click Me
</Button>
```

### Input Component
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  leftIcon={<Mail />}
  error="Error message"
/>
```

### Card Component
```jsx
<Card title="Card Title" subtitle="Subtitle">
  Card content
</Card>
```

### Modal Component
```jsx
<Modal isOpen={true} onClose={() => {}} title="Modal Title">
  Modal content
</Modal>
```

## 🔧 Konfigürasyon

### Rol Bazlı Menü Sistemi
`src/utils/constants.js` dosyasında menü öğeleri rol bazlı olarak tanımlanmıştır.

### Tema Özelleştirme
`tailwind.config.js` dosyasında renk paleti ve diğer tema ayarları bulunur.

### API Entegrasyonu
Auth context'te bulunan demo fonksiyonları gerçek API çağrıları ile değiştirilebilir.

## 📝 Geliştirme Notları

- Tüm componentler reusable olarak tasarlanmıştır
- TypeScript desteği eklenebilir
- API entegrasyonu için axios eklenebilir
- State management için Redux Toolkit eklenebilir
- Testing için Vitest + React Testing Library eklenebilir

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📄 Lisans

Bu proje demo amaçlı oluşturulmuştur. Ticari kullanım için uygun değildir.

---

**Not:** Bu bir demo template'idir. Production'da kullanım için güvenlik önlemleri alınmalı ve gerçek API entegrasyonu yapılmalıdır.
