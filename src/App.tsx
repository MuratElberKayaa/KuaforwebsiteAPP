import { useState, useEffect } from 'react';
import { ToastProvider } from './components/ui';
import { BookingProvider } from './context/BookingContext';
import { AdminProvider } from './context/AdminContext';
import { TopAnnouncement } from './components/home/TopAnnouncement';
import { Navbar } from './components/home/Navbar';
import { HomePage } from './components/home/HomePage';
import { Footer } from './components/home/Footer';
import { MobileStickyBar } from './components/home/MobileStickyBar';
import { MobileMenuDrawer } from './components/home/MobileMenuDrawer';
import { ServicesPage } from './components/services/ServicesPage';
import { ServiceDetailPage } from './components/services/ServiceDetailPage';
import { TeamPage } from './components/team/TeamPage';
import { TeamDetailPage } from './components/team/TeamDetailPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { BookingPage } from './components/booking/BookingPage';
import { BookingModal } from './components/booking/BookingModal';
import { BranchesPage } from './components/branches/BranchesPage';
import { BranchDetailPage } from './components/branches/BranchDetailPage';
import { BlogPage } from './components/blog/BlogPage';
import { BlogDetailPage } from './components/blog/BlogDetailPage';
import { LookFinderModal } from './components/lookfinder/LookFinderModal';
import { LookFinderPage } from './components/lookfinder/LookFinderPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { servicesData } from './data/servicesData';
import { teamData } from './data/teamData';
import { branchesData } from './data/branchesData';
import { blogPostsData } from './data/blogData';
import { ServiceItem, StaffMember, BranchItem, BlogPost, PortfolioItem } from './types';

