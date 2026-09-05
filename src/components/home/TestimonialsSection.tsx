import React, { useState } from 'react';
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui';
import { testimonialsData } from '../../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border/80">
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Misafir Deneyimleri"
            title="Güven ve Kusursuz Memnuniyet"
            subtitle="Google ve salon anketlerimizde aldığımız 4.9★ değerlendirmelerden bazıları."
            align="left"
            className="mb-0"
          />

          {/* Slider Controls */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <div className="hidden sm:flex items-center space-x-1.5 mr-4 px-3 py-1.5 bg-card rounded-md border border-border">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-small font-bold text-foreground">4.9</span>
              <span className="text-caption text-muted">/ 5.0 (1.850+ Google İncelemesi)</span>
            </div>

            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-subtle"
              aria-label="Önceki Yorum"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-subtle"
              aria-label="Sonraki Yorum"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid / Mobile Horizontal Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item, idx) => (
            <Card
              key={item.id}
              variant="elevated"
              className={`flex flex-col justify-between border-border/70 transition-all duration-300 ${
                currentIndex === idx ? 'ring-2 ring-accent/60' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-accent">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>
                  {item.isVerified && (
                    <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-success font-semibold bg-success/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Doğrulanmış
                    </span>
                  )}
                </div>

                <CardTitle className="text-base font-serif text-foreground font-normal line-clamp-2">
                  "{item.comment.slice(0, 70)}..."
                </CardTitle>

                <CardDescription className="mt-3 text-small text-muted leading-relaxed line-clamp-4">
                  "{item.comment}"
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex-col items-start pt-4 border-t border-border/50">
                <p className="text-small font-semibold text-foreground">
                  {item.clientName}
                </p>
                <p className="text-caption text-accent-dark font-medium">
                  {item.serviceName}
                </p>
                <div className="flex items-center justify-between w-full mt-1 text-[0.7rem] text-muted">
                  <span>{item.branchName}</span>
                  <span>{item.date}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

