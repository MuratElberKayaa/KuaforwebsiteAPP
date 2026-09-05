import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Input, Textarea, Modal } from '../ui';
import { Lock } from 'lucide-react';

export const Step06Customer: React.FC = () => {
  const {
    customerFirstName,
    setCustomerFirstName,
    customerLastName,
    setCustomerLastName,
    customerPhone,
    setCustomerPhone,
    customerEmail,
    setCustomerEmail,
    customerNote,
    setCustomerNote,
    kvkkConsent,
    setKvkkConsent,
    formErrors,
  } = useBooking();

  const [isKvkkModalOpen, setIsKvkkModalOpen] = useState(false);

  // Phone input mask for Turkish numbers: 05XX XXX XX XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('90')) raw = raw.slice(2);
    if (!raw.startsWith('0') && raw.length > 0) raw = '0' + raw;
    if (raw.length > 11) raw = raw.slice(0, 11);

    // Format as 05XX XXX XX XX
    let formatted = raw;
    if (raw.length > 4 && raw.length <= 7) {
      formatted = `${raw.slice(0, 4)} ${raw.slice(4)}`;
    } else if (raw.length > 7 && raw.length <= 9) {
      formatted = `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7)}`;
    } else if (raw.length > 9) {
      formatted = `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7, 9)} ${raw.slice(9, 11)}`;
    }

    setCustomerPhone(formatted);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          İletişim & Randevu Detayları
        </h3>
        <p className="text-small text-muted mt-1">
          Rezervasyon onay kodunuz ve hatırlatma SMS bildiriminiz bu numaraya iletilecektir.
        </p>
      </div>

      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-subtle space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Adınız"
            placeholder="Örn: Melis"
            value={customerFirstName}
            onChange={(e) => setCustomerFirstName(e.target.value)}
            error={formErrors.firstName}
            required
          />
          <Input
            label="Soyadınız"
            placeholder="Örn: Kaya"
            value={customerLastName}
            onChange={(e) => setCustomerLastName(e.target.value)}
            error={formErrors.lastName}
            required
          />
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Telefon Numaranız"
            placeholder="0532 000 00 00"
            value={customerPhone}
            onChange={handlePhoneChange}
            error={formErrors.phone}
            leftIcon={<span className="text-caption font-bold text-accent">TR</span>}
            required
          />
          <Input
            label="E-Posta Adresiniz"
            placeholder="melis@example.com (Opsiyonel)"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>

        {/* Note / Hair History */}
        <Textarea
          label="Özel Notlar & Saç Geçmişi (Opsiyonel)"
          placeholder="Daha önce saçınızda açma, boya, kına veya keratin uygulandı mı? Beklentilerinizi ve sormak istediklerinizi belirtebilirsiniz."
          value={customerNote}
          onChange={(e) => setCustomerNote(e.target.value)}
          rows={3}
        />

        {/* KVKK Consent Checkbox */}
        <div className="pt-2 border-t border-border/60">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={kvkkConsent}
              onChange={(e) => setKvkkConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent accent-accent cursor-pointer"
            />
            <span className="text-caption text-muted leading-relaxed">
              <button
                type="button"
                onClick={() => setIsKvkkModalOpen(true)}
                className="text-accent-dark underline font-semibold hover:text-foreground"
              >
                KVKK Aydınlatma Metni'ni
              </button>{' '}
              ve Randevu & İptal Koşulları'nı okudum, kişisel verilerimin randevu yönetimi amacıyla işlenmesini onaylıyorum.{' '}
              <span className="text-accent">*</span>
            </span>
          </label>
          {formErrors.kvkk && (
            <p className="text-caption text-error mt-1.5">{formErrors.kvkk}</p>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-caption text-muted pt-2">
          <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Bilgileriniz 256-bit SSL ile şifrelenir ve 3. şahıslarla asla paylaşılmaz.</span>
        </div>
      </div>

      {/* KVKK Modal */}
      <Modal
        isOpen={isKvkkModalOpen}
        onClose={() => setIsKvkkModalOpen(false)}
        title="KVKK Aydınlatma Metni"
        subtitle="6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme"
        size="md"
      >
        <div className="space-y-4 text-small text-muted leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <p>
            L'ÉLIXIR Atelier Hair Studio ("Şirket") olarak, müşterilerimizin kişisel verilerinin güvenliğine ve gizliliğine azami önem vermekteyiz.
          </p>
          <h5 className="font-bold text-foreground">1. İşlenen Kişisel Veriler:</h5>
          <p>
            Randevu oluşturma sürecinde sağladığınız ad, soyad, telefon numarası, e-posta adresi ve saç geçmişi bilgileriniz randevu oluşturulması, SMS/WhatsApp onay bildirimleri gönderilmesi ve hizmet kalitesinin artırılması amacıyla işlenmektedir.
          </p>
          <h5 className="font-bold text-foreground">2. Randevu İptal & Değişiklik Koşulları:</h5>
          <p>
            Oluşturulan randevuları planlanan saatten en geç 12 saat öncesine kadar hiçbir ücret ödemeden değiştirebilir veya iptal edebilirsiniz.
          </p>
        </div>
      </Modal>
    </div>
  );
};
