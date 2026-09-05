import React, { useState } from 'react';
import { Container, SectionHeading, Button, BeforeAfterSlider } from '../ui';
import { beforeAfterData } from '../../data/beforeAfterData';
import { Calendar, Scissors, Sparkles, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSectionProps {
  onBookClick: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onBookClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentItem = beforeAfterData[activeIdx];

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-card/40 border-b border-border/80">
      <Container size="full">
        <SectionHeading
          eyebrow="Gerçek Dönüşüm Hikayeleri"
          title="Değişim küçük bir dokunuşla başlar."
          subtitle="Renk düzeltme, doğal balayage ve hasarlı saç onarımlarımızda elde ettiğimiz gerçek sonuçlar. Kaydırıcıyı çekerek öncesi ve sonrası farkını keşfedin."
        />

        {/* Transformation Selector Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-surface rounded-pill border border-border/80 shadow-subtle gap-2">
            {beforeAfterData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-2 rounded-pill text-caption font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeIdx === idx
                    ? 'bg-dark text-background shadow-subtle'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                0{idx + 1}. {item.serviceName}
              </button>
            ))}
          </div>
        </div>

        {/* Main Transformation Showcase: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left: Draggable Interactive Slider (7 cols) */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              key={currentItem.id}
              beforeImage={currentItem.beforeImage}
              afterImage={currentItem.afterImage}
              beforeAlt={`${currentItem.title} - Öncesi`}
              afterAlt={`${currentItem.title} - Sonrası`}
              aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
            />
            <p className="text-center text-caption text-muted mt-3">
              ↔ Kaydırıcıyı sağa veya sola sürükleyerek sonucu karşılaştırın.
            </p>
          </div>

          {/* Right: Transformation Case Details & Booking CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-eyebrow uppercase text-accent-dark font-semibold tracking-widest block mb-1">
                Vaka Analizi #{activeIdx + 1}
              </span>
              <h3 className="font-serif text-h3 text-foreground leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-small text-accent-dark font-medium mt-1">
                {currentItem.subtitle}
              </p>
            </div>

            <p className="text-body text-muted leading-relaxed">
              {currentItem.description}
            </p>

            <div className="p-4 rounded-lg bg-surface border border-border/70 space-y-2.5">
              <div className="flex items-center gap-2 text-small">
                <Scissors className="w-4 h-4 text-accent shrink-0" />
                <span className="text-muted">Uygulayan Uzman:</span>
                <span className="font-semibold text-foreground">
                  {currentItem.stylistName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-small">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <span className="text-muted">Uygulanan Ritüel:</span>
                <span className="font-semibold text-foreground">
                  {currentItem.serviceName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-small">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span className="text-muted">Saç Durumu:</span>
                <span className="font-semibold text-foreground">
                  Sıfır Hasar · %100 Parlaklık
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="dark"
                size="md"
                onClick={onBookClick}
                leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                className="w-full sm:w-auto shadow-subtle"
              >
                Bu Dönüşüm İçin Randevu Al
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

