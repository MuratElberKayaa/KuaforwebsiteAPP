import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui';

interface AdminAuthGateProps {
  children: React.ReactNode;
  onReturnToPublic: () => void;
}

const ADMIN_PIN = '1234';
const SESSION_KEY = 'lelixir_admin_auth_v1';

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({
  children,
  onReturnToPublic,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Hatalı şifre girdiniz. Lütfen tekrar deneyiniz.');
      setPin('');
    }
  };

  if (isAuthenticated) {

    return (
      <div className="relative">
        {/* Children rendered with logout ability */}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-white flex items-center justify-center p-4 sm:p-6 selection:bg-accent/30 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#181614] border border-[#2E2924] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 animate-fade-in">
        {/* Top Monogram / Lock Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-glow-gold">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[0.65rem] font-bold tracking-[0.25em] text-accent uppercase block font-sans">
              L'ÉLIXIR Atelier OS
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Yönetim Paneli Girişi
            </h1>
            <p className="text-xs text-white/50 mt-1.5 leading-relaxed">
              Yalnızca yetkili salon personeli ve stüdyo yöneticileri içindir.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl flex items-center gap-2.5 text-red-300 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* PIN Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
              Yönetici Güvenlik Şifresi
            </label>

            <div className="relative flex items-center">
              <KeyRound className="w-5 h-5 text-accent absolute left-4 pointer-events-none" />
              <input
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="Şifrenizi giriniz"
                autoFocus
                className="w-full bg-[#24211D] border border-[#3E3832] rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-white/30 text-center text-lg tracking-widest font-mono font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Şifreyi Göster/Gizle"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            isFullWidth
            className="font-bold py-3.5 shadow-glow-gold hover:shadow-floating cursor-pointer"
          >
            Panele Giriş Yap
          </Button>
        </form>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#2E2924] flex items-center justify-between text-xs text-white/50">
          <button
            type="button"
            onClick={onReturnToPublic}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ana Sayfaya Dön</span>
          </button>

          <div className="flex items-center gap-1 text-accent">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Güvenli Oturum</span>
          </div>
        </div>
      </div>
    </div>
  );
};
