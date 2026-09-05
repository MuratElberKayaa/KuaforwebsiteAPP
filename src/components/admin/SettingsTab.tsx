import { useState } from 'react';
import {
  Settings,
  Building,
  Phone,
  Clock,
  Bell,
  Save,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function SettingsTab() {
  const { settings, updateSettings, resetAllToDefaults } = useAdmin();

  // Local form states
  const [salonName, setSalonName] = useState(settings.salonName);
  const [legalTitle, setLegalTitle] = useState(settings.legalTitle);
  const [currency, setCurrency] = useState(settings.currency);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);

  const [minAdvanceHours, setMinAdvanceHours] = useState(settings.minAdvanceHours);
  const [maxAdvanceDays, setMaxAdvanceDays] = useState(settings.maxAdvanceDays);
  const [slotIntervalMinutes, setSlotIntervalMinutes] = useState(settings.slotIntervalMinutes);
  const [cancellationHoursNotice, setCancellationHoursNotice] = useState(settings.cancellationHoursNotice);
  const [autoConfirmOnlineBookings, setAutoConfirmOnlineBookings] = useState(settings.autoConfirmOnlineBookings);

  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(settings.smsNotificationsEnabled);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(settings.emailNotificationsEnabled);
  const [whatsappNotificationsEnabled, setWhatsappNotificationsEnabled] = useState(settings.whatsappNotificationsEnabled);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      salonName,
      legalTitle,
      currency,
      phone,
      whatsapp,
      email,
      address,
      instagramUrl,
      minAdvanceHours,
      maxAdvanceDays,
      slotIntervalMinutes,
      cancellationHoursNotice,
      autoConfirmOnlineBookings,
      smsNotificationsEnabled,
      emailNotificationsEnabled,
      whatsappNotificationsEnabled,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (
      confirm(
        'Tüm randevuları, müşteri notlarını ve değişiklikleri varsayılan fabrika ayarlarına sıfırlamak istediğinize emin misiniz?'
      )
    ) {
      resetAllToDefaults();
      alert('Sistem başarıyla fabrika ayarlarına sıfırlandı.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            Salon Parametreleri & Operasyonel Kurallar
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            İşletme kimliği, online randevu motoru kısıtlamaları ve bildirim entegrasyonları
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-fade-in font-semibold">
            <CheckCircle className="w-4 h-4" />
            Ayarlar Kaydedildi
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs text-white">
        {/* 1. Salon & Legal Info */}
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#26262b] font-bold text-sm text-white">
            <Building className="w-4 h-4 text-accent" />
            <h3>İşletme Kimliği & Kurumsal Bilgiler</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Salon / Marka Adı
              </label>
              <input
                type="text"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Resmi Şirket Ünvanı
              </label>
              <input
                type="text"
                value={legalTitle}
                onChange={(e) => setLegalTitle(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Para Birimi
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-white/60 mb-1 font-medium">
                Merkez Ofis Adresi
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & Social Channels */}
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#26262b] font-bold text-sm text-white">
            <Phone className="w-4 h-4 text-accent" />
            <h3>İletişim & Sosyal Medya</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Santral Telefonu
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                WhatsApp Concierge Hattı
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                İletişim E-Postası
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Instagram Sayfası URL
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* 3. Booking Engine Rules */}
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#26262b] font-bold text-sm text-white">
            <Clock className="w-4 h-4 text-accent" />
            <h3>Online Randevu Kuralları & Politikaları</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Minimum Avans Süresi (Saat)
              </label>
              <input
                type="number"
                value={minAdvanceHours}
                onChange={(e) => setMinAdvanceHours(Number(e.target.value))}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
              <p className="text-[10px] text-white/40 mt-1">
                Kullanıcı en erken kaç saat sonrasına randevu alabilir?
              </p>
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Maksimum İleri Tarih (Gün)
              </label>
              <input
                type="number"
                value={maxAdvanceDays}
                onChange={(e) => setMaxAdvanceDays(Number(e.target.value))}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
              <p className="text-[10px] text-white/40 mt-1">
                Takvim kaç gün sonrasına kadar randevuya açıktır?
              </p>
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Randevu Slot Aralığı (Dakika)
              </label>
              <select
                value={slotIntervalMinutes}
                onChange={(e) => setSlotIntervalMinutes(Number(e.target.value))}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
              >
                <option value={15}>15 Dakika</option>
                <option value={30}>30 Dakika (Önerilen)</option>
                <option value={45}>45 Dakika</option>
                <option value={60}>60 Dakika</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 mb-1 font-medium">
                Ücretsiz İptal Süresi (Saat Öncesi)
              </label>
              <input
                type="number"
                value={cancellationHoursNotice}
                onChange={(e) => setCancellationHoursNotice(Number(e.target.value))}
                className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-white">
              <input
                type="checkbox"
                checked={autoConfirmOnlineBookings}
                onChange={(e) => setAutoConfirmOnlineBookings(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span>
                Online oluşturulan randevuları direkt <strong>Onaylandı</strong> statüsüne al (Manuel onay gerekmesin)
              </span>
            </label>
          </div>
        </div>

        {/* 4. Notification Channels */}
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#26262b] font-bold text-sm text-white">
            <Bell className="w-4 h-4 text-accent" />
            <h3>Bildirim & Hatırlatma Kanalları</h3>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer text-white/80 hover:text-white">
              <input
                type="checkbox"
                checked={smsNotificationsEnabled}
                onChange={(e) => setSmsNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span>Müşteriye SMS Onay ve 24 Saat Öncesi Hatırlatma Mesajı Gönder</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-white/80 hover:text-white">
              <input
                type="checkbox"
                checked={whatsappNotificationsEnabled}
                onChange={(e) => setWhatsappNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span>WhatsApp üzerinden randevu özeti ve yol tarifi butonu ilet</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-white/80 hover:text-white">
              <input
                type="checkbox"
                checked={emailNotificationsEnabled}
                onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span>E-Posta ile detaylı rezervasyon onayı ve takvim davetiyesi (.ics) gönder</span>
            </label>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#26262b]">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-accent hover:bg-accent/90 text-background font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Ayarları Kaydet</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium text-xs rounded-xl border border-rose-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Veritabanını Sıfırla (Reset Demo Data)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
