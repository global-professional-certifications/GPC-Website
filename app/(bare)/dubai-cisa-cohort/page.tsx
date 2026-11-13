import type { Metadata } from 'next';
import DubaiCisaLandingPage from '../../../src/components/LandingPages/DubaiCisaLandingPage';

export const metadata: Metadata = {
    title: "Dubai CISA Cohort | Build Your CISA Momentum in Dubai | GPC",
    description: "GPC is bringing an intensive, in-person CISA preparation cohort to Dubai for GRC, IT audit, assurance, risk, and cybersecurity professionals. Learn alongside a focused group of peers and prepare with guidance from an industry expert.",
    alternates: { canonical: "/dubai-cisa-cohort" },
    openGraph: {
        title: "Dubai CISA Cohort | Build Your CISA Momentum in Dubai | GPC",
        description: "GPC is bringing an intensive, in-person CISA preparation cohort to Dubai for GRC, IT audit, assurance, risk, and cybersecurity professionals. Learn alongside a focused group of peers and prepare with guidance from an industry expert.",
        url: "/dubai-cisa-cohort",
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Dubai CISA Cohort | Build Your CISA Momentum in Dubai | GPC",
        description: "GPC is bringing an intensive, in-person CISA preparation cohort to Dubai for GRC, IT audit, assurance, risk, and cybersecurity professionals. Learn alongside a focused group of peers and prepare with guidance from an industry expert.",
    },
};

export default function Page() {
    return <DubaiCisaLandingPage />;
}
