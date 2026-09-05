import {
  IEmailProvider,
  NotificationChannel,
  NotificationProviderResult,
  NotificationVariables,
} from '../types';

export class MockEmailProvider implements IEmailProvider {
  channel: NotificationChannel = 'email';

  async send(
    _recipient: string,
    _content: string,
    _subject?: string,
    _variables?: NotificationVariables
  ): Promise<NotificationProviderResult> {
    // Adapter hook for SendGrid, Resend, or AWS SES HTML email service
    return {
      success: true,
      messageId: `email_msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }
}

