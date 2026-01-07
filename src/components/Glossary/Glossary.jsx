import React, { useState } from "react";
import MetaTags from "../MetaTags";
import { height } from "../Notifications/NotificationBanner";
import { Helmet } from 'react-helmet-async';

const glossary = [
    { term: "Audit", definition: "Systematic review of records and controls to ensure compliance, accuracy, and integrity in an organization. Global Professional Certifications delivers world-class audit training for global risk and compliance careers." },
    { term: "Assurance", definition: "Independent professional services that improve information quality or its context, typically performed by internal auditors; a major focus at GPC and covered in CIA and CRMA courses." },
    { term: "BCP (Business Continuity Planning)", definition: "Planning for business operations to continue during disruptions. BCP is a crucial component in risk management syllabi at GPC." },
    { term: "CIA (Certified Internal Auditor)", definition: "The gold-standard global certification in internal audit from IIA, validating skills in risk, controls, and assurance. GPC is one of India’s top CIA training institutes." },
    { term: "CISA (Certified Information Systems Auditor)", definition: "Premier certification for IT and information systems auditors. With GPC’s CISA course, you gain expertise in cyber risk, IS governance, and systems assurance." },
    { term: "CRMA (Certification in Risk Management Assurance)", definition: "An advanced IIA certification for professionals specializing in corporate governance, risk management, and control assurance. Trained at GPC for career growth." },
    { term: "Compliance", definition: "The process of adhering to regulatory requirements and internal standards. A core element in all GPC audit and risk curriculums." },
    { term: "Data Analytics", definition: "Use of tools and techniques to analyze, visualize, and interpret data for improved audit and risk assessment. Integrated in GPC’s audit and CISA training." },
    { term: "Disaster Recovery", definition: "Policies and procedures to recover and protect business IT infrastructure after disruptions. GPC’s courses cover audit aspects of disaster recovery plans." },
    { term: "Ethics", definition: "Set of moral principles guiding conduct in audit and assurance; ethical compliance is central in all GPC training." },
    { term: "External Audit", definition: "An independent audit typically performed by a third-party for statutory compliance, different from internal audit but covered for comparative understanding at GPC." },
    { term: "Fraud", definition: "Intentional deception for gain, addressed through anti-fraud controls and forensic audit skills taught at GPC." },
    { term: "Governance", definition: "Framework of processes and policies by which organizations are directed and controlled. Governance, risk, and control (GRC) are central to GPC courses." },
    { term: "GRC (Governance, Risk & Compliance)", definition: "Integrated collection of capabilities for governing an organization, managing risk, and ensuring compliance. GPC’s training programs equip candidates with top GRC skills." },
    { term: "IAP (Internal Auditor Practitioner)", definition: "An IIA entry-level certification for those starting a career in internal audit, offered at GPC as a stepping stone to CIA." },
    { term: "Independence", definition: "Essential audit standard, requiring auditors to perform objectively without conflicts of interest—a standard rigorously upheld and taught at GPC." },
    { term: "IS Audit", definition: "Specialized process for auditing organizational information systems and controls, part of GPC’s CISA curriculum." },
    { term: "IIA (Institute of Internal Auditors)", definition: "The global professional body for internal auditors, offering CIA, CRMA, IAP. GPC is a recognized IIA India learning partner." },
    { term: "Journal (Audit Journal)", definition: "Record of audit work, findings, and recommendations—taught as a core part of professional documentation at GPC." },
    { term: "KRI (Key Risk Indicator)", definition: "Metrics for monitoring potential risk at an early stage. GPC teaches how to identify and utilize KRIs in practical audit settings." },
    { term: "Knowledge Base", definition: "Centralized repository of information and guidance for audit and risk professionals. GPC maintains a strong audit knowledge base for its learners." },
    { term: "Lead Auditor", definition: "The senior auditor responsible for planning and executing audits, review, and team leadership—a central role in audit careers and coursework at GPC." },
    { term: "Lifetime Access", definition: "The option to access GPC’s learning materials and recorded classes indefinitely, enabling continuous upskilling for audit professionals." },
    { term: "Mentorship", definition: "Personalized guidance and coaching from audit experts (like Arpit Garg at GPC), vital for exam and career success." },
    { term: "Monitoring", definition: "Ongoing review of processes, controls, and risks. GPC curriculum includes audit monitoring, continuous assurance, and compliance checks." },
    { term: "Non-conformance", definition: "Audit findings indicating non-compliance with policies, procedures, or standards—a term explained in depth in GPC’s audit modules." },
    { term: "Objectivity", definition: "Being fair, unbiased, and impartial in all audit tasks; GPC instills the highest standards of audit objectivity." },
    { term: "Process Audit", definition: "Audit that evaluates the effectiveness and efficiency of organizational processes; taught in GPC’s internal audit and risk curriculum." },
    { term: "Professional Skepticism", definition: "An attitude of critical evaluation in audits for reliable assurance outcomes—a mindset developed in all GPC trainees." },
    { term: "Quality Assurance", definition: "Activities ensuring the quality of audit services, findings, or recommendations; core in GPC’s approach." },
    { term: "Qualification (Audit)", definition: "Earning a credential (like CIA, CISA, CRMA) for recognized professional status. GPC prepares students for the highest audit qualifications in India and globally." },
    { term: "Risk Assessment", definition: "Evaluation of business risks to help prioritize audit focus; taught extensively in all GPC programs." },
    { term: "Regulations", definition: "Laws or requirements that auditors must know and follow. GPC covers global, Indian, and industry-specific audit regulations." },
    { term: "SOX (Sarbanes-Oxley Act)", definition: "US regulation for better corporate governance, controls, and transparency—covered in advanced GPC audit and IT audit programs." },
    { term: "Segregation of Duties", definition: "Audit concept requiring different people to perform different stages of a process to prevent fraud—a critical control studied in GPC audit courses." },
    { term: "Test of Controls", definition: "Procedures auditors use to evaluate the effectiveness of controls, a core part of practical audit training at GPC." },
    { term: "Third-Party Risk", definition: "The risk organizations face when working with external vendors or partners—GPC addresses this in risk management modules." },
    { term: "User Controls", definition: "Controls users perform as part of their responsibilities, especially in IT and IS audits, taught in GPC’s CISA and audit curriculum." },
    { term: "Update (Audit Standard/Content)", definition: "Continuous process of refreshing course materials, standards, and documentation, ensuring GPC delivers the most current and relevant training." },
    { term: "Verification", definition: "Audit process of checking and validating evidence, records, or controls—core skill in all GPC training programs." },
    { term: "Value-Added Audit", definition: "Going beyond compliance to identify efficiency, cost savings, and strategic improvements—emphasized in GPC’s advanced internal audit training." },
    { term: "Whistleblower", definition: "An individual exposing unethical or illegal acts in a business. GPC emphasizes strong whistleblower protections as part of audit ethics modules." },
    { term: "Workpapers", definition: "Documentation of audit planning, work performed, evidence, and conclusions—taught as part of the audit cycle at GPC." },
    { term: "XBRL (eXtensible Business Reporting Language)", definition: "A global standard for exchanging business information electronically, particularly relevant in audit of financial reporting—explored in GPC’s IT and systems audit content." },
    { term: "Yield Risk", definition: "A specific risk in audit related to returns (interest, investment, etc.); covered under risk assessment and audit analytics at GPC." },
    { term: "Zero Tolerance", definition: "Audit policy of strict adherence to compliance, ethics, or legal standards—highlighted in GPC’s audit integrity and ethics training modules." },
];


