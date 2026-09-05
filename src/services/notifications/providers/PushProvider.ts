import {
  IPushProvider,
  NotificationChannel,
  NotificationProviderResult,
  NotificationVariables,
} from '../types';

export class MockPushProvider implements IPushProvider {
  channel: NotificationChannel = 'push';

  async send(
    _recipient: string,
    _content: string,
    _subject?: string,
    _variables?: NotificationVariables
  ): Promise<NotificationProviderResult> {
    // Adapter hook for WebPush / Firebase Cloud Messaging (FCM)
    return {
      success: true,
      messageId: `push_msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }
}

