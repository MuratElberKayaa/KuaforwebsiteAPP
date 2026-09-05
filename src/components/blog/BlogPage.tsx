import { useState } from 'react';
import {
  Clock,
  Search,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Quote,
  Flame,
  Mail,
  Check,
} from 'lucide-react';
import { Container } from '../ui';
import { blogPostsData } from '../../data/blogData';
import { BlogPost, BlogCategory } from '../../types';
import { SeoHead } from '../seo/SeoHead';
import { generateBreadcrumbSchema } from '../seo/schemaGenerators';

interface BlogPageProps {
  onSelectPost: (post: BlogPost) => void;
  onNavigateHome: () => void;
}

export function BlogPage({ onSelectPost, onNavigateHome }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 7 Core Categories + All
  const categories: { id: 'all' | BlogCategory; label: string }[] = [
    { id: 'all', label: 'Tüm Yazılar' },
    { id: 'sac-trendleri', label: 'Saç Trendleri' },
    { id: 'sac-bakimi', label: 'Saç Bakımı' },
    { id: 'sac-renkleri', label: 'Saç Renkleri' },
    { id: 'gelin', label: 'Gelin' },
    { id: 'styling', label: 'Styling' },
    { id: 'erkek', label: 'Erkek' },
    { id: 'salon-rehberi', label: 'Salon Rehberi' },
  ];

  const filteredPosts = blogPostsData.filter((post) => {
    const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredPost = blogPostsData[0];
  const sideFeaturedPosts = blogPostsData.slice(1, 3);
  const remainingPosts = filteredPosts.filter((p) =>
    selectedCategory === 'all' && searchQuery === '' ? p.id !== featuredPost.id : true
  );

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: "L'ÉLIXIR Dergi & Saç Sanatı", url: '/dergi' },
  ]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="py-10 lg:py-16 bg-background text-foreground animate-fade-in">
      {/* Dynamic SEO Meta */}
      <SeoHead
        title="L'ÉLIXIR Journal — Haute Coiffure, Saç Trendleri ve Editoryal Bakım Rehberi"
        description="2026 saç modası, artisanal balayage trendleri, boyalı saçlar için profesyonel evde bakım rehberi ve yüz tipine göre kesim tavsiyeleri."
        canonicalUrl="https://lelixir-atelier.com/#/dergi"
        schemaJson={breadcrumbsSchema}
      />

      <Container size="full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-caption text-muted mb-8" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-foreground transition-colors">
            Ana Sayfa
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">L'ÉLIXIR Journal & Editoryal Dergi</span>
        </nav>

        {/* Magazine Editorial Masthead */}
        <div className="text-center max-w-4xl mx-auto mb-12 border-b border-border pb-10">
          <div className="inline-flex items-center gap-2 bg-secondary text-accent font-mono text-caption uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-border mb-4">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            L'ÉLIXIR EDITORIAL BEAUTY JOURNAL • SAYI NO. 24
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
            L'ÉLIXIR JOURNAL
          </h1>
          
          <p className="font-serif italic text-lg sm:text-xl text-muted-dark mt-3 max-w-2xl mx-auto font-light">
            Haute coiffure vizyonu, yeni sezon renk mimarisi ve usta stilistlerimizin imza saç sanatı rehberleri.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-lg mx-auto mt-8 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Trend, renk tekniği, bakım ritüeli veya stilist ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-full pl-11 pr-10 py-3 text-small text-foreground placeholder-muted focus:outline-none focus:border-accent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills (7 Requested Categories) */}
          <div className="flex items-center justify-center gap-2 mt-7 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-dark-surface text-background shadow-card scale-105'
                    : 'bg-card text-foreground/70 hover:text-foreground border border-border hover:border-accent/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Hero Cover Article + Side Highlights (When in default state) */}
        {searchQuery === '' && selectedCategory === 'all' && featuredPost && (
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Grand Lead Editorial Cover Story */}
              <div
                onClick={() => onSelectPost(featuredPost)}
                className="lg:col-span-8 group relative bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/50 hover:shadow-card transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                <div className="h-[360px] sm:h-[460px] overflow-hidden relative">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 via-dark-surface/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-accent text-background font-bold text-caption uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Kapak Başyazısı
                    </span>
                    <span className="bg-dark-surface/80 backdrop-blur-xs text-background font-semibold text-caption uppercase px-3 py-1.5 rounded-full border border-white/20">
                      {featuredPost.categoryLabel}
                    </span>
                  </div>

                  {/* Text Overlay on Large Screens */}
                  <div className="absolute bottom-6 left-6 right-6 text-background space-y-3">
                    <div className="flex items-center gap-3 text-caption text-background/80">
                      <span>{featuredPost.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        {featuredPost.readTimeMinutes} dakika okuma
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-background group-hover:text-accent transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-small text-background/80 line-clamp-2 max-w-2xl font-light">
                      {featuredPost.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-card border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        {featuredPost.authorName}
                      </span>
                      <span className="text-caption text-accent block">
                        {featuredPost.authorRole}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:translate-x-1.5 transition-transform uppercase tracking-wider">
                    Makaleyi Keşfet <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Side Trending Editorial Stack */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Editörün Seçtikleri
                    </span>
                  </div>
                  <span className="text-caption font-mono text-muted">ÖNE ÇIKANLAR</span>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  {sideFeaturedPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => onSelectPost(post)}
                      className="group bg-card border border-border rounded-2xl p-4 hover:border-accent/40 hover:shadow-card transition-all cursor-pointer flex-1 flex flex-col justify-between"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-secondary">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="text-caption text-accent font-semibold block uppercase">
                            {post.categoryLabel}
                          </span>
                          <h3 className="font-serif font-bold text-foreground text-small group-hover:text-accent-dark transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <span className="text-caption text-muted flex items-center gap-1">
                            <Clock className="w-3 h-3 text-accent" />
                            {post.readTimeMinutes} dk okuma
                          </span>
                        </div>
                      </div>

                      {post.pullQuote && (
                        <div className="mt-3 pt-3 border-t border-border/60 text-caption italic text-muted-dark line-clamp-2">
                          "{post.pullQuote.text}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Magazine Grid Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {selectedCategory === 'all'
                ? 'Tüm Makaleler & Editoryal Arşiv'
                : categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-xs text-muted-dark mt-1">
              Toplam {filteredPosts.length} makale listeleniyor
            </p>
          </div>
        </div>

        {/* Editorial Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 max-w-md mx-auto space-y-4">
            <Search className="w-8 h-8 text-muted mx-auto" />
            <h3 className="font-serif text-xl font-bold text-foreground">
              Aradığınız kriterde yazı bulunamadı
            </h3>
            <p className="text-small text-muted-dark">
              Farklı bir arama terimi deneyebilir veya kategoriyi değiştirebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-accent underline"
            >
              Tüm Yazıları Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {remainingPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-card transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-dark-surface/90 backdrop-blur-xs text-background font-semibold text-caption uppercase px-3 py-1 rounded-full border border-border/50">
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-caption text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        {post.readTimeMinutes} dk okuma
                      </span>
                      <span>•</span>
                      <span>{post.publishedDate}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-accent-dark transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-small text-muted-dark leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>

                    {/* Pull-quote preview snippet if available */}
                    {post.pullQuote && (
                      <div className="p-3 bg-secondary/80 rounded-lg border-l-2 border-l-accent flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <p className="text-caption italic text-foreground/80 line-clamp-2">
                          "{post.pullQuote.text}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Author & Read More */}
                <div className="p-6 pt-0 border-t border-border/60 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 pt-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-caption font-semibold text-foreground/80 block">
                        {post.authorName}
                      </span>
                    </div>
                  </div>

                  <span className="text-caption font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 pt-3">
                    Devamını Oku <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Private VIP Editorial Magazine Newsletter */}
        <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 overflow-hidden text-center max-w-3xl mx-auto shadow-card">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent font-bold">
              L'ÉLIXIR PRIVATE JOURNAL
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Yeni Sezon Trendlerini & Lookbook'ları İlk Siz Keşfedin
            </h3>
            <p className="text-small text-muted-dark leading-relaxed">
              Her ay yayınlanan editoryal stil rehberlerimiz, saç sağlığı protokolleri ve VIP öncelikli randevu fırsatları için e-bültenimize kaydolun.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-xl flex items-center justify-center gap-2 text-small font-semibold">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Harika! L'ÉLIXIR Journal bültenine başarıyla abone oldunuz.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="E-posta adresinizi giriniz..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 text-small text-foreground placeholder-muted focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-dark-surface text-background font-semibold rounded-xl text-small hover:bg-black transition-colors shrink-0 shadow-subtle"
                >
                  Abone Ol
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