function SalonAppContent() {
  // Routing state
  const [currentRoute, setCurrentRoute] = useState<
    | 'home'
    | 'services'
    | 'service-detail'
    | 'team'
    | 'team-detail'
    | 'portfolio'
    | 'booking'
    | 'branches'
    | 'branch-detail'
    | 'blog'
    | 'blog-detail'
    | 'look-finder'
    | 'admin'
  >('home');

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('artisanal-balayage');
  const [selectedStaffSlug, setSelectedStaffSlug] = useState<string>('selin-varol');
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>('nisantasi-flagship');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('2026-balayage-trendleri');

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<ServiceItem | null>(null);
  const [bookingInitialStaff, setBookingInitialStaff] = useState<StaffMember | null>(null);
  const [bookingInitialBranch, setBookingInitialBranch] = useState<BranchItem | null>(null);

  // Look Finder Modal state
  const [isLookFinderOpen, setIsLookFinderOpen] = useState(false);

  // Mobile Drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Service alias map for short SEO URLs
  const serviceAliasMap: Record<string, string> = {
    balayage: 'artisanal-balayage',
    ombre: 'contouring-ombre',
    'sac-kesimi': 'signature-cut',
    'gelin-saci': 'bridal-couture',
    'sac-botoxu': 'tokyo-care',
  };

  // Hash-based URL synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#/admin')) {
        setCurrentRoute('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/look-finder') {
        setCurrentRoute('look-finder');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/subeler/')) {
        const slug = hash.replace('#/subeler/', '');
        setSelectedBranchSlug(slug);
        setCurrentRoute('branch-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/subeler') {
        setCurrentRoute('branches');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/dergi/')) {
        const slug = hash.replace('#/dergi/', '');
        setSelectedBlogSlug(slug);
        setCurrentRoute('blog-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/dergi') {
        setCurrentRoute('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/hizmetler/')) {
        const rawSlug = hash.replace('#/hizmetler/', '');
        const mappedSlug = serviceAliasMap[rawSlug] || rawSlug;
        setSelectedServiceSlug(mappedSlug);
        setCurrentRoute('service-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/hizmetler') {
        setCurrentRoute('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/ekibimiz/')) {
        const slug = hash.replace('#/ekibimiz/', '');
        setSelectedStaffSlug(slug);
        setCurrentRoute('team-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/ekibimiz') {
        setCurrentRoute('team');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/calismalar') {
        setCurrentRoute('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/randevu') {
        setCurrentRoute('booking');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#/';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServices = () => {
    window.location.hash = '#/hizmetler';
    setCurrentRoute('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServiceDetail = (service: ServiceItem) => {
    window.location.hash = `#/hizmetler/${service.slug}`;
    setSelectedServiceSlug(service.slug);
    setCurrentRoute('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTeam = () => {
    window.location.hash = '#/ekibimiz';
    setCurrentRoute('team');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTeamDetail = (staff: StaffMember) => {
    window.location.hash = `#/ekibimiz/${staff.slug}`;
    setSelectedStaffSlug(staff.slug);
    setCurrentRoute('team-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    window.location.hash = '#/calismalar';
    setCurrentRoute('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBranches = () => {
    window.location.hash = '#/subeler';
    setCurrentRoute('branches');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBranchDetail = (branch: BranchItem) => {
    window.location.hash = `#/subeler/${branch.slug}`;
    setSelectedBranchSlug(branch.slug);
    setCurrentRoute('branch-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlog = () => {
    window.location.hash = '#/dergi';
    setCurrentRoute('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogDetail = (post: BlogPost) => {
    window.location.hash = `#/dergi/${post.slug}`;
    setSelectedBlogSlug(post.slug);
    setCurrentRoute('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLookFinder = () => {
    window.location.hash = '#/look-finder';
    setCurrentRoute('look-finder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBookingPage = () => {
    window.location.hash = '#/randevu';
    setCurrentRoute('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (
    service?: ServiceItem | null,
    staff?: StaffMember | null,
    branch?: BranchItem | null
  ) => {
    setBookingInitialService(service || null);
    setBookingInitialStaff(staff || null);
    setBookingInitialBranch(branch || null);
    setIsBookingOpen(true);
  };

  const openLookFinder = () => {
    setIsLookFinderOpen(true);
  };

  const handleSelectLookFromFinder = (
    service: ServiceItem,
    staff?: StaffMember | null,
    _lookItem?: PortfolioItem
  ) => {
    setIsLookFinderOpen(false);
    openBookingModal(service, staff);
  };

  // Find current entities for detail views
  const currentDetailService =
    servicesData.find((s) => s.slug === selectedServiceSlug) || servicesData[0];
  const currentDetailStaff =
    teamData.find((t) => t.slug === selectedStaffSlug) || teamData[0];
  const currentDetailBranch =
    branchesData.find((b) => b.slug === selectedBranchSlug) || branchesData[0];
  const currentDetailBlog =
    blogPostsData.find((p) => p.slug === selectedBlogSlug) || blogPostsData[0];

  // When on Admin route, render dedicated AdminLayout
  if (currentRoute === 'admin') {
    return <AdminLayout onReturnToPublic={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/30 selection:text-foreground">
      {/* Top Announcement Bar */}
      <TopAnnouncement onBookClick={navigateToBookingPage} />

      {/* Sticky Header Navbar */}
      <Navbar
        onBookClick={navigateToBookingPage}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onNavigateHome={navigateToHome}
        onNavigateServices={navigateToServices}
        onNavigateTeam={navigateToTeam}
        onNavigatePortfolio={navigateToPortfolio}
        onNavigateBranches={navigateToBranches}
        onNavigateBlog={navigateToBlog}
        onNavigateLookFinder={navigateToLookFinder}
      />

      {/* Main View Router with Smooth Page Transitions */}
      <main key={currentRoute} className="flex-1 animate-fade-in">
        {currentRoute === 'home' && (
          <HomePage
            onBookClick={navigateToBookingPage}
            onOpenLookFinder={openLookFinder}
          />
        )}

        {currentRoute === 'look-finder' && (
          <LookFinderPage
            onSelectLook={handleSelectLookFromFinder}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'services' && (
          <ServicesPage
            onSelectService={navigateToServiceDetail}
            onBookService={(service) => openBookingModal(service)}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'service-detail' && (
          <ServiceDetailPage
            service={currentDetailService}
            onBookService={(service, staff) => openBookingModal(service, staff)}
            onNavigateToServices={navigateToServices}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'team' && (
          <TeamPage
            onSelectStaff={navigateToTeamDetail}
            onBookWithStaff={(staff) => openBookingModal(null, staff)}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'team-detail' && (
          <TeamDetailPage
            staff={currentDetailStaff}
            onBookWithStaff={(staff, service) => openBookingModal(service, staff)}
            onNavigateToTeam={navigateToTeam}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'portfolio' && (
          <PortfolioPage
            onBookLook={(service, staff) => openBookingModal(service, staff)}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'branches' && (
          <BranchesPage
            onSelectBranch={navigateToBranchDetail}
            onBookBranch={(branch) => openBookingModal(null, null, branch)}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'branch-detail' && (
          <BranchDetailPage
            branch={currentDetailBranch}
            onBookBranch={(branch, staff) => openBookingModal(null, staff, branch)}
            onSelectStaff={navigateToTeamDetail}
            onSelectService={navigateToServiceDetail}
            onNavigateToBranches={navigateToBranches}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'blog' && (
          <BlogPage
            onSelectPost={navigateToBlogDetail}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'blog-detail' && (
          <BlogDetailPage
            post={currentDetailBlog}
            onBookService={(service, staff) => openBookingModal(service, staff)}
            onSelectRelatedPost={navigateToBlogDetail}
            onNavigateToBlog={navigateToBlog}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentRoute === 'booking' && (
          <BookingPage onNavigateHome={navigateToHome} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onBookClick={navigateToBookingPage}
        onNavigateBranches={navigateToBranches}
        onNavigateBlog={navigateToBlog}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onBookClick={navigateToBookingPage} />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookClick={navigateToBookingPage}
        onNavigateHome={navigateToHome}
        onNavigateServices={navigateToServices}
        onNavigateTeam={navigateToTeam}
        onNavigatePortfolio={navigateToPortfolio}
        onNavigateBranches={navigateToBranches}
        onNavigateBlog={navigateToBlog}
        onNavigateLookFinder={navigateToLookFinder}
      />

      {/* Look Finder Interactive Discovery Modal */}
      {isLookFinderOpen && (
        <LookFinderModal
          isOpen={isLookFinderOpen}
          onClose={() => setIsLookFinderOpen(false)}
          onSelectLook={handleSelectLookFromFinder}
        />
      )}

      {/* 8-Step Interactive Booking Engine Modal */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialService={bookingInitialService}
          initialStaff={bookingInitialStaff}
          initialBranch={bookingInitialBranch}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <BookingProvider>
          <SalonAppContent />
        </BookingProvider>
      </AdminProvider>
    </ToastProvider>
  );
}