const Glossary = () => {
    const [activeLetter, setActiveLetter] = useState(null);
    const [search, setSearch] = useState("");


    // Group glossary by first letter
    const groupedGlossary = glossary.reduce((acc, item) => {
        const firstLetter = item.term[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(item);
        return acc;
    }, {});

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const handleLetterClick = (letter) => {
        setActiveLetter(letter);
        const section = document.getElementById(letter);
        if (section) {

            //const stickyOffset = 32 * 20;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - stickyOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };



    // Filtered glossary for search
    const filteredGlossary = Object.entries(groupedGlossary).reduce((acc, [letter, items]) => {
        const filteredItems = items.filter((item) =>
            item.term.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredItems.length > 0) acc[letter] = filteredItems;
        return acc;
    }, {});

    const glossarySchema = {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "name": "Glossary of Terms - Global Professional Certifications",
        "description": "A glossary of terms related to CIA, CISA, CRMA, and IAP certifications.",
        "url": "https://globalprofessionalcertifications.com/glossary",
        "hasDefinedTerm": [
            { "@type": "DefinedTerm", "name": "CIA", "description": "Certified Internal Auditor - professional certification for internal auditors." },
            { "@type": "DefinedTerm", "name": "CISA", "description": "Certified Information Systems Auditor - certification for auditing and control of information systems." },
            { "@type": "DefinedTerm", "name": "CRMA", "description": "Certified Risk Management Auditor - certification for auditors specializing in risk management." },
            { "@type": "DefinedTerm", "name": "IAP", "description": "Internal Audit Practitioner - entry-level certification for aspiring internal auditors." }
        ]
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Glossary of Terms for CIA, CISA, CRMA, and IAP Certifications",
        "description": "This glossary explains key terms and concepts related to CIA, CISA, CRMA, and IAP certifications.",
        "author": { "@type": "Organization", "name": "Global Professional Certifications" },
        "publisher": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "logo": { "@type": "ImageObject", "url": "https://globalprofessionalcertifications.com/logo.png" }
        },
        "url": "https://globalprofessionalcertifications.com/glossary",
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://globalprofessionalcertifications.com/glossary" },
        "datePublished": "2025-10-07",
        "dateModified": "2025-10-07"
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(glossarySchema)}
                </script>
            </Helmet>
            <MetaTags
                title="Certification Glossary | Key Terms for Auditors & Risk Professionals"
                description="Explore definitions of essential terms in risk management, internal audit, and advisory careers. This comprehensive glossary from Global Professional Certifications (GPC) helps you master industry language and excel in globally recognized certifications."
                canonicalUrl="https://globalprofessionalcertifications.com/glossary"
            />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 sm:px-6 md:px-8">
                <div className="max-w-4xl w-full pt-28 sm:pt-32">
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-center mb-6 sm:mb-8">Glossary</h1>

                    {/* Search Box */}
                    <input
                        type="text"
                        placeholder="Search a term..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
                    />

                    {/* A–Z Finder */}
                    <div className="w-full flex justify-center flex-wrap mb-8">
                        {letters.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                className={`px-1 py-0.5 text-[10px] sm:text-xs md:text-sm font-medium transition-colors ${activeLetter === letter
                                    ? "text-white bg-brand-blue rounded"
                                    : "text-gray-600 hover:text-brand-blue"
                                    }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>


                    {/* Glossary Cards */}
                    {search ? (
                        Object.keys(filteredGlossary).length > 0 ? (
                            Object.keys(filteredGlossary)
                                .sort()
                                .map((letter) => (
                                    <div key={letter} className="mb-8 sm:mb-10">
                                        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">{letter}</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                            {filteredGlossary[letter].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition"
                                                >
                                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.term}</h3>
                                                    <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.definition}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500 text-center mt-10">No matching terms found.</p>
                        )
                    ) : activeLetter ? (
                        groupedGlossary[activeLetter] && groupedGlossary[activeLetter].length > 0 ? (
                            <div id={activeLetter} className="mb-8 sm:mb-10 scroll-mt-32">
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {groupedGlossary[activeLetter].map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition"
                                        >
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.term}</h3>
                                            <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.definition}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center mt-10">
                                No terms found for "{activeLetter}"
                            </p>
                        )
                    ) : (
                        Object.keys(groupedGlossary)
                            .sort()
                            .map((letter) => (
                                <div key={letter} id={letter} className="mb-8 sm:mb-10 scroll-mt-32">
                                    <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">{letter}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        {groupedGlossary[letter].map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition"
                                            >
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.term}</h3>
                                                <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.definition}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Glossary;