import {
  Clock,
  ArrowLeft,
  Sparkles,
  Calendar,
  Quote,
  CheckCircle2,
  CalendarCheck,
  Scissors,
  Eye,
} from 'lucide-react';
import { Container, Button } from '../ui';
import { BlogPost, ServiceItem, StaffMember } from '../../types';
import { blogPostsData } from '../../data/blogData';
import { servicesData } from '../../data/servicesData';
import { teamData } from '../../data/teamData';
import { portfolioData } from '../../data/portfolioData';
import { SeoHead } from '../seo/SeoHead';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '../seo/schemaGenerators';

interface BlogDetailPageProps {
  post: BlogPost;
  onBookService?: (service?: ServiceItem | null, staff?: StaffMember | null) => void;
  onSelectRelatedPost?: (post: BlogPost) => void;
  onNavigateToBlog: () => void;
  onNavigateHome: () => void;
}

export function BlogDetailPage({
  post,
  onBookService,
  onSelectRelatedPost,
  onNavigateToBlog,
  onNavigateHome,
}: BlogDetailPageProps) {
  // Find related service if any
  const relatedService = post.relatedServiceSlug
    ? servicesData.find((s) => s.slug === post.relatedServiceSlug)
    : servicesData.find((s) => s.id === post.relatedServiceId) || null;

  // Find author
  const authorStaff = teamData.find((t) => t.slug === post.authorSlug);

  // Find related portfolio items
  const relatedPortfolioItems = portfolioData.filter((item) =>
    post.relatedPortfolioIds?.includes(item.id)
  );

  // Fallback portfolio items if none explicitly mapped
  const displayPortfolio =
    relatedPortfolioItems.length > 0
      ? relatedPortfolioItems
      : portfolioData.slice(0, 2);

  // Other articles
  const otherPosts = blogPostsData
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: "L'ÉLIXIR Dergi", url: '/dergi' },
    { name: post.title, url: `/dergi/${post.slug}` },
  ]);

  const combinedSchema = [articleSchema, breadcrumbSchema];

  return (
    <article className="py-10 lg:py-16 bg-background text-foreground animate-fade-in">
      {/* Dynamic Article JSON-LD Schema & Meta */}
      <SeoHead
        title={`${post.title} — L'ÉLIXIR Journal`}
        description={post.summary}
        canonicalUrl={`https://lelixir-atelier.com/#/dergi/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        schemaJson={combinedSchema}
      />

      <Container size="md">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-caption text-muted mb-8" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-foreground transition-colors">
            Ana Sayfa
          </button>
          <span>/</span>
          <button onClick={onNavigateToBlog} className="hover:text-foreground transition-colors">
            L'ÉLIXIR Journal
          </button>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={onNavigateToBlog}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Editoryal Makalelere Dön</span>
        </button>

        {/* Header Title Section */}
        <header className="space-y-4 mb-8">
          <span className="inline-block bg-accent/20 text-accent font-bold text-caption uppercase tracking-wider px-3.5 py-1 rounded-full border border-accent/30">
            {post.categoryLabel}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-muted-dark leading-relaxed font-light font-serif italic">
            {post.subtitle}
          </p>

          {/* Author Meta Bar */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-12 h-12 rounded-full object-cover border border-border shadow-xs"
              />
              <div>
                <span className="text-small font-bold text-foreground block">
                  {post.authorName}
                </span>
                <span className="text-caption text-accent font-medium block">
                  {post.authorRole}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-caption text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent" />
                {post.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                {post.readTimeMinutes} dakika okuma
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-card mb-10 h-[340px] sm:h-[480px] relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-4 bg-dark-surface/75 backdrop-blur-xs text-background text-[0.65rem] px-2.5 py-1 rounded-md uppercase tracking-wider">
            L'ÉLIXIR Atelier Hair & Beauty
          </div>
        </div>

        {/* Key Takeaways Box (If available) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 bg-secondary/80 border border-border rounded-2xl space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Önemli Çıkarımlar & Uzman Notları
            </span>
            <ul className="space-y-2">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-small text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pull Quote Callout Box (If available) */}
        {post.pullQuote && (
          <div className="my-10 p-6 sm:p-8 bg-card border-l-4 border-l-accent border-y border-r border-border/80 rounded-r-2xl shadow-subtle space-y-3">
            <Quote className="w-7 h-7 text-accent" />
            <blockquote className="font-serif italic text-lg sm:text-xl text-foreground leading-relaxed">
              "{post.pullQuote.text}"
            </blockquote>
            <cite className="block text-xs font-semibold text-accent not-italic">
              — {post.pullQuote.author}
            </cite>
          </div>
        )}

        {/* Article Body Content (Typography) */}
        <div
          className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-6 font-sans border-b border-border pb-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Section: Related Services (İlgili Hizmetler) */}
        {relatedService && (
          <div className="my-12 p-6 sm:p-8 bg-card border border-border rounded-2xl shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Scissors className="w-4 h-4 text-accent" />
                <span className="text-caption text-accent font-bold uppercase tracking-wider">
                  Yazıda Bahsedilen İmza Hizmet
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {relatedService.name}
              </h3>
              <p className="text-small text-muted-dark max-w-md">
                {relatedService.subtitle} — {relatedService.durationMinutes} dk seans • {relatedService.priceStartingFrom.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla.
              </p>
            </div>

            <Button
              variant="dark"
              size="md"
              onClick={() => onBookService && onBookService(relatedService, authorStaff)}
              className="font-semibold shrink-0 shadow-subtle"
            >
              Hizmet İçin Randevu Al
            </Button>
          </div>
        )}

        {/* Section: Related Portfolio (Bu Görünüme Ait Portfolyo Çalışmaları) */}
        {displayPortfolio.length > 0 && (
          <div className="my-12 space-y-5 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                  KÜRATÖRLÜ PORTFOLYO
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Bu Görünüme Ait Örnek Çalışmalar
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-subtle hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-4/3 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-dark-surface/90 text-background text-caption px-2.5 py-1 rounded-full font-semibold">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-serif font-bold text-foreground text-base group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-caption text-muted-dark leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-2 border-t border-border flex items-center justify-between text-caption text-muted">
                      <span>Uygulayan: <strong className="text-foreground">{item.stylistName}</strong></span>
                      <button
                        onClick={() => onBookService && onBookService(relatedService, authorStaff)}
                        className="text-accent font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Randevu ➔
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box */}
        {authorStaff && (
          <div className="p-6 bg-secondary border border-border rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-12">
            <img
              src={authorStaff.avatar}
              alt={authorStaff.name}
              className="w-20 h-20 rounded-2xl object-cover border border-border shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="font-serif font-bold text-foreground text-lg">
                    {authorStaff.name}
                  </h4>
                  <p className="text-caption text-accent font-semibold">{authorStaff.role}</p>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onBookService && onBookService(null, authorStaff)}
                >
                  Yazarla Randevu Al
                </Button>
              </div>
              <p className="text-small text-muted-dark leading-relaxed">
                {authorStaff.bio}
              </p>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <span className="text-caption font-semibold text-muted mr-2">Etiketler:</span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-card text-foreground/80 rounded-full text-caption border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ========================================================= */}
        {/* MANDATORY UNIVERSAL END-OF-ARTICLE BOOKING CTA BOX        */}
        {/* "Bu görünümü profesyonel ekibimizle keşfedin." [Randevu Al] */}
        {/* ========================================================= */}
        <div className="my-16 bg-gradient-to-br from-card via-secondary to-card border-2 border-accent/40 rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold block">
              ÖZEL KONSÜLTASYON & STİL DENEYİMİ
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Bu görünümü profesyonel ekibimizle keşfedin.
            </h3>
            <p className="text-small text-muted-dark leading-relaxed">
              Nişantaşı, Bebek, Bağdat Caddesi ve Ankara Çayyolu stüdyolarımızda size en çok yakışacak renk ve kesim formunu birlikte tasarlayalım.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onBookService && onBookService(relatedService, authorStaff)}
              className="font-bold text-base px-10 py-4 shadow-card hover:scale-105 transition-transform"
              leftIcon={<CalendarCheck className="w-5 h-5 text-dark-surface" />}
            >
              Randevu Al
            </Button>
          </div>
        </div>

        {/* Section: Related Articles (İlginizi Çekebilecek Diğer Rehberler) */}
        <div className="space-y-6 pt-8 border-t border-border">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            İlginizi Çekebilecek Diğer Rehberler
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPosts.map((op) => (
              <div
                key={op.id}
                onClick={() => onSelectRelatedPost && onSelectRelatedPost(op)}
                className="group cursor-pointer space-y-2 bg-card border border-border rounded-xl p-3 hover:border-accent/40 hover:shadow-card transition-all"
              >
                <div className="aspect-16/10 rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={op.coverImage}
                    alt={op.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-caption text-accent font-semibold block uppercase">
                  {op.categoryLabel}
                </span>
                <h4 className="font-serif font-bold text-foreground text-small group-hover:text-accent-dark transition-colors line-clamp-2">
                  {op.title}
                </h4>
                <span className="text-caption text-muted block">
                  {op.readTimeMinutes} dk okuma
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}

