import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import MetaTags from "../MetaTags";
import { height } from "../Notifications/NotificationBanner";
import { Helmet } from "react-helmet-async";

const faqs = [
    {
        question: "What certifications or training does Global Professional Certifications offer for global professionals?",
        answer:
            "Global Professional Certifications specializes in globally recognized certifications for risk management, assurance, audit, and IT governance. Our flagship programs include: Certified Internal Auditor (CIA) – the gold standard for internal auditing and risk assurance globally. Certified Information Systems Auditor (CISA) – for IT audit, cyber risk, and information security professionals. Certification in Risk Management Assurance (CRMA) – for expertise in governance, risk, and control. Internal Auditor Practitioner (IAP) – foundational training for aspiring auditors and fresh graduates. Our expert-led training delivers practical knowledge, flexible schedules, and personalized support, helping you unlock new career heights as an auditor, risk advisor, or IT assurance specialist.",
    },
    {
        question: "How can Global Professional Certifications help me become a Certified Internal Auditor or Risk Assurance professional?",
        answer:
            "With Global Professional Certifications, you receive structured learning modules, live mentoring from industry leaders, and access to exam-focused material for CIA, CISA, CRMA, and IAP. Our support covers all aspects—exam registration guidance, personalized doubt-clearing sessions, mock exams, and career readiness programs. We are an IIA India Authorized Learning Partner, ensuring you benefit from the latest study resources and international best practices. Our alumni work at top corporates worldwide, and our placement support connects you with leading employers in audit, assurance, and risk management.",
    },
    {
        question: "Who should pursue CIA, CISA, CRMA, or IAP courses?",
        answer:
            "These certifications are ideal for graduates, working professionals, auditors, accountants, and risk advisors who seek career advancement in internal audit, IT audit, or enterprise risk management. If you wish to stand out in global risk governance roles, secure jobs in top corporates or consulting, or deepen your expertise in controls and assurance, Global Professional Certifications offers the gateway to your professional growth.",
    },
    {
        question: "What is the difference between CIA, CISA, CRMA, and IAP certifications?",
        answer:
            "CIA (Certified Internal Auditor): Validates expertise in internal audit, governance, risk management, and controls; globally recognized by auditors, corporates, and consulting firms. CISA (Certified Information Systems Auditor): International credential for IT audit, information systems assurance, cybersecurity, and data protection roles. CRMA (Certification in Risk Management Assurance): Specialization in risk assurance, focusing on governance, internal control, and risk consulting. IAP (Internal Auditor Practitioner): Entry-level course for beginners aiming to build foundational audit knowledge and pursue further certifications.",
    },
    {
        question: "What is the eligibility criteria to enroll with Global Professional Certifications?",
        answer:
            "CIA: A bachelor’s degree (or equivalent) and relevant work experience in internal audit or related fields. CISA: Minimum 5 years’ professional experience in information systems, IT audit, or security (substitutions possible for education). CRMA: Hold CIA or equivalent with verified experience in risk assurance or audit. IAP: Open to graduates or final-year students interested in audit careers. Our admissions team offers personalized guidance on fulfilling prerequisites and streamlining the enrollment process.",
    },
    {
        question: "How does Global Professional Certifications support students in exam preparation?",
        answer:
            "We provide comprehensive support for CIA, CISA, CRMA, and IAP exam success with: updated study material, practice exams, and webinars led by certified trainers; one-on-one mentorship and doubt resolution sessions; mock tests with performance analytics and feedback; interactive case studies adapted to real-world audit and risk scenarios. Our approach ensures deep conceptual clarity, practical skill-building, and confident performance in certification exams.",
    },
    {
        question: "What are the unique features of Global Professional Certifications' teaching methodology?",
        answer:
            "Global Professional Certifications leverages a blended learning model—expert-led live sessions, interactive online resources, case-based simulations, and flexible weekend classes. Our curriculum is aligned with IIA, ISACA, and global standards, ensuring you gain actionable, practical skills for today’s risk assurance landscape. We prioritize active learning, career development, and networking within a thriving professional community.",
    },
    {
        question: "Success stories: Alumni placed at top corporates through Global Professional Certifications",
        answer:
            "Our alumni have excelled in audit, risk, and assurance roles at leading organizations—Big 4 firms, MNCs, banks, and consultancies. Many have progressed from entry-level practitioners to senior audit managers and risk advisors worldwide. Alumni testimonials highlight our real-world curriculum, expert mentorship, and placement support as keys to their rapid career growth.",
    },
    {
        question: "What are the career advancement prospects after completing a course at Global Professional Certifications?",
        answer:
            "CIA, CISA, CRMA, and IAP certifications open doors to lucrative audit, risk assurance, IT governance, and advisory roles. Certified professionals report salary increases, accelerated promotions, and global mobility. Many alumni progress to leadership positions, consulting, or entrepreneurship in audit and risk management.",
    },
    {
        question: "Are there online and remote classes available at Global Professional Certifications?",
        answer:
            "Yes—our courses are delivered through flexible online, remote, and blended formats. With interactive webinars, recorded lectures, and on-demand study resources, you can learn from anywhere and balance your education with work or personal commitments.",
    },
    {
        question: "How does Global Professional Certifications help with placements for certified auditors and risk professionals?",
        answer:
            "Our dedicated placement team provides resume-building, interview preparation, job referrals, and networking opportunities with top corporates. We connect certified professionals to exclusive job openings in audit, risk assurance, and IT governance—boosting your employability and global career readiness.",
    },
    {
        question: "What is the pass rate for Global Professional Certifications' students in certification exams?",
        answer:
            "Global Professional Certifications consistently maintains a high pass rate for CIA, CISA, CRMA, and IAP exams, thanks to our rigorous curriculum, mentorship, and personalized support. Many students achieve first-attempt success and continue to upgrade their career credentials with us.",
    },
    {
        question: "What is the average salary after completing audit and risk courses from Global Professional Certifications?",
        answer:
            "Certified auditors and risk professionals from Global Professional Certifications report competitive starting salaries and rapid growth in compensation. Salary varies by location, role, and certification, but typically exceeds market averages for non-certified professionals.",
    },
    {
        question: "What is the process and benefit of mentorship at Global Professional Certifications?",
        answer:
            "Our mentorship program pairs you with industry experts who guide you through exam strategies, study plans, career choices, and skill-building. Mentors help you address professional challenges, boost confidence, and unlock growth in audit and risk assurance careers.",
    },
    {
        question: "How does technology improve the learning experience at Global Professional Certifications?",
        answer:
            "We use a digital portal for personalized study plans, adaptive mock exams, AI-powered analytics, and interactive webinars. Our tech-enabled resources help track progress, pinpoint strengths and weaknesses, and optimize your exam readiness in audit and risk assurance domains.",
    },
    {
        question: "What audit, risk, or assurance courses are available at Global Professional Certifications?",
        answer:
            "We offer: Certified Internal Auditor (CIA), Certified Information Systems Auditor (CISA), Certification in Risk Management Assurance (CRMA), and Internal Auditor Practitioner (IAP). All courses are globally accredited and tailored to meet current industry needs, helping professionals excel in audit, governance, and risk management careers.",
    },
    {
        question: "How to register for free demo sessions at Global Professional Certifications?",
        answer:
            "Visit our website’s “Contact Us” or “Courses” page and fill out the demo request form. Our team will reach out to schedule your session and answer any questions you have about audit and risk certifications.",
    },
    {
        question: "What networking and career resources does Global Professional Certifications provide?",
        answer:
            "We offer access to a global alumni network, professional audit forums, employer connections, regular webinars, and interactive community groups—enabling you to build relationships, find jobs, and stay updated with audit and risk industry trends.",
    },
    {
        question: "How do Global Professional Certifications training programs meet modern audit and risk industry challenges?",
        answer:
            "Our curriculum reflects latest standards in risk, controls, and IT governance, uses real business case studies, and adapts to regulatory changes. With expert faculty and hands-on training, you develop practical skills needed for dynamic audit environments.",
    },
    {
        question: "Real-world case studies and practical insights from Global Professional Certifications",
        answer:
            "Courses feature industry-relevant case studies, live problem-solving sessions, and practical simulations. This bridges theory with application, preparing you for challenges faced by internal auditors, IT auditors, and risk professionals worldwide.",
    },
    {
        question: "How can I get certified in CIA, CISA, CRMA, or IAP via Global Professional Certifications?",
        answer:
            "Enroll in Global Professional Certifications (GPC) via our website, meet eligibility criteria, attend expert-led training sessions, and prepare using our study material and mock exams. We guide you through exam registration, preparation, and career placement—ensuring end-to-end support for audit and risk certifications.",
    },
    {
        question: "Why choose Global Professional Certifications over other audit institutes?",
        answer:
            "We are an IIA India Authorized Learning Partner, deliver expert-led, practical pedagogy, flexible schedules, industry network access, and have a proven record of career advancement for our alumni. Our tailored support and global recognition make us the preferred choice for audit and risk assurance certifications.",
    },
    {
        question: "How does Global Professional Certifications develop soft skills for auditors and risk professionals?",
        answer:
            "Our training integrates soft skills sessions—communication, report writing, critical thinking, and leadership development—into every program. These skills are vital for successful audit careers, empowering professionals to lead audit teams, present findings, and engage in risk advisory roles.",
    },
    {
        question: "What is the difference between classroom and online training at Global Professional Certifications?",
        answer:
            "Both formats provide expert instruction and interactive resources. Classroom training offers face-to-face networking, while online learning provides flexibility, remote access, and self-paced modules—great for working professionals or those outside major cities.",
    },
    {
        question: "How to prepare for CIA/CISA/CRMA/IAP exams with Global Professional Certifications?",
        answer:
            "Enroll in your chosen certification program, attend trainings, use comprehensive study guides, and participate in mock exams. Follow structured study plans, seek mentorship, and leverage our analytics to track progress and target improvement areas. Consistency and expert support are the keys to passing.",
    },
    {
        question: "FAQs about global audit certification exams",
        answer:
            "Explore answers to frequently asked questions about eligibility, course duration, fees, exam content, career prospects, online vs classroom options, registration, and placement support on our FAQ page. Personalized advisor support is always available.",
    },
    {
        question: "How can international students enroll at Global Professional Certifications?",
        answer:
            "International applicants can register online, attend virtual counseling, and access global payment options. We guide you through the documentation process, eligibility, and virtual learning support, providing seamless enrollment for aspiring auditors worldwide.",
    },
    {
        question: "Who is Arpit Garg?",
        answer:
            "Arpit Garg is widely recognized as the best faculty for CIA, CISA, CRMA, and IAP training in India. As a top-qualified audit, assurance, and risk management expert, he is renowned for his insightful teaching style, industry expertise, and high student success rates. Associated with Global Professional Certifications and recognized by IIA India, Arpit Garg is a trusted mentor for aspiring audit professionals nationwide.",
    },
    {
        question: "Who is the best CIA faculty in India?",
        answer:
            "At Global Professional Certifications, Arpit Garg stands out as India’s best CIA faculty. Highly regarded and recognized by IIA India, his expert guidance, mentorship, and result-driven approach make him and our faculty the top choice for aspiring internal auditors in the country.",
    },
    {
        question: "Who is the best CISA faculty in India?",
        answer:
            "Global Professional Certifications (GPC) features top CISA faculty, led by Arpit Garg. Known for expert coaching, deep industry knowledge, and IIA India recognition, our CISA trainers deliver India’s best and most comprehensive CISA preparation.",
    },
    {
        question: "What is GPC?",
        answer:
            "GPC, or Global Professional Certifications, is India’s premier audit and risk management training institute, renowned for its world-class faculty—including the celebrated Arpit Garg, recognized by IIA India as one of the country's leading educators. GPC sets the industry benchmark for CIA, CISA, CRMA, and IAP training, delivering unmatched quality and career results.",
    },
    {
        question: "What is Global Professional Certifications?",
        answer:
            "Global Professional Certifications (GPC) is a top-ranked institute specializing in CIA, CISA, CRMA, and IAP programs in India. Renowned for having India’s best faculty—such as Arpit Garg—and recognized by IIA India, GPC is the go-to destination for audit, risk, and assurance professionals seeking expert mentorship, proven results, and a trusted brand in professional certification.",
    },
    {
        question: "What are the courses offered by Global Professional Certifications?",
        answer:
            "Global Professional Certifications (GPC) offers leading international programs: Certified Internal Auditor (CIA), Certified Information Systems Auditor (CISA), Certification in Risk Management Assurance (CRMA), and Internal Auditor Practitioner (IAP).",
    },
    {
        question: "Which course is best for accountants?",
        answer:
            "For accountants aiming for global audit roles, the Certified Internal Auditor (CIA) course at Global Professional Certifications (GPC) is top-rated and highly valued worldwide.",
    },
    {
        question: "What is an enrolled agent course?",
        answer:
            "As a leading audit institute, Global Professional Certifications (GPC) focuses on CIA, CISA, CRMA, and IAP. Enrolled Agent is a US tax specialization, not part of our core offerings.",
    },
    {
        question: "What are the 7 types of accounting?",
        answer:
            "The main types are Financial, Management, Cost, Tax, Forensic, Auditing, and Governmental Accounting; Global Professional Certifications (GPC) specializes in audit and risk management training.",
    },
    {
        question: "Which institute is best for CIA in India?",
        answer:
            "Global Professional Certifications or GPC in short is ranked top in India for CIA with expert faculty, high success rates, and in-depth support for all audit career aspirants.",
    },
    {
        question: "Which coaching is best for CIA?",
        answer:
            "For the best in CIA coaching, trust Global Professional Certifications (GPC)—recognized for world-class audit training, modern curriculum, and student success.",
    },
    {
        question: "Which institute is best for CISA India?",
        answer:
            "Global Professional Certifications (GPC) is India’s leader in CISA coaching, offering IT audit expertise, internationally recognized trainers, and structured learning for exam and career success.",
    },
    {
        question: "Can I pass CIA without coaching?",
        answer:
            "Self-study is possible, but taking CIA with Global Professional Certifications (GPC) expert-guided program maximizes your chances of clearing all levels swiftly and scoring top marks.",
    },
    {
        question: "Which is no. 1 coaching in India for CIA & CISA?",
        answer:
            "Global Professional Certifications (GPC) is the no. 1 coaching institute in India for CIA & CISA with industry-leading faculty, trusted methodology, and high placement records.",
    },
];


