# L'ÉLIXIR Atelier — Luxury Hair Studio & Digital Booking Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80" alt="L'ÉLIXIR Atelier Banner" width="100%" style="border-radius: 12px;" />
</p>

<p align="center">
  <strong>Lüks Kuaför ve Saç Tasarım Stüdyosu Dijital Deneyim ve Randevu Platformu</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue.svg" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.x-646cff.svg" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## 🌟 Proje Özeti (Overview)

**L'ÉLIXIR Atelier**, modern lüks kuaför salonları için tasarlanmış uçtan uca dijital deneyim, interaktif stil keşfi (*Look Finder*) ve dinamik randevu yönetim platformudur. 

Estetik açıdan **Dark Luxury** (Siyah, Şampanya Altını, Fildişi) tasarım dilini benimser; yüksek performanslı, mobil uyumlu ve SEO/Güvenlik standartlarına tam uyumlu bir mimari sunar.

---

## ✨ Temel Özellikler (Core Features)

### 1. 🔍 Look Finder (İnteraktif Stil & Dönüşüm Keşfi)
- Müşterilerin ne istediğini tam olarak bilmediği durumlarda 4 adımlı rehberli keşif deneyimi:
  - **Adım 1:** İstenen Görünüm / Vibe *(Natural, Elegant, Bold, Minimal, Romantic, Trendy)*
  - **Adım 2:** Mevcut Saç Uzunluğu *(Short, Medium, Long)*
  - **Adım 3:** Tercih Edilen İşlem *(Kesim, Renklendirme, Balyaj, Şekillendirme, Bakım)*
  - **Adım 4:** Özelleştirilmiş Sonuçlar & Portföy Eşleşmesi
- Seçilen stil, uzman stilist ve tahmini süre tek tıkla doğrudan **Randevu Akışına (Booking Funnel)** aktarılır.

### 2. 📅 Çok Adımlı Sürtünmesiz Randevu Motoru (Booking Engine)
- Kategori ve alt hizmet seçimi *(Artisan Cut, Couture Color, Hair Spa & Treatments vb.)*
- Kıdemli stilist seçimi ve stilist uzmanlık alanları.
- Akıllı takvim ve gerçek zamanlı dinamik saat dilimi (slot) seçimi.
- Ekstra bakım ve lüks ritüel eklemeleri (Add-ons).
- Randevu özeti, otomatik iCal / Google Takvim dosyası oluşturma ve tek tıkla **WhatsApp Onay Entegrasyonu**.

### 3. 🔐 Güvenli Salon Yönetim Paneli (Admin Portal)
- Güvenlik PIN kodu (`1234`) ile korunan yönetici arayüzü.
- Günlük randevu takibi, onaylama, iptal ve tamamlama durumları.
- Ciro, ortalama sepet tutarı ve stilist doluluk oranı metrikleri.
- Hizmet fiyatları, süreleri ve stilist takvim yönetimi.

### 4. 🎨 Sanatsal Portföy & Öncesi / Sonrası (Portfolio Showcase)
- Kategori bazlı filtreleme ve yüksek çözünürlüklü görsel sunumu.
- Detaylı çalışma hikayeleri, kullanılan teknikler ve uygulayan stilist bilgisi.

### 5. 👑 VIP Sadakat Kulübü (VIP Atelier Club)
- Özel üyelik seviyeleri (Silver, Gold, Platinum).
- Puan biriktirme, öncelikli randevu ve özel etkinlik davetiyeleri.

### 6. 🛡️ Kurumsal Düzey Güvenlik & HTTPS
- `upgrade-insecure-requests`, HSTS (`Strict-Transport-Security`), CSP, X-Frame-Options ve XSS koruma başlıkları.
- Vercel, Netlify ve Apache (`.htaccess`) ortamları için hazır güvenlik konfigürasyonları.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Alan | Teknoloji / Kütüphane |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript) |
| **Build Tool & Bundler** | Vite 5 |
| **Styling & Design System** | Tailwind CSS + Custom Dark Luxury Palette |
| **Icons** | Lucide React |
| **State Management** | React Context & LocalStorage Persistence |
| **SEO & Meta** | Semantic HTML5, Schema.org JSON-LD, Dynamic OpenGraph |
| **Code Quality** | ESLint + TypeScript Strict Type Checking |

---

## 🚀 Kurulum ve Çalıştırma (Getting Started)

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- **Node.js**: v18.0.0 veya üzeri
- **npm** veya **yarn / pnpm**

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/MuratElberKayaa/KuaforwebsiteAPP.git
cd KuaforwebsiteAPP
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda `http://localhost:5173` adresine giderek siteyi görüntüleyebilirsiniz.

### 4. Üretim Derlemesi (Production Build)
```bash
npm run build
```
Oluşan optimize edilmiş statik dosyalar `dist/` klasörüne aktarılır.

---

## 📁 Proje Dizin Yapısı (Folder Structure)

```text
kuaförwebsite/
├── public/                  # Statik varlıklar, favicon, robots.txt, _headers
│   ├── _headers             # Netlify/Vercel HTTPS & Security Headers
│   ├── .htaccess            # Apache HTTPS Rewrite & HSTS
│   └── sitemap.xml          # Arama motoru haritası
├── src/
│   ├── components/          # Modüler UI Bileşenleri
│   │   ├── admin/           # Yönetim Paneli ve PIN Doğrulama Kapısı
│   │   ├── booking/         # Randevu Akışı ve Takvim Modülü
│   │   ├── lookfinder/      # İnteraktif Look Finder Deneyimi
│   │   ├── portfolio/       # Galeri ve Stil Portföyü
│   │   ├── ui/              # Butonlar, Modallar, Badge ve Kartlar
│   │   └── vip/             # VIP Sadakat Programı
│   ├── context/             # Global Context State (BookingContext vb.)
│   ├── data/                # Mock Veriler (Hizmetler, Stilistler, Portföy)
│   ├── types/               # TypeScript Arayüzleri ve Tipleri
│   ├── utils/               # Yardımcı Fonksiyonlar & cn (TailwindMerge)
│   ├── App.tsx              # Ana Uygulama & Router Düzeni
│   └── main.tsx             # React Giriş Noktası
├── vercel.json              # Vercel Deployment & Security Config
├── tailwind.config.js       # Özel Renkler, Fontlar ve Animasyonlar
├── package.json             # Proje Bağımlılıkları ve Scriptler
└── README.md                # Proje Dokümantasyonu
```

---

## 🔐 Yönetici Paneli Erişimi

Salon Yönetim Paneline erişmek için:
- **URL:** `/#/admin`
- **Varsayılan Giriş PIN'i:** `1234`

---

## 📄 Lisans (License)

Bu proje [MIT](LICENSE) lisansı altında korunmaktadır. Ticari ve kişisel kullanım için özelleştirilebilir.
