import React from 'react';
import { Container, Button, InstagramIcon } from '../ui';
import { instagramData } from '../../data/instagramData';
import { Heart } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-card/40 border-b border-border/80">
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-2">
              Instagram'da Bizi Takip Edin
            </span>
            <h2 className="font-serif text-h2 text-foreground">
              @lelixir.atelier
            </h2>
            <p className="text-small text-muted mt-1">
              Günlük salon kulisleri, yeni dönüşümler ve saç bakım tavsiyeleri.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                leftIcon={<InstagramIcon className="w-4 h-4 text-accent" />}
              >
                Topluluğumuza Katıl
              </Button>
            </a>
          </div>
        </div>

        {/* 6 Curated Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramData.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-muted-light block border border-border shadow-subtle hover:shadow-card transition-all"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-editorial"
                loading="lazy"
              />

              {/* Hover Dark Vignette */}
              <div className="absolute inset-0 bg-dark/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-background">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-caption font-semibold text-accent-light">
                    <Heart className="w-3.5 h-3.5 fill-accent-light" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-[0.65rem] text-white/90 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

