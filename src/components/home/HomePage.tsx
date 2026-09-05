import React, { useState } from 'react';
import { Hero } from './Hero';
import { TrustStrip } from './TrustStrip';
import { FeaturedServices } from './FeaturedServices';
import { BeforeAfterSection } from './BeforeAfterSection';
import { PhilosophySection } from './PhilosophySection';
import { TeamSection } from './TeamSection';
import { PortfolioSection } from './PortfolioSection';
import { SignatureExperience } from './SignatureExperience';
import { TestimonialsSection } from './TestimonialsSection';
import { InstagramSection } from './InstagramSection';
import { BranchesSection } from './BranchesSection';
import { FinalCtaSection } from './FinalCtaSection';
import { BookingModal } from '../booking/BookingModal';
import { ServiceItem, StaffMember, BranchItem, PortfolioItem } from '../../types';
import { servicesData } from '../../data/servicesData';
import { teamData } from '../../data/teamData';

interface HomePageProps {
  onBookClick?: () => void;
  onOpenLookFinder?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onBookClick, onOpenLookFinder }) => {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null);

  const handleOpenBooking = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      setSelectedService(null);
      setSelectedStaff(null);
      setSelectedBranch(null);
      setIsBookingOpen(true);
    }
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedStaff(null);
    setIsBookingOpen(true);
  };

  const handleSelectStaffForBooking = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleSelectBranchForBooking = (branch: BranchItem) => {
    setSelectedBranch(branch);
    setIsBookingOpen(true);
  };

  const handleSelectLookForBooking = (look: PortfolioItem) => {
    const matchedService = servicesData.find((s) => s.name === look.serviceName) || servicesData[0];
    const matchedStaff = teamData.find((t) => t.name === look.stylistName) || null;
    setSelectedService(matchedService);
    setSelectedStaff(matchedStaff);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* 03: Full Viewport Editorial Hero */}
      <Hero onBookClick={handleOpenBooking} />

      {/* 04: Trust Strip / Metrics */}
      <TrustStrip />

      {/* 05: Featured Signature Services */}
      <FeaturedServices
        onSelectServiceForBooking={handleSelectServiceForBooking}
        onOpenLookFinder={onOpenLookFinder}
      />


      {/* 06: Before/After Transformation Slider */}
      <BeforeAfterSection onBookClick={handleOpenBooking} />

      {/* 07: Philosophy & Manifesto Split Section */}
      <PhilosophySection onBookClick={handleOpenBooking} />

      {/* 08: Master Stylists Team Showcase */}
      <TeamSection onSelectStaffForBooking={handleSelectStaffForBooking} />

      {/* 09: Curated Filterable Portfolio & Lightbox */}
      <PortfolioSection onBookLookClick={handleSelectLookForBooking} />

      {/* 10: Immersive Signature Experience */}
      <SignatureExperience onBookClick={handleOpenBooking} />

      {/* 11: Verified Testimonials & Google Ratings */}
      <TestimonialsSection />

      {/* 12: Instagram Curated Social Proof */}
      <InstagramSection />

      {/* 13: Multi-Branch Locations & Direction */}
      <BranchesSection onSelectBranchForBooking={handleSelectBranchForBooking} />

      {/* 14: Final Dark Editorial Booking Banner */}
      <FinalCtaSection onBookClick={handleOpenBooking} />

      {/* Booking Modal Instance */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialService={selectedService}
          initialStaff={selectedStaff}
          initialBranch={selectedBranch}
        />
      )}
    </>
  );
};
