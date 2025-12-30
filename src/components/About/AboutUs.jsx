import { PiBrain } from "react-icons/pi";
import aboutHero from "../../assets/about/about-hero.webp";
import arpitGarg from "../../assets/arpit-garg.webp";
import ourMissionOne from "../../assets/about/our-mission-1.webp";
import ourMissionTwo from "../../assets/about/our-mission-2.webp";
import ourVision from "../../assets/about/our-vision.webp";
import { AiOutlineLinkedin } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags";
import { HiOutlineMail } from "react-icons/hi";

export default function AboutUs() {
    return (
        <>
            <MetaTags
                title="About Global Professional Certifications"
                description="Learn how we empower professionals with globally recognized certifications and expert-driven learning."
                canonicalUrl="https://globalprofessionalcertifications.com/about"
            />
            <section className="bg-brand-blue py-20 sm:py-20 lg:py-20 relative md:min-h-[80vh] md:flex md:justify-center md:items-center">
                <div className="w-full mt-24 max-w-[75rem] px-4 sm:px-6 lg:px-12 mx-auto ">
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
                        <div className="w-full flex flex-col justify-start lg:items-start items-center gap-6 sm:gap-8">
                            <div className="w-full flex flex-col lg:items-start items-center gap-4">
                                <h1 className="mt-6 text-3xl md:text-6xl font-bold leading-tight text-white">
                                    Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Career</span>
                                </h1>
                                <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-lg leading-relaxed">
                                    At <span className='font-bold text-orange-400'>Global Professional Certifications</span> (GPC), we empower audit and risk professionals worldwide with industry-leading <span className='font-bold text-orange-400'>CIA, CISA, CRMA, and IAP</span> certification programs.
                                </h2>
                            </div>
                            <Link to="/contact">
                                <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl">
                                    Talk to Us
                                </button>
                            </Link>
                        </div>
                        <img
                            className="w-full max-w-[500px] mx-auto lg:mx-auto h-auto rounded-3xl object-cover "
                            src={aboutHero}
                            alt="Professional working on her desktop"
                        />
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 lg:py-24 ">
                <div className="w-full max-w-[75rem] px-4 sm:px-6 lg:px-8 mx-auto">
                    <div className="w-full grid  grid-cols-1 gap-8 lg:gap-12 lg:flex lg:flex-row items-center ">
                        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6 lg:order-first order-last lg:flex lg:flex-col lg:px-10 lg:max-w-[560px]">
                            <div className="flex  justify-center sm:justify-end items-start ">
                                <img
                                    className="w-full max-w-[300px] h-full lg:min-h-1/2 rounded-xl object-cover "
                                    src={ourMissionTwo}
                                    alt="Our mission image 2"
                                />
                            </div>
                            <div className="flex justify-center sm:justify-start items-start">
                                <img
                                    className="w-full max-w-[300px] h-full lg:min-h-1/2 rounded-xl object-cover "
                                    src={ourMissionOne}
                                    alt="Our mission image 1"
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center lg:items-start items-center gap-8">
                            <div className="w-full flex flex-col justify-start lg:items-start items-center gap-4">
                                <h3 className="text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold font-manrope leading-tight lg:text-start text-center">
                                    Our Mission
                                </h3>
                                <p className="text-brand-gray text-sm sm:text-base md:text-lg font-normal leading-relaxed lg:text-start text-center">
                                    Our mission is to bridge the gap between ambition and achievement, transforming learners into leaders through rigorous, globally recognized certifications. We specialize in preparing individuals for prestigious programs, including the Certified Internal Auditor (CIA), Certification in Risk Management Assurance (CRMA), Internal Audit Practitioner (IAP), and Certified Information Systems Auditor (CISA), each widely regarded as the gold standard in the risk assurance and advisory domain.
                                </p>
                            </div>
                            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-2xl shadow-lg">
                                <div className="flex flex-col w-full justify-start items-start bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-manrope leading-snug">250+</h3>
                                    <h6 className="text-gray-500 text-xs sm:text-sm font-medium leading-normal">CIA's</h6>
                                </div>
                                <div className="flex flex-col w-full justify-start items-start bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h4 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-manrope leading-snug">5+</h4>
                                    <h6 className="text-gray-500 text-xs sm:text-sm font-medium leading-normal">Years of Teaching Experience</h6>
                                </div>
                                <div className="flex flex-col w-full justify-start items-start bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h4 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-manrope leading-snug">1500+</h4>
                                    <h6 className="text-gray-500 text-xs sm:text-sm font-medium leading-normal">Professionals from Top Companies</h6>
                                </div>
                                <div className="flex flex-col w-full justify-start items-start bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h4 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-manrope leading-snug">25+</h4>
                                    <h6 className="text-gray-500 text-xs sm:text-sm font-medium leading-normal">Batches Completed</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-brand-blue py-12 sm:py-16 lg:py-24 relative">
                <div className="w-full max-w-[75rem] px-4 sm:px-6 lg:px-8 mx-auto">
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
                        <img
                            className="w-full max-w-[500px] mx-auto lg:mx-auto h-auto rounded-3xl object-cover shadow-2xl shadow-gray-500/50"
                            src={ourVision}
                            alt="Our vision image"
                        />
                        <div className="w-full flex flex-col justify-start lg:items-start items-center gap-6 sm:gap-8">
                            <div className="w-full flex flex-col justify-start lg:items-start items-center gap-4">
                                <h2 className="text-gray-50 text-2xl sm:text-3xl md:text-4xl font-bold font-manrope leading-tight lg:text-start text-center">
                                    Our Vision
                                </h2>
                                <p className="text-gray-50 text-sm sm:text-base md:text-lg font-normal leading-relaxed lg:text-start text-center">
                                    We envision a world where professionals are equipped with the knowledge, skills, and confidence to excel in their careers and make a lasting impact in their industries. By offering cutting-edge training and support, we aim to foster a community of highly skilled auditors, risk managers, and advisors who drive organizational success on a global scale.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 lg:py-24 relative bg-gray-50">
                <div className="w-full max-w-[75rem] px-4 sm:px-6 lg:px-8 mx-auto max-w-[1370px]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="col-span-1 lg:col-span-2 rounded-2xl flex border border-gray-400 shadow-lg transform transition-transform duration-300 hover:scale-[1.02] bg-white">
                            <div className="p-6 sm:p-8 flex flex-col justify-center">
                                <h1 className="text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold pb-4 sm:pb-6">What Sets Us Apart</h1>
                                <p className="text-brand-gray text-sm sm:text-base font-semibold leading-relaxed">
                                    Global Professional Certifications stands out as a leader in professional development through our unique value proposition and differentiators
                                </p>
                            </div>
                            <div className="px-8 sm:px-16 py-8 sm:py-12 rounded-lg flex items-center justify-center">
                                <PiBrain className="text-brand-blue w-24 h-24 sm:w-32 sm:h-32" />
                            </div>
                        </div>
                        <div className="col-span-1 border border-gray-400 rounded-2xl shadow-lg flex flex-col py-6 px-6 sm:py-8 sm:px-8 transform transition-transform duration-300 hover:scale-[1.02] bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" className="text-brand-blue">
                                <path d="M21.0985 7.84477C20.458 8.55417 19.5311 9 18.5 9C16.567 9 15 7.433 15 5.5C15 4.46895 15.4458 3.54203 16.1552 2.90149M21.0985 7.84477C21.6774 9.11025 22 10.5174 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4826 2 14.8898 2.32262 16.1552 2.90149M21.0985 7.84477C20.0998 5.66155 18.3384 3.90018 16.1552 2.90149" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10 8H10.0064" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 14H7.00635" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 16C16 17.1046 15.1046 18 14 18C12.8954 18 12 17.1046 12 16C12 14.8954 12.8954 14 14 14C15.1046 14 16 14.8954 16 16Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <h1 className="pt-4 text-lg sm:text-xl font-bold text-brand-dark">Globally Recognized Certification</h1>
                            <p className="pt-2 text-brand-gray text-sm sm:text-base font-semibold leading-relaxed">
                                Our programs is internationally accredited, opening doors to opportunities across borders and industries, with endorsements from top companies.
                            </p>
                        </div>
                        <div className="col-span-1 border border-gray-400 rounded-2xl shadow-lg flex flex-col py-6 px-6 sm:py-8 sm:px-8 transform transition-transform duration-300 hover:scale-[1.02] bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" className="text-brand-blue">
                                <path d="M17.7705 4.99408L14.3145 3.66279C13.1674 3.22093 12.5939 3 12.0001 3C11.4062 3 10.8327 3.22093 9.68561 3.66279L6.22941 4.99417C4.07647 5.82351 2.99999 6.23818 3 7.00021C3.00001 7.76225 4.07649 8.17688 6.22946 9.00616L9.68542 10.3373C10.8324 10.7791 11.4058 11 11.9996 11C12.5934 11 13.1668 10.7791 14.3138 10.3374L17.7704 9.0061C19.9235 8.17685 21 7.76223 21 7.00018C21 6.23814 19.9235 5.82345 17.7705 4.99408Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 9.50488L17.7705 9.99429C19.9235 10.8237 21 11.2383 21 12.0004C21 12.7624 19.9235 13.1771 17.7704 14.0063L14.3138 15.3376C13.1668 15.7793 12.5934 16.0002 11.9996 16.0002C11.4058 16.0002 10.8324 15.7793 9.68542 15.3375L6.22946 14.0064C4.07649 13.1771 3.00001 12.7625 3 12.0004C2.99999 11.2384 4.07647 10.8237 6.22941 9.99437L7.50011 9.50488" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 10.5L8.76086 14.8882M5 13.5L10.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.6352 14.5566L17.7705 14.9939C19.9235 15.8233 21 16.238 21 17.0001C21 17.7621 19.9235 18.1767 17.7704 19.006L14.3138 20.3373C13.1668 20.779 12.5934 20.9999 11.9996 20.9999C11.4058 20.9999 10.8324 20.779 9.68542 20.3372L6.22946 19.006C4.07649 18.1768 3.00001 17.7621 3 17.0001C2.99999 16.238 4.07647 15.8234 6.22941 14.994L7.36476 14.5567" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className="pt-4 text-lg sm:text-xl font-bold text-brand-dark">Expert-Led Training</h1>
                            <p className="pt-2 text-brand-gray text-sm sm:text-base font-semibold leading-relaxed">
                                Our programs are delivered by industry veterans and subject matter experts who bring years of practical experience, ensuring you receive the highest quality.
                            </p>
                        </div>
                        <div className="col-span-1 border border-gray-400 rounded-2xl shadow-lg flex flex-col py-6 px-6 sm:py-8 sm:px-8 transform transition-transform duration-300 hover:scale-[1.02] bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" className="text-brand-blue">
                                <path d="M6.5825 7.23786C9.58958 7.768 11.3818 8.87693 12 9.51357C12.6182 8.87693 14.4104 7.768 17.4175 7.23786C18.9409 6.96929 19.7026 6.83501 20.3513 7.3497C21 7.8644 21 8.70019 21 10.3718V16.3791C21 17.9076 21 18.6718 20.5837 19.1489C20.1673 19.626 19.2507 19.7876 17.4175 20.1108C15.7833 20.3989 14.5079 20.8579 13.5847 21.3192C12.6765 21.7731 12.2223 22 12 22C11.7777 22 11.3235 21.7731 10.4153 21.3192C9.4921 20.8579 8.2167 20.3989 6.5825 20.1108C4.74929 19.7876 3.83268 19.626 3.41634 19.1489C3 18.6718 3 17.9076 3 16.3791V10.3718C3 8.70019 3 7.8644 3.6487 7.3497C4.29741 6.83501 6.5825 7.23786Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 9L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M8.5 3.05857C9.51136 2.38797 10.7089 2 11.9926 2C13.2825 2 14.4855 2.39177 15.5 3.06841M13.6222 5.5C13.1421 5.21025 12.5857 5.04459 11.9926 5.04459C11.4058 5.04459 10.855 5.20674 10.3784 5.49078" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <h1 className="pt-4 text-lg sm:text-xl font-bold text-brand-dark">Flexible Learning on Weekends</h1>
                            <p className="pt-2 text-brand-gray text-sm sm:text-base font-semibold leading-relaxed">
                                We understand the demands of a busy professional life. Our live online sessions, conducted on weekends.
                            </p>
                        </div>
                        <div className="col-span-1 border border-gray-400 rounded-2xl shadow-lg flex flex-col py-6 px-6 sm:py-8 sm:px-8 transform transition-transform duration-300 hover:scale-[1.02] bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" className="text-brand-blue">
                                <path d="M22 7.28342C22 9.92499 19.7611 12.0668 17 12.0668C16.6753 12.0672 16.3516 12.0372 16.0327 11.9773C15.8031 11.9342 15.6883 11.9127 15.6082 11.9249C15.5281 11.9371 15.4145 11.9975 15.1874 12.1183C14.545 12.4599 13.7959 12.5806 13.0755 12.4466C13.3493 12.1098 13.5363 11.7057 13.6188 11.2725C13.6688 11.0075 13.545 10.7501 13.3594 10.5617C12.5166 9.70583 12 8.5526 12 7.28342C12 4.64184 14.2388 2.50006 17 2.50006C19.7611 2.50006 22 4.64184 22 7.28342Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M15.4922 7.5H15.5003M18.4922 7.5H18.5003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M7.50189 21.5001H4.71817C4.39488 21.5001 4.07021 21.4546 3.77327 21.327C2.80666 20.9117 2.31624 20.3633 2.08769 20.0202C1.95764 19.8251 1.97617 19.5764 2.11726 19.389C3.23716 17.9015 5.83846 17.0031 7.50665 17.003C9.17484 17.0031 11.7714 17.9015 12.8913 19.389C13.0324 19.5764 13.0509 19.8251 12.9209 20.0202C12.6923 20.3633 12.2019 20.9117 11.2353 21.327C10.9383 21.4546 10.6137 21.5001 10.2904 21.5001H7.50189Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.2854 11.7889C10.2854 13.3202 9.04129 14.5616 7.50664 14.5616C5.97199 14.5616 4.72791 13.3202 4.72791 11.7889C4.72791 10.2576 5.97199 9.01624 7.50664 9.01624C9.04129 9.01624 10.2854 10.2576 10.2854 11.7889Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className="pt-4 text-lg sm:text-xl font-bold text-brand-dark">Comprehensive Support</h1>
                            <p className="pt-2 text-brand-gray text-sm sm:text-base font-semibold leading-relaxed">
                                From enrollment to certification and beyond, we provide personalized guidance, mentorship, and resources.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
                <div className="bg-white py-8 px-4 min-mx-4 md:mx-auto sm:px-6 lg:px-8 max-w-[50rem] border border-gray-300 rounded-xl shadow-lg">
                    <div className="mx-auto max-w-screen-md text-center mb-6 sm:mb-8 lg:mb-12">
                        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue">Experienced Course Mentor</h2>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-brand-dark">Most Renowned Faculty in India</h4>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center max-w-2xl mx-auto">
                        <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col sm:flex-row transform transition-transform duration-300 hover:scale-[1.02] w-full">
                            <Link to="https://www.linkedin.com/in/arpit-garg-88070560" target="_blank">
                                <img
                                    className="w-full sm:w-48 h-64 sm:h-auto rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
                                    src={arpitGarg}
                                    alt="Arpit Garg"
                                />
                            </Link>
                            <div className="p-5 flex flex-col justify-center">
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                                    Arpit Garg
                                </h3>
                                <span className="text-brand-gray text-sm sm:text-base font-semibold">Co-founding Partner, Riskman</span>
                                <p className="mt-3 mb-4 text-sm sm:text-base font-light text-brand-gray">CA, CIA, CRMA, CISA</p>
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link to="mailto:cia@globalprofessionalcertifications.com">
                                            <HiOutlineMail className="h-5 w-5 sm:h-6 sm:w-6 text-brand-blue cursor-pointer hover:text-brand-dark" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://www.linkedin.com/in/arpit-garg-88070560" target="_blank">
                                            <AiOutlineLinkedin className="h-5 w-5 sm:h-6 sm:w-6 text-brand-blue cursor-pointer hover:text-brand-dark" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://www.riskman.in/" target="_blank">
                                            <TbWorldWww className="h-5 w-5 sm:h-6 sm:w-6 text-brand-blue cursor-pointer hover:text-brand-dark" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
