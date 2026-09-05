import {
  IWhatsAppProvider,
  NotificationChannel,
  NotificationProviderResult,
  NotificationVariables,
} from '../types';

export class MockWhatsAppProvider implements IWhatsAppProvider {
  channel: NotificationChannel = 'whatsapp';

  /**
   * Cleans phone number to international format (e.g. 0532 123 45 67 -> 905321234567)
   */
  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      return '9' + cleaned;
    }
    if (!cleaned.startsWith('90') && cleaned.length === 10) {
      return '90' + cleaned;
    }
    return cleaned;
  }

  /**
   * Generates a direct WhatsApp web/app click-to-chat URL with prefilled URL-encoded message text
   */
  generateDirectChatUrl(phone: string, text: string): string {
    const formattedPhone = this.formatPhoneNumber(phone);
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${formattedPhone}?text=${encodedText}`;
  }

  async send(
    recipient: string,
    content: string,
    _subject?: string,
    _variables?: NotificationVariables
  ): Promise<NotificationProviderResult> {
    const actionUrl = this.generateDirectChatUrl(recipient, content);

    // In a real cloud backend, this would call WhatsApp Business Cloud API (Meta Graph API)
    // e.g.: await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, ...)

    return {
      success: true,
      messageId: `wa_msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      actionUrl,
    };
  }
}

