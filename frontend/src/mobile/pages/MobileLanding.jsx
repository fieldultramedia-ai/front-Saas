import React, { Suspense, lazy } from 'react';

// Sections
const MobileHero = lazy(() => import('../components/landing/MobileHero'));
const MobileFeatures = lazy(() => import('../components/landing/MobileFeatures'));
const MobileHowItWorks = lazy(() => import('../components/landing/MobileHowItWorks'));
const MobileFormats = lazy(() => import('../components/landing/MobileFormats'));
const MobileAboutUs = lazy(() => import('../components/landing/MobileAboutUs'));
const MobilePricing = lazy(() => import('../components/landing/MobilePricing'));
const MobileDocs = lazy(() => import('../components/landing/MobileDocs'));

const MobileLanding = () => {
  return (
    <div className="min-h-screen bg-[#070B14] text-white font-['DM_Sans']">
      <Suspense fallback={<div className="h-screen bg-[#070B14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
      </div>}>
        <MobileHero />
        <MobileFeatures />
        <MobileHowItWorks />
        <MobileFormats />
        <MobilePricing />
        <MobileAboutUs />
        <MobileDocs />
      </Suspense>
    </div>
  );
};

export default MobileLanding;