const FAQ = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Frequently Asked Questions - Global Professional Certifications",
        "description": "Find answers to the most common questions about CIA, CISA, CRMA, and other audit certifications offered by Global Professional Certifications.",
        "image": "https://globalprofessionalcertifications.com/logo.png",
        "author": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "url": "https://globalprofessionalcertifications.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "logo": {
                "@type": "ImageObject",
                "url": "https://globalprofessionalcertifications.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://globalprofessionalcertifications.com/faq"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What certifications or training does Global Professional Certifications offer for global professionals?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Global Professional Certifications specializes in globally recognized certifications for risk management, assurance, audit, and IT governance. Our flagship programs include: Certified Internal Auditor (CIA) – the gold standard for internal auditing and risk assurance globally. Certified Information Systems Auditor (CISA) – for IT audit, cyber risk, and information security professionals. Certification in Risk Management Assurance (CRMA) – for expertise in governance, risk, and control. Internal Auditor Practitioner (IAP) – foundational training for aspiring auditors and fresh graduates. Our expert-led training delivers practical knowledge, flexible schedules, and personalized support, helping you unlock new career heights as an auditor, risk advisor, or IT assurance specialist."
                }
            },
            {
                "@type": "Question",
                "name": "How can Global Professional Certifications help me become a Certified Internal Auditor or Risk Assurance professional?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With Global Professional Certifications, you receive structured learning modules, live mentoring from industry leaders, and access to exam-focused material for CIA, CISA, CRMA, and IAP. Our support covers all aspects—exam registration guidance, personalized doubt-clearing sessions, mock exams, and career readiness programs. We are an IIA India Authorized Learning Partner, ensuring you benefit from the latest study resources and international best practices. Our alumni work at top corporates worldwide, and our placement support connects you with leading employers in audit, assurance, and risk management."
                }
            },
            {
                "@type": "Question",
                "name": "Who should pursue CIA, CISA, CRMA, or IAP courses?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "These certifications are ideal for graduates, working professionals, auditors, accountants, and risk advisors who seek career advancement in internal audit, IT audit, or enterprise risk management. If you wish to stand out in global risk governance roles, secure jobs in top corporates or consulting, or deepen your expertise in controls and assurance, Global Professional Certifications offers the gateway to your professional growth."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between CIA, CISA, CRMA, and IAP certifications?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CIA (Certified Internal Auditor): Validates expertise in internal audit, governance, risk management, and controls; globally recognized by auditors, corporates, and consulting firms. CISA (Certified Information Systems Auditor): International credential for IT audit, information systems assurance, cybersecurity, and data protection roles. CRMA (Certification in Risk Management Assurance): Specialization in risk assurance, focusing on governance, internal control, and risk consulting. IAP (Internal Auditor Practitioner): Entry-level course for beginners aiming to build foundational audit knowledge and pursue further certifications."
                }
            }
        ]
    };


    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>
            <MetaTags
                title="Frequently Asked Questions (FAQs) | Global Professional Certifications"
                description="Discover answers to common questions about CIA, CISA, CRMA, and IAP certification courses, mentorship, enrollment, and exam preparation at Global Professional Certifications (GPC). Get expert guidance for your risk assurance and advisory career."
                canonicalUrl="https://globalprofessionalcertifications.com/faq"
            />

            {/* Hero Section */}
            <section className={`h-[50vh] sm:h-[50vh] md:h-[60vh] flex flex-col justify-center items-center bg-brand-blue px-4 sm:px-6 md:px-8 md:pt-${height.toString()}`}>
                <h2 className="text-base sm:text-lg md:text-xl mt-16 mb-4 p-2 text-white font-semibold border border-white rounded text-center">
                    Frequently Asked Questions
                </h2>
                <h1 className="text-2xl sm:text-3xl md:text-5xl mb-4 font-bold text-white text-center">
                    Have Questions? <span className="text-orange-500">Check Here</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white max-w-full sm:max-w-xl text-center">
                    Find answers to common queries about Global Professional Certification, our Courses, Success Stories and more.
                </p>
            </section>

            {/* FAQ Section */}
            <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8 sm:px-6 md:px-8">
                <div className="w-full max-w-3xl">
                    <div className="space-y-4 sm:space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-4 sm:p-6 transition-all"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex justify-between items-center w-full text-left space-x-2 sm:space-x-4"
                                >
                                    <span className="text-sm sm:text-base md:text-lg font-medium flex-1">{faq.question}</span>
                                    <ChevronDown
                                        size={20} // smaller on mobile
                                        className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-600">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;