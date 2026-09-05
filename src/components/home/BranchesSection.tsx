import React, { useState } from 'react';
import { Container, SectionHeading, Button, Badge } from '../ui';
import { branchesData } from '../../data/branchesData';
import { MapPin, Phone, Clock, Navigation, Check, Calendar } from 'lucide-react';
import { BranchItem } from '../../types';

interface BranchesSectionProps {
  onSelectBranchForBooking: (branch: BranchItem) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onSelectBranchForBooking }) => {
  const [activeBranchId, setActiveBranchId] = useState<string>(branchesData[0].id);
  const activeBranch = branchesData.find((b) => b.id === activeBranchId) || branchesData[0];

  return (
    <section id="branches" className="py-20 lg:py-28 bg-background border-b border-border/80">
      <Container size="full">
        <SectionHeading
          eyebrow="Stüdyo Lokasyonlarımız"
          title="Ayrıcalıklı Atmosfer ve Ulaşım"
          subtitle="İstanbul ve Ankara'nın en seçkin noktalarında, vale park hizmeti ve VIP süitlerle hizmetinizdeyiz."
        />

        {/* Branch Selector Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-card rounded-pill border border-border/80 shadow-subtle gap-2">
            {branchesData.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`px-5 py-2.5 rounded-pill text-caption font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeBranchId === branch.id
                    ? 'bg-foreground text-background shadow-subtle'
                    : 'text-muted hover:text-foreground hover:bg-card-hover'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{branch.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Branch Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/60 p-6 sm:p-10 rounded-2xl border border-border/80 shadow-card max-w-6xl mx-auto">
          {/* Branch Image (6 cols) */}
          <div className="lg:col-span-6 aspect-[4/3] rounded-xl overflow-hidden shadow-subtle border border-border bg-muted-light relative">
            <img
              src={activeBranch.image}
              alt={activeBranch.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="dark" size="sm">
                {activeBranch.city} · {activeBranch.district}
              </Badge>
            </div>
          </div>

          {/* Branch Info & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-serif text-h2 text-foreground">
                {activeBranch.name}
              </h3>
              <p className="text-small text-accent-dark font-medium mt-1">
                {activeBranch.district}, {activeBranch.city}
              </p>
            </div>

            <div className="space-y-3.5 text-small text-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <span>{activeBranch.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`tel:${activeBranch.phone}`}
                  className="hover:text-accent-dark font-medium transition-colors"
                >
                  {activeBranch.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>{activeBranch.hours}</span>
              </div>
            </div>

            {/* Features Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
              {activeBranch.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-caption bg-surface text-foreground/90 px-3 py-1 rounded-md border border-border flex items-center gap-1.5 font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-accent" />
                  {feat}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="dark"
                size="md"
                onClick={() => onSelectBranchForBooking(activeBranch)}
                leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                className="flex-1"
              >
                Bu Şubeden Randevu Al
              </Button>

              <a
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="md"
                  isFullWidth
                  leftIcon={<Navigation className="w-4 h-4 text-muted" />}
                >
                  Yol Tarifi Al
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

