import { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  XCircle,
  Trash2,
  Search,
  Check,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function TestimonialsTab() {
  const {
    testimonials,
    toggleTestimonialVerification,
    deleteTestimonial,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = testimonials.filter(
    (t) =>
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-accent" />
            Müşteri Yorumları & Moderasyon
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {testimonials.length} misafir değerlendirmesi (Onaylananlar web sitesinde yayınlanır)
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Yorum veya misafir ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-56 sm:w-64"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-[#16161a] border border-[#26262b] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-white text-sm">{t.clientName}</h3>
                <div className="flex items-center text-accent">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent" />
                  ))}
                </div>
                <span className="text-white/40 text-[11px]">• {t.date}</span>
                {t.isVerified ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                    Sitede Yayında
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                    Taslak / Beklemede
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-white/50 text-[11px]">
                <span>Hizmet: <strong className="text-accent">{t.serviceName}</strong></span>
                <span>•</span>
                <span>Şube: {t.branchName}</span>
              </div>

              <p className="text-white/80 italic text-xs pt-1">"{t.comment}"</p>
            </div>

            {/* Moderation Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => toggleTestimonialVerification(t.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1 ${
                  t.isVerified
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {t.isVerified ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Yayından Kaldır</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Onayla & Yayınla</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
                    deleteTestimonial(t.id);
                  }
                }}
                className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
