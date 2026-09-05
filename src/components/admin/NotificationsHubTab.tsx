import { useState } from 'react';
import {
  Bell,
  MessageCircle,
  Mail,
  Smartphone,
  CheckCircle2,
  Search,
  Send,
  RefreshCw,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { NotificationService } from '../../services/notifications/NotificationService';
import {
  NotificationLogEntry,
  NotificationChannel,
  NotificationEvent,
  NotificationTemplate,
} from '../../services/notifications/types';
import { renderTemplate } from '../../services/notifications/templateEngine';

export function NotificationsHubTab() {
  const { settings, branches, services, team } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'logs' | 'templates'>('logs');
  const [logs, setLogs] = useState<NotificationLogEntry[]>(() =>
    NotificationService.getLogs()
  );

  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Log for detail modal
  const [selectedLog, setSelectedLog] = useState<NotificationLogEntry | null>(null);

  // Template preview & test state
  const templates = NotificationService.getTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(
    templates[0]
  );
  const [testPhone, setTestPhone] = useState('0532 890 12 34');
  const [testName, setTestName] = useState('Selin Yılmaz');
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const refreshLogs = () => {
    setLogs(NotificationService.getLogs());
  };

  const filteredLogs = logs.filter((l) => {
    const matchChannel = channelFilter === 'all' || l.channel === channelFilter;
    const matchEvent = eventFilter === 'all' || l.event === eventFilter;
    const matchSearch =
      searchQuery === '' ||
      l.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipient.includes(searchQuery) ||
      l.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchChannel && matchEvent && matchSearch;
  });

  const getChannelBadge = (channel: NotificationChannel) => {
    switch (channel) {
      case 'whatsapp':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <MessageCircle className="w-3 h-3" />
            WhatsApp
          </span>
        );
      case 'sms':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Smartphone className="w-3 h-3" />
            SMS
          </span>
        );
      case 'email':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Mail className="w-3 h-3" />
            E-Posta
          </span>
        );
      case 'push':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Bell className="w-3 h-3" />
            Push
          </span>
        );
    }
  };

  const getEventLabel = (event: NotificationEvent) => {
    switch (event) {
      case 'BOOKING_CREATED':
        return 'Randevu Talebi Alındı';
      case 'BOOKING_CONFIRMED':
        return 'Randevu Onaylandı';
      case 'BOOKING_RESCHEDULED':
        return 'Randevu Ertelendi';
      case 'BOOKING_CANCELLED':
        return 'Randevu İptal';
      case 'APPOINTMENT_REMINDER':
        return '24 Saat Hatırlatması';
      case 'APPOINTMENT_COMPLETED':
        return 'Tamamlandı & Teşekkür';
    }
  };

  const handleSendTestNotification = async () => {
    const sampleBranch = branches[0];
    const sampleService = services[0];
    const sampleStaff = team[0];

    await NotificationService.dispatch({
      event: selectedTemplate.event,
      channels: [selectedTemplate.channel],
      recipientPhone: testPhone,
      recipientName: testName,
      variables: {
        customer_name: testName,
        customer_phone: testPhone,
        service_names: sampleService?.name || 'Artisanal Balayage & Care',
        staff_name: sampleStaff?.name || 'Selin Varol',
        branch_name: sampleBranch?.name || 'Nişantaşı Flagship Studio',
        branch_address: sampleBranch?.address || 'Abdi İpekçi Cad. No: 42',
        branch_phone: sampleBranch?.phone || '+90 (212) 234 50 60',
        date: new Date().toISOString().split('T')[0],
        time_slot: '14:30',
        booking_code: `ELX-${Math.floor(1000 + Math.random() * 9000)}`,
        total_price: '4.800 ₺',
        duration_minutes: '120',
        maps_url: sampleBranch?.googleMapsUrl || 'https://maps.google.com',
        salon_name: settings.salonName,
      },
    });

    refreshLogs();
    setTestSuccessMessage('Test bildirimi başarıyla gönderildi ve günlüğe kaydedildi!');
    setTimeout(() => setTestSuccessMessage(null), 3000);
  };

  // Render sample preview
  const sampleVariables = {
    customer_name: testName,
    customer_phone: testPhone,
    service_names: services[0]?.name || 'Artisanal Balayage',
    staff_name: team[0]?.name || 'Selin Varol',
    branch_name: branches[0]?.name || 'Nişantaşı Flagship Studio',
    branch_address: branches[0]?.address || 'Abdi İpekçi Cad. No: 42, İstanbul',
    branch_phone: branches[0]?.phone || '+90 (212) 234 50 60',
    date: '2026-09-08',
    time_slot: '11:00',
    booking_code: 'ELX-9820',
    total_price: '4.500 ₺',
    duration_minutes: '90',
    maps_url: 'https://maps.google.com/?q=Nisantasi+Istanbul',
    salon_name: settings.salonName,
  };

  const renderedPreviewBody = renderTemplate(
    selectedTemplate.body,
    sampleVariables
  );

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Çok Kanallı Bildirim Merkezi (Notification Hub)
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            WhatsApp, SMS, E-Posta ve Push bildirim günlüğü ile şablon yönetimi
          </p>
        </div>

        {/* Subtabs */}
        <div className="bg-[#202025] border border-[#2e2e36] rounded-lg p-1 flex items-center text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'logs'
                ? 'bg-accent text-background font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Bildirim Günlüğü ({logs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'templates'
                ? 'bg-accent text-background font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Mesaj Şablonları & Test
          </button>
        </div>
      </div>

      {/* 1. Live Notification Logs Tab */}
      {activeSubTab === 'logs' && (
        <div className="space-y-4">
          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#16161a] border border-[#26262b] p-3 rounded-xl text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Alıcı, telefon veya içerik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-48 sm:w-60"
                />
              </div>

              {/* Channel Filter */}
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-hidden"
              >
                <option value="all">Tüm Kanallar</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="sms">SMS</option>
                <option value="email">E-Posta</option>
                <option value="push">Push</option>
              </select>

              {/* Event Filter */}
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-hidden"
              >
                <option value="all">Tüm Olaylar</option>
                <option value="BOOKING_CREATED">Randevu Talebi</option>
                <option value="BOOKING_CONFIRMED">Onay Bildirimi</option>
                <option value="BOOKING_RESCHEDULED">Ertelenme</option>
                <option value="BOOKING_CANCELLED">İptal</option>
                <option value="APPOINTMENT_REMINDER">Hatırlatma</option>
                <option value="APPOINTMENT_COMPLETED">Teşekkür</option>
              </select>
            </div>

            <button
              onClick={refreshLogs}
              className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg transition-colors border border-white/5 flex items-center gap-1 text-[11px]"
              title="Güncelle"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Yenile</span>
            </button>
          </div>

          {/* Logs Table */}
          <div className="bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1c22] text-white/50 border-b border-[#26262b] uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Kanal & Olay</th>
                    <th className="py-3 px-4">Alıcı (Misafir)</th>
                    <th className="py-3 px-4">Mesaj Özeti</th>
                    <th className="py-3 px-4">Zaman</th>
                    <th className="py-3 px-4">Durum</th>
                    <th className="py-3 px-4 text-right">Eylem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26262b] text-white/80">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-white/40">
                        Bildirim kaydı bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className="hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div>{getChannelBadge(log.channel)}</div>
                            <span className="text-[11px] text-white/50 block">
                              {getEventLabel(log.event)}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-white block">
                            {log.recipientName}
                          </span>
                          <span className="text-[11px] text-white/40 font-mono block">
                            {log.recipient}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <p className="text-[11px] text-white/70 line-clamp-2 italic">
                            "{log.content}"
                          </p>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-white/50 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          <span className="block text-[10px] opacity-70">
                            {new Date(log.timestamp).toLocaleDateString('tr-TR')}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            İletildi
                          </span>
                        </td>

                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            {log.actionUrl && log.channel === 'whatsapp' && (
                              <a
                                href={log.actionUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold rounded text-[11px] flex items-center gap-1 border border-emerald-500/30"
                                title="WhatsApp Web Üzerinden Aç"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            )}
                            <button
                              onClick={() => setSelectedLog(log)}
                              className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded text-[11px] border border-white/5"
                            >
                              Gözat
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Message Templates & Preview Simulator */}
      {activeSubTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Template Selector */}
          <div className="lg:col-span-5 bg-[#16161a] border border-[#26262b] rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Mesaj Şablonları Listesi
            </h3>

            <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
              {templates.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors space-y-1 ${
                      isSelected
                        ? 'bg-accent/15 border-accent text-white'
                        : 'bg-[#1c1c22] border-[#2e2e36] text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{tmpl.title}</span>
                      {getChannelBadge(tmpl.channel)}
                    </div>
                    <p className="text-[11px] text-white/40 line-clamp-1">
                      {tmpl.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Preview & Test Trigger */}
          <div className="lg:col-span-7 bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <div>
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
                  Canlı Şablon Önizlemesi
                </span>
                <h3 className="text-sm font-bold text-white">
                  {selectedTemplate.title}
                </h3>
              </div>
              {getChannelBadge(selectedTemplate.channel)}
            </div>

            {/* Simulated Phone Bubble Preview */}
            <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-white/40 border-b border-white/5 pb-2">
                <span>Gönderici: <strong>{settings.salonName}</strong></span>
                <span>Önizleme</span>
              </div>

              {selectedTemplate.subject && (
                <div className="text-xs font-bold text-accent pb-1 border-b border-white/5">
                  Konu: {renderTemplate(selectedTemplate.subject, sampleVariables)}
                </div>
              )}

              <div className="p-3.5 bg-[#121214] rounded-lg border border-white/10 font-sans text-xs text-white/90 whitespace-pre-wrap leading-relaxed shadow-inner">
                {renderedPreviewBody}
              </div>
            </div>

            {/* Test Send Controls */}
            <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-accent" />
                  Test Bildirimi Tetikle
                </span>
                {testSuccessMessage && (
                  <span className="text-[11px] text-emerald-400 font-semibold animate-fade-in">
                    {testSuccessMessage}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1">
                    Test Alıcı Adı:
                  </label>
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2 text-white text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1">
                    Test Telefon / E-posta:
                  </label>
                  <input
                    type="text"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2 text-white text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <button
                onClick={handleSendTestNotification}
                className="w-full py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test Bildirimini Simüle Et & Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Log Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <div>
                <span className="text-[10px] text-accent font-bold">
                  {selectedLog.id}
                </span>
                <h3 className="text-sm font-bold text-white">
                  Bildirim Gönderim Detayı
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#1c1c22] rounded-xl border border-white/5 text-[11px]">
                <div>
                  <span className="text-white/40 block">Kanal</span>
                  <strong>{selectedLog.channel.toUpperCase()}</strong>
                </div>
                <div>
                  <span className="text-white/40 block">Olay</span>
                  <strong>{getEventLabel(selectedLog.event)}</strong>
                </div>
                <div>
                  <span className="text-white/40 block">Alıcı</span>
                  <strong>{selectedLog.recipientName} ({selectedLog.recipient})</strong>
                </div>
                <div>
                  <span className="text-white/40 block">Zaman</span>
                  <strong>{new Date(selectedLog.timestamp).toLocaleString('tr-TR')}</strong>
                </div>
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-semibold uppercase text-[10px]">
                  İletilen Mesaj Metni
                </label>
                <div className="p-3 bg-[#121214] rounded-xl border border-white/10 text-white/90 whitespace-pre-wrap font-sans text-xs leading-relaxed max-h-60 overflow-y-auto">
                  {selectedLog.content}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#26262b]">
              {selectedLog.actionUrl && selectedLog.channel === 'whatsapp' ? (
                <a
                  href={selectedLog.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Web'de Aç</span>
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/15"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
