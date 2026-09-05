import {
  ISmsProvider,
  NotificationChannel,
  NotificationProviderResult,
  NotificationVariables,
} from '../types';

export class MockSmsProvider implements ISmsProvider {
  channel: NotificationChannel = 'sms';

  async send(
    _recipient: string,
    _content: string,
    _subject?: string,
    _variables?: NotificationVariables
  ): Promise<NotificationProviderResult> {
    // Adapter hook for NetGSM, IletiMerkezi, or Twilio SMS gateways
    return {
      success: true,
      messageId: `sms_msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }
}

