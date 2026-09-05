import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  UserCheck,
  Building2,
  Clock,
  Image as ImageIcon,
  MessageSquareHeart,
  Tag,
  Bell,
  Settings,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminTabType } from '../../types';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onReturnToPublic: () => void;
}

export function AdminSidebar({
  isOpen,
  onToggle,
  onReturnToPublic,
}: AdminSidebarProps) {
  const { currentTab, setCurrentTab, appointments } = useAdmin();

  const pendingAppointmentsCount = appointments.filter(
    (a) => a.status === 'pending'
  ).length;

  const navItems: {
    id: AdminTabType;
    label: string;
    icon: any;
    badge?: number;
  }[] = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
    {
      id: 'appointments',
      label: 'Randevu Takvimi',
      icon: Calendar,
      badge: pendingAppointmentsCount,
    },
    { id: 'customers', label: 'Müşteri CRM', icon: Users },
    { id: 'services', label: 'Hizmetler', icon: Scissors },
    { id: 'team', label: 'Ekip & Uzmanlar', icon: UserCheck },
    { id: 'branches', label: 'Şubeler', icon: Building2 },
    { id: 'working-hours', label: 'Saatler & İzinler', icon: Clock },
    { id: 'portfolio', label: 'Portfolyo', icon: ImageIcon },
    { id: 'testimonials', label: 'Yorum Moderasyonu', icon: MessageSquareHeart },
    { id: 'campaigns', label: 'Kampanyalar & Kupon', icon: Tag },
    { id: 'notifications-hub', label: 'Bildirim Merkezi', icon: Bell },
    { id: 'settings', label: 'Salon Ayarları', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#121214] text-white border-r border-[#26262b] transition-all duration-300 ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#26262b]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-serif font-bold text-lg shrink-0">
              L
            </div>
            {isOpen && (
              <div className="leading-tight">
                <span className="font-serif font-bold tracking-widest text-sm text-accent uppercase block">
                  L'ÉLIXIR
                </span>
                <span className="text-[10px] tracking-wider text-white/50 uppercase block font-sans">
                  Salon Portal OS
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            aria-label={isOpen ? 'Menüyü Daralt' : 'Menüyü Genişlet'}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                !isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                title={!isOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent text-background shadow-xs font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } ${!isOpen ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-background' : 'text-white/70'}`} />

                {isOpen && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`inline-flex items-center justify-center text-xs px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                      isActive
                        ? 'bg-background text-accent'
                        : 'bg-accent/20 text-accent border border-accent/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer & Return to Website */}
        <div className="p-3 border-t border-[#26262b] space-y-2">
          <button
            onClick={onReturnToPublic}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10 ${
              !isOpen ? 'justify-center' : ''
            }`}
            title="Web Sitesine Dön"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-accent" />
            {isOpen && <span>Web Sitesine Dön</span>}
          </button>

          {isOpen && (
            <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                MK
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white truncate">Murat Kaya</p>
                <p className="text-[10px] text-white/40 truncate">Salon Direktörü</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
