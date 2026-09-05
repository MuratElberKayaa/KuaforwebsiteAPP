import {
  NotificationTemplate,
  NotificationVariables,
} from './types';

export const defaultNotificationTemplates: NotificationTemplate[] = [
  // 1. BOOKING_CREATED (WhatsApp)
  {
    id: 'tmpl-wa-created',
    event: 'BOOKING_CREATED',
    channel: 'whatsapp',
    title: 'WhatsApp — Randevu Talebi Alındı',
    body: `Sayın {{customer_name}},

*{{salon_name}}* üzerinden randevu talebiniz başarıyla alınmıştır. ⚜️

📋 *Randevu Kodu:* {{booking_code}}
✂️ *Hizmet:* {{service_names}}
💇 *Uzman:* {{staff_name}}
🏢 *Şube:* {{branch_name}}
📅 *Tarih & Saat:* {{date}} saat {{time_slot}}
⏱️ *Tahmini Süre:* {{duration_minutes}} dk
💳 *Tutar:* {{total_price}}

Randevunuz salonumuz tarafından incelenmekte olup kısa süre içinde onay mesajı iletilecektir.

Her türlü soru ve değişiklik için bize bu hattan yazabilirsiniz. ✨`,
  },

  // 2. BOOKING_CREATED (SMS)
  {
    id: 'tmpl-sms-created',
    event: 'BOOKING_CREATED',
    channel: 'sms',
    title: 'SMS — Randevu Talebi Alındı',
    body: `Sayin {{customer_name}}, {{salon_name}} icin {{date}} saat {{time_slot}} tarihli randevu talebiniz alinmistir. Kod: {{booking_code}} Bilgi: {{branch_phone}}`,
  },

  // 3. BOOKING_CREATED (Email)
  {
    id: 'tmpl-email-created',
    event: 'BOOKING_CREATED',
    channel: 'email',
    title: 'E-Posta — Randevu Talebiniz Alındı',
    subject: `{{salon_name}} — Randevu Talebiniz Alındı (Kod: {{booking_code}})`,
    body: `Sayın {{customer_name}},

{{salon_name}} stüdyomuzdan oluşturduğunuz randevu talebiniz alınmıştır.

RANDEVU DETAYLARI:
• Randevu Kodu: {{booking_code}}
• Hizmet(ler): {{service_names}}
• Uzman: {{staff_name}}
• Şube: {{branch_name}}
• Adres: {{branch_address}}
• Tarih ve Saat: {{date}} - {{time_slot}}
• Tahmini Tutar: {{total_price}}

Stüdyomuz randevunuzu onayladığında size onay bildirimi iletilecektir.

L'ÉLIXIR Atelier Hair & Beauty`,
  },

  // 4. BOOKING_CONFIRMED (WhatsApp)
  {
    id: 'tmpl-wa-confirmed',
    event: 'BOOKING_CONFIRMED',
    channel: 'whatsapp',
    title: 'WhatsApp — Randevu Onaylandı',
    body: `Sayın {{customer_name}},

*{{salon_name}}* randevunuz onaylanmıştır! ✨

Sizi ağırlamayı sabırsızlıkla bekliyoruz.

📋 *Rezervasyon Kodu:* {{booking_code}}
✂️ *Hizmet:* {{service_names}}
💇 *Uzmanınız:* {{staff_name}}
📅 *Tarih:* {{date}}
⏰ *Saat:* {{time_slot}}
🏢 *Şube:* {{branch_name}}
📍 *Adres:* {{branch_address}}
🗺️ *Yol Tarifi:* {{maps_url}}

Lütfen randevu saatinizden 10 dakika önce stüdyomuzda bulunmanızı rica ederiz. İkram kahveniz hazır olacak. ☕

İyi günler dileriz. ⚜️`,
  },

  // 5. BOOKING_CONFIRMED (SMS)
  {
    id: 'tmpl-sms-confirmed',
    event: 'BOOKING_CONFIRMED',
    channel: 'sms',
    title: 'SMS — Randevu Onaylandı',
    body: `Sayin {{customer_name}}, {{date}} saat {{time_slot}} {{branch_name}} randevunuz onaylanmistir. Uzman: {{staff_name}} Kod: {{booking_code}} Yol tarifi: {{maps_url}}`,
  },

  // 6. BOOKING_RESCHEDULED (WhatsApp)
  {
    id: 'tmpl-wa-rescheduled',
    event: 'BOOKING_RESCHEDULED',
    channel: 'whatsapp',
    title: 'WhatsApp — Randevu Güncellendi (Ertelendi)',
    body: `Sayın {{customer_name}},

*{{booking_code}}* kodlu randevunuzun tarihi talebiniz üzerine güncellenmiştir. 🔄

📅 *Yeni Tarih:* {{date}}
⏰ *Yeni Saat:* {{time_slot}}
✂️ *Hizmet:* {{service_names}}
💇 *Uzman:* {{staff_name}}
🏢 *Şube:* {{branch_name}} ({{branch_address}})

Değişiklik veya sorularınız için bu mesajı yanıtlayabilirsiniz. ✨`,
  },

  // 7. BOOKING_CANCELLED (WhatsApp)
  {
    id: 'tmpl-wa-cancelled',
    event: 'BOOKING_CANCELLED',
    channel: 'whatsapp',
    title: 'WhatsApp — Randevu İptali',
    body: `Sayın {{customer_name}},

*{{booking_code}}* kodlu {{date}} saat {{time_slot}} randevunuz iptal edilmiştir.

Sizi en kısa sürede tekrar aramızda görmekten mutluluk duyarız. Yeni bir randevu oluşturmak için web sitemizi ziyaret edebilir veya bu hattan bize yazabilirsiniz. 🌿

*{{salon_name}}*`,
  },

  // 8. APPOINTMENT_REMINDER (WhatsApp)
  {
    id: 'tmpl-wa-reminder',
    event: 'APPOINTMENT_REMINDER',
    channel: 'whatsapp',
    title: 'WhatsApp — 24 Saat Öncesi Hatırlatma',
    body: `Sayın {{customer_name}},

Yarın *{{time_slot}}* saatinde *{{salon_name}} ({{branch_name}})* randevunuz bulunmaktadır. ⏳

✂️ *Hizmet:* {{service_names}}
💇 *Uzman:* {{staff_name}}
📍 *Adres:* {{branch_address}}

Geleceğinizi teyit etmek için bu mesaja *EVET* yazabilir, değişiklik için bize ulaşabilirsiniz. Sizi bekliyoruz! ✨`,
  },

  // 9. APPOINTMENT_COMPLETED (WhatsApp)
  {
    id: 'tmpl-wa-completed',
    event: 'APPOINTMENT_COMPLETED',
    channel: 'whatsapp',
    title: 'WhatsApp — Tamamlandı & Teşekkür / Değerlendirme',
    body: `Sayın {{customer_name}},

Bugün *{{salon_name}}* stüdyomuzu ziyaret ettiğiniz için teşekkür ederiz! Saçlarınızın ışıltısını güle güle kullanın. ✨

Uzmanımız *{{staff_name}}* tarafından uygulanan bakımın kalıcılığı için önerilen ev devam ürünlerini düzenli kullanmanızı tavsiye ederiz.

Deneyiminizi 1 dakikada değerlendirmek ister misiniz? 🌟
Google Yorum Linki: {{maps_url}}

Bir sonraki buluşmamıza kadar sağlıkla kalın. ⚜️`,
  },
];

/**
 * Interpolates variables into template strings (e.g. {{customer_name}} -> "Selin Yılmaz")
 */
export function renderTemplate(
  templateString: string,
  variables: NotificationVariables
): string {
  return templateString.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`;
  });
}
