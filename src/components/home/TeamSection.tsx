import React from 'react';
import { Container, SectionHeading, Button, Badge, InstagramIcon } from '../ui';
import { teamData } from '../../data/teamData';
import { Calendar, Star } from 'lucide-react';
import { StaffMember } from '../../types';

interface TeamSectionProps {
  onSelectStaffForBooking: (staff: StaffMember) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectStaffForBooking }) => {
  return (
    <section id="team" className="py-16 sm:py-20 lg:py-28 bg-background border-b border-border/80">
      <Container size="full">
        <SectionHeading
          eyebrow="Artistik Kadro"
          title="Usta Eller, Özgün İmzalar"
          subtitle="Alanında uluslararası akademilerde eğitim almış, yüzünüzün ve saçınızın potansiyelini en üst seviyeye taşıyan kreatif kuaför ekibimiz."
        />

        {/* Mobile Horizontal Snap Carousel / Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {teamData.map((staff) => (
            <div
              key={staff.id}
              className="flex-none w-[82vw] sm:w-auto snap-center flex flex-col rounded-2xl overflow-hidden bg-card border border-border/70 hover:border-accent transition-all duration-300 shadow-subtle hover:shadow-card group"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted-light">
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-editorial"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-pill flex items-center gap-1 border border-border/60 shadow-subtle">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-caption font-bold text-foreground">
                    {staff.rating}
                  </span>
                </div>

                {/* Social handle overlay */}
                {staff.instagram && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-background text-caption">
                    <InstagramIcon className="w-3.5 h-3.5 text-accent" />
                    <span className="font-mono text-[0.7rem] text-white/90">
                      {staff.instagram}
                    </span>
                  </div>
                )}
              </div>

              {/* Staff Details */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl sm:text-h3 text-foreground group-hover:text-accent-dark transition-colors">
                  {staff.name}
                </h3>
                <p className="text-caption font-semibold uppercase tracking-wider text-accent-dark mt-1">
                  {staff.role}
                </p>

                <p className="text-small text-muted mt-2.5 line-clamp-3 leading-relaxed">
                  {staff.bio}
                </p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 my-3 sm:my-4 pt-3 border-t border-border/60">
                  {staff.specialties.slice(0, 3).map((spec, idx) => (
                    <Badge key={idx} variant="default" size="sm">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Booking Button */}
                <div className="mt-auto pt-2">
                  <Button
                    variant="dark"
                    size="sm"
                    isFullWidth
                    onClick={() => onSelectStaffForBooking(staff)}
                    leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                    className="min-h-[44px]"
                  >
                    {staff.name.split(' ')[0]}'den Randevu Al
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
