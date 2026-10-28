import { notFound } from 'next/navigation';
// import type { Metadata } from 'next';
// import Crma from '../../../../src/components/Courses/Crma';
// import { getBrochureSection } from '../../../../src/services/brochure.service';

/*
 * /courses/crma
 *
 * Page is temporarily hidden. Calling notFound() renders the 404 page.
 * All original metadata, data fetching, and component rendering logic are preserved below.
 */

/*
export const metadata: Metadata = {
    title: "CRMA Certification - Global Professional Certifications",
    description: "Advance your career in risk management and assurance with our CRMA course. Learn governance, control, and mitigation techniques with expert guidance.",
    alternates: { canonical: "/courses/crma" },
    openGraph: {
        title: "CRMA Certification - Global Professional Certifications",
        description: "Advance your career in risk management and assurance with our CRMA course. Learn governance, control, and mitigation techniques with expert guidance.",
        url: "/courses/crma",
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "CRMA Certification - Global Professional Certifications",
        description: "Advance your career in risk management and assurance with our CRMA course. Learn governance, control, and mitigation techniques with expert guidance.",
    },
};

export const revalidate = 60;
*/

export default function Page() {
    // Hide CRMA page by triggering 404 Not Found
    notFound();

    /*
    const [cia, cisa, iap] = await Promise.all([
        getBrochureSection('cia'),
        getBrochureSection('cisa'),
        getBrochureSection('iap'),
    ]);

    return (
        <Crma brochureSections={{ cia, cisa, iap }} />
    );
    */
}

