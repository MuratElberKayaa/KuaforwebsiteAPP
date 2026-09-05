export type NotificationEvent =
  | 'BOOKING_CREATED'
  | 'BOOKING_CONFIRMED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_RESCHEDULED'
  | 'APPOINTMENT_REMINDER'
  | 'APPOINTMENT_COMPLETED';

export type NotificationChannel = 'whatsapp' | 'sms' | 'email' | 'push';

export type NotificationDeliveryStatus = 'sent' | 'delivered' | 'failed' | 'queued';

export interface NotificationVariables {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_names: string;
  staff_name: string;
  branch_name: string;
  branch_address: string;
  branch_phone: string;
  date: string;
  time_slot: string;
  booking_code: string;
  total_price: string;
  duration_minutes: string;
  maps_url: string;
  salon_name: string;
  [key: string]: string | undefined;
}

export interface NotificationPayload {
  event: NotificationEvent;
  variables: NotificationVariables;
  recipientPhone: string;
  recipientEmail?: string;
  recipientName: string;
  channels?: NotificationChannel[];
}

export interface NotificationTemplate {
  id: string;
  event: NotificationEvent;
  channel: NotificationChannel;
  title: string;
  subject?: string;
  body: string;
}

export interface NotificationLogEntry {
  id: string;
  event: NotificationEvent;
  channel: NotificationChannel;
  recipient: string;
  recipientName: string;
  subject?: string;
  content: string;
  status: NotificationDeliveryStatus;
  timestamp: string;
  actionUrl?: string; // e.g. direct WhatsApp URL
  error?: string;
}

export interface NotificationProviderResult {
  success: boolean;
  messageId?: string;
  actionUrl?: string;
  error?: string;
}

export interface INotificationProvider {
  channel: NotificationChannel;
  send(
    recipient: string,
    content: string,
    subject?: string,
    variables?: NotificationVariables
  ): Promise<NotificationProviderResult>;
}

export interface IWhatsAppProvider extends INotificationProvider {
  generateDirectChatUrl(phone: string, text: string): string;
}

export interface ISmsProvider extends INotificationProvider {}

export interface IEmailProvider extends INotificationProvider {}

export interface IPushProvider extends INotificationProvider {}

