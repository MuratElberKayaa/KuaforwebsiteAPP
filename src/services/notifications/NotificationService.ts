import {
  NotificationChannel,
  NotificationPayload,
  NotificationLogEntry,
  NotificationTemplate,
  INotificationProvider,
  IWhatsAppProvider,
} from './types';
import {
  defaultNotificationTemplates,
  renderTemplate,
} from './templateEngine';
import { MockWhatsAppProvider } from './providers/WhatsAppProvider';
import { MockSmsProvider } from './providers/SmsProvider';
import { MockEmailProvider } from './providers/EmailProvider';
import { MockPushProvider } from './providers/PushProvider';

const LOGS_STORAGE_KEY = 'lelixir_notifications_log_v1';

const initialMockLogs: NotificationLogEntry[] = [
  {
    id: 'notif-log-1',
    event: 'BOOKING_CONFIRMED',
    channel: 'whatsapp',
    recipient: '0532 890 12 34',
    recipientName: 'Selin Yılmaz',
    content: `Sayın Selin Yılmaz,

L'ÉLIXIR Atelier Hair & Beauty Studio randevunuz onaylanmıştır! ✨

📋 Rezervasyon Kodu: ELX-8921
✂️ Hizmet: Artisanal Balayage & Hair Botox
💇 Uzmanınız: Selin Varol
📅 Tarih: 2026-09-05
⏰ Saat: 10:30
🏢 Şube: Nişantaşı Flagship Studio (Abdi İpekçi Cad. No: 42/3)

İyi günler dileriz. ⚜️`,
    status: 'delivered',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actionUrl: 'https://wa.me/905328901234?text=Say%C4%B1n%20Selin%20Y%C4%B1lmaz...',
  },
  {
    id: 'notif-log-2',
    event: 'BOOKING_CREATED',
    channel: 'sms',
    recipient: '0533 123 45 67',
    recipientName: 'Melis Doğan',
    content: `Sayin Melis Doğan, L'ÉLIXIR Atelier icin 2026-09-05 saat 11:00 tarihli randevu talebiniz alinmistir. Kod: ELX-8922 Bilgi: +90 (212) 234 50 60`,
    status: 'delivered',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'notif-log-3',
    event: 'APPOINTMENT_REMINDER',
    channel: 'whatsapp',
    recipient: '0542 987 65 43',
    recipientName: 'Leyla Erdem',
    content: `Sayın Leyla Erdem,

Bugün 14:00 saatinde L'ÉLIXIR Atelier (Bebek Waterfront Suite) randevunuz bulunmaktadır. Sizi bekliyoruz! ✨`,
    status: 'delivered',
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    actionUrl: 'https://wa.me/905429876543?text=Say%C4%B1n%20Leyla%20Erdem...',
  },
];

class NotificationServiceManager {
  private providers: Map<NotificationChannel, INotificationProvider> = new Map();
  private templates: NotificationTemplate[] = defaultNotificationTemplates;

  constructor() {
    // Register default pluggable providers
    this.registerProvider(new MockWhatsAppProvider());
    this.registerProvider(new MockSmsProvider());
    this.registerProvider(new MockEmailProvider());
    this.registerProvider(new MockPushProvider());
  }

  /**
   * Register or replace a channel provider at runtime (e.g. swap Mock for NetGSM or Twilio)
   */
  public registerProvider(provider: INotificationProvider): void {
    this.providers.set(provider.channel, provider);
  }

  public getWhatsAppProvider(): IWhatsAppProvider | undefined {
    return this.providers.get('whatsapp') as IWhatsAppProvider | undefined;
  }

  public getTemplates(): NotificationTemplate[] {
    return this.templates;
  }

  public getLogs(): NotificationLogEntry[] {
    const saved = localStorage.getItem(LOGS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialMockLogs;
      }
    }
    return initialMockLogs;
  }

  public saveLogs(logs: NotificationLogEntry[]): void {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }

  public clearLogs(): void {
    localStorage.removeItem(LOGS_STORAGE_KEY);
  }

  /**
   * Dispatches notifications to the specified or default channels
   */
  public async dispatch(payload: NotificationPayload): Promise<NotificationLogEntry[]> {
    const channels = payload.channels || ['whatsapp', 'sms'];
    const newLogs: NotificationLogEntry[] = [];
    const currentLogs = this.getLogs();

    for (const channel of channels) {
      const provider = this.providers.get(channel);
      if (!provider) continue;

      // Find matching template
      const template = this.templates.find(
        (t) => t.event === payload.event && t.channel === channel
      );

      const content = template
        ? renderTemplate(template.body, payload.variables)
        : `Randevu Bilgilendirmesi: ${payload.variables.booking_code} - ${payload.variables.date}`;

      const subject = template?.subject
        ? renderTemplate(template.subject, payload.variables)
        : undefined;

      const recipient =
        channel === 'email'
          ? payload.recipientEmail || payload.recipientPhone
          : payload.recipientPhone;

      try {
        const result = await provider.send(
          recipient,
          content,
          subject,
          payload.variables
        );

        const logEntry: NotificationLogEntry = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          event: payload.event,
          channel,
          recipient,
          recipientName: payload.recipientName,
          subject,
          content,
          status: result.success ? 'delivered' : 'failed',
          timestamp: new Date().toISOString(),
          actionUrl: result.actionUrl,
          error: result.error,
        };

        newLogs.push(logEntry);
      } catch (err: any) {
        newLogs.push({
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          event: payload.event,
          channel,
          recipient,
          recipientName: payload.recipientName,
          subject,
          content,
          status: 'failed',
          timestamp: new Date().toISOString(),
          error: err?.message || 'Bilinmeyen hata',
        });
      }
    }

    const updatedLogs = [...newLogs, ...currentLogs];
    this.saveLogs(updatedLogs);
    return newLogs;
  }
}

export const NotificationService = new NotificationServiceManager();
