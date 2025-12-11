import React, { useEffect } from 'react';
import heroGirl from '../../assets/hero-girl.webp';
import { Link } from 'react-router-dom';
import examOne from "../../assets/exam-1.webp";
import examTwo from "../../assets/exam-2.webp";
import examThree from "../../assets/exam-3.webp";
import examFour from "../../assets/exam-4.webp";
import Card from '../Card/Card';
import { SiGoogleclassroom } from "react-icons/si";
import { IoBookOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";
import ciaHero from "../../assets/cia-hero.jpg";
import MetaTags from '../MetaTags';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';

const Cia = () => {

    useEffect(() => {
        // Preload the hero image when the component mounts
        const img = new Image();
        img.src = heroGirl;
    }, []);


    const ciaSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Certified Internal Auditor (CIA)",
        "description": "The CIA course provides professional certification for internal auditors to enhance auditing skills and career credibility.",
        "provider": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "url": "https://globalprofessionalcertifications.com",
            "logo": "https://globalprofessionalcertifications.com/logo.png"
        }
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(ciaSchema)}
                </script>
            </Helmet>

            <MetaTags
                title="CIA Certification Course ΓÇô Pass the Challenge Exam"
                description="Prepare for the CIA Challenge Exam with live sessions, Gleim content, and expert guidance from Global Professional Certifications."
                canonicalUrl="https://globalprofessionalcertifications.com/courses/cia"
            />

            {/* Hero Section */}

            <div className={`md:h-screen flex justify-center items-center bg-brand-blue pb-12 md:pb-0 sm:pt-${(16 + (height ? height - 4 : 0)).toString()}`}>
                <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
                    <div className="max-w-sm md:max-w-2xl mx-auto">
                        <div className="relative w-md md:max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                                Ace Your CIA Exam with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">India's #1 IIA-Accredited</span> Training Program
                            </h1>
                            <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed">Become Certified Internal Auditor (CIA) with <span className='font-bold text-orange-400'>Gleim content, 1000+ MCQs, weekend live classes.</span> Our proven methodology helped 250+ professionals achieve CIA certification with an 80%+ pass rate. Complete in 7-8 months with full IIA registration and exam support. </h2>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="https://rzp.io/rzp/CIASessions"
                                target='blank'
                                title=""
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                                role="button"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto lg:max-w-6xl">
                        <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={ciaHero} alt="homepage hero" loading='lazy' />
                    </div>

                </div>
            </div>

            <div className="max-w-sm md:max-w-[52rem] mx-auto mt-24">
                <h3 className="text-center text-2xl md:text-4xl font-extrabold mb-8 mt-16 text-brand-blue">CIA Enrollment (All 3 Parts), Your Path to Success</h3>
                <p className="text-center text-xl md:text-2xl font-semibold mb-16 md:mb-8 mt-8 text-brand-dark">Earn the Certified Internal Auditor (CIA) certification and accelerate your career with global recognition, high salaries, and job security</p>
            </div>
            <div className="flex md:justify-center md:flex-row flex-col gap-4 md:gap-0 items-center md:w-full md:mb-24">
                <Card
                    title="CIA all 3 Parts with Gleim Content"
                    image={examOne}
                    text={"Master the complete CIA exam with expert guidance and comprehensive study materials"}
                    price={58999}
                    enrollLink="https://rzp.io/rzp/CIASessions"
                    imageStyle={"pt-4"} />
                <Card
                    title="CIA Part 1 with Gleim Content"
                    image={examTwo}
                    text={"Build a strong foundation in internal audit essentials with in-depth preparation"}
                    imageStyle={"pt-12"} />
                <Card
                    title="CIA Part 2 with Gleim Content"
                    image={examThree}
                    text={"Strengthen your skills in risk management, governance, and control processes"} />
                <Card
                    title="CIA Part 3 with Gleim Content"
                    image={examFour}
                    text={"Gain expertise in business acumen, financial management, and data analytics"}
                    imageStyle={"pt-8"} />
            </div>


            <div className="md:mb-24 mt-16 w-full px-4">
                <div className="flex justify-center">
                    <div className="bg-[#ffebcd] grid grid-cols-1 md:grid-cols-2 md:w-[72rem] py-10 rounded-2xl shadow-xl w-full">
                        <p className="text-2xl px-6 md:px-10 md:text-4xl font-bold mb-6 md:col-span-2 text-center md:text-left text-black">
                            CIA All Parts with Gleim Content as Per the New Syllabus
                        </p>

                        {/* Left Side */}
                        <div className="flex flex-col px-6 md:px-10">
                            <div className="flex space-x-2 mb-4 items-center text-base sm:text-lg md:text-xl">
                                <SiGoogleclassroom className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" />
                                <span className="text-black font-semibold">Live Classes</span>
                            </div>
                            <div className="flex space-x-2 mb-4 items-center text-base sm:text-lg md:text-xl">
                                <IoBookOutline className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" />
                                <span className="text-black font-semibold">Gleim Soft Book + 1000+ MCQs</span>
                            </div>
                            <div className="flex space-x-2 mb-4 items-center text-base sm:text-lg md:text-xl">
                                <CgNotes className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" />
                                <span className="text-black font-semibold">Class Notes + In-Class MCQs</span>
                            </div>
                            <p className="text-lg md:text-3xl mt-4 font-semibold text-[#964b00]">
                                Start your upskilling journey today!
                            </p>
                        </div>

                        {/* Right Side Button */}
                        <div className="flex items-center justify-center mt-6 md:mt-0 px-6 md:px-0">
                            <Link
                                to={"https://rzp.io/rzp/CIASessions"}
                                target="_blank"
                                className="flex items-center justify-center rounded-xl bg-[#E0C4A8] px-10 py-5 sm:px-10 sm:py-6 text-center text-xl sm:text-2xl md:text-2xl font-medium text-gray-800 hover:bg-[#D4B190] transition ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Enroll Now
                                <FaArrowRightLong className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



            <div className="max-w-6xl mx-auto mt-16 md:mt-24 mb-24 px-4 md:px-0">
                <p className="text-center text-3xl md:text-4xl font-extrabold mb-8 md:mb-20 text-brand-blue">CIA Exam Structure</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                        <p className="text-2xl font-bold text-brand-blue mb-2 text-center">CIA Part 1</p>
                        <p className="text-center mb-4 text-xl text-brand-purple font-bold">Internal Audit Fundamentals</p>
                        <hr className="mb-4 border-2 border-solid border-gray-300"></hr>
                        <p className="text-gray-700 text-lg">125 questions | 2.5 Hours</p>
                        <p className="text-gray-800 font-bold mt-2">Topics:</p>
                        <ul className="text-gray-700 list-disc pl-4">
                            <li>Foundations of Internal Auditing (35%)</li>
                            <li>Ethics and Professionalism (20%)</li>
                            <li>Governance, Risk Management and Control (30%)</li>
                            <li>Fraud Risks (15%)</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                        <p className="text-2xl text-center font-bold text-brand-blue mb-2">CIA Part 2</p>
                        <p className="text-center mb-4 text-xl text-brand-purple font-bold">Internal Audit Engagement</p>
                        <hr className="mb-4 border-2 border-solid border-gray-300"></hr>
                        <p className="text-gray-700 text-lg">100 questions | 2 Hours</p>
                        <p className="text-gray-800 font-bold mt-2">Topics:</p>
                        <ul className="text-gray-700 list-disc pl-4">
                            <li>Engagement Planning (50%)</li>
                            <li>Information Gathering, Analysis and Evaluation (40%)</li>
                            <li>Engagement Supervision and Communication (10%)</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                        <p className="text-2xl font-bold text-brand-blue mb-2 text-center">CIA Part 3</p>
                        <p className="text-center mb-4 text-xl text-brand-purple font-bold">Internal Audit Function</p>
                        <hr className="mb-4 border-2 border-solid border-gray-300"></hr>
                        <p className="text-gray-700 text-lg">100 questions | 2 Hours</p>
                        <p className="text-gray-800 font-bold mt-2">Topics:</p>
                        <ul className="text-gray-700 list-disc pl-4">
                            <li>Internal Audit Operations (25%)</li>
                            <li>Internal Audit Plans (15%)</li>
                            <li>Quality of the Internal Audit Function (15%)</li>
                            <li>Engagement Results and Monitoring (45%)</li>
                        </ul>
                    </div>
                </div>
            </div>



            <div className="max-w-6xl mx-auto my-16 sm:my-24 px-4">
                <div className="bg-white shadow-xl rounded-xl py-8 sm:py-12 px-6 sm:px-10 md:px-16 border border-gray-300">
                    <p className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-brand-blue">
                        Exam Logistics
                    </p>
                    <hr className="border-2 border-solid border-gray-300 mb-6" />
                    <ul className="space-y-2 sm:space-y-6 list-disc pl-5 sm:pl-8">
                        {[
                            "CIA is a 100% MCQ-based exam with no negative marking",
                            "Score at least 600 points out of 750 (80%) to clear the exam",
                            "Validity of CIA registration is 3 years from the date of initial registration (when you pay application fees)",
                            "Exam window is 180 days from the date you register for your CIA exam (when you pay exam fees)",
                            "Appear for any part in any sequence and get results immediately",
                            "Exams are conducted both in India and abroad; in India, exams are only at PearsonVue Centers",
                        ].map((point, index) => (
                            <li
                                key={index}
                                className="text-gray-800 text-base sm:text-lg marker:text-brand-blue marker:text-xl sm:marker:text-2xl"
                            >
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>



            <div className="max-w-5xl mx-auto my-16 sm:my-24 px-4 md:px-0">
                <p className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-10 text-brand-blue">
                    Fees and Membership Benefits
                </p>

                {/* Table Layout (visible on md and up) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-[800px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">

                        {/* Style the table in a better way! */}

                        <thead>
                            <tr className="bg-brand-blue text-white text-xl text-left font-bold">
                                <th className="py-3 pr-4 pl-6 border-b">Fee Type</th>
                                <th className="py-3 px-4 border-b">IIA Members</th>
                                <th className="py-3 px-4 border-b">Non-Members</th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-50">

                            <tr className="border-b text-lg text-left">
                                <td className="py-2 pr-4 pl-6">CIA Application Fees</td>
                                <td className="py-2 px-4 text-green-700 font-semibold">USD 90</td>
                                <td className="py-2 px-4 text-red-700 font-semibold">USD 240</td>
                            </tr>
                            <tr className="border-b text-lg text-left">
                                <td className="py-2 pr-4 pl-6">CIA Part 1 Exam Fees</td>
                                <td className="py-2 px-4 text-green-700 font-semibold">USD 232.50</td>
                                <td className="py-2 px-4 text-red-700 font-semibold">USD 445</td>
                            </tr>
                            <tr className="border-b text-lg text-left">
                                <td className="py-2 pr-4 pl-6">CIA Part 2 Exam Fees</td>
                                <td className="py-2 px-4 text-green-700 font-semibold">USD 210</td>
                                <td className="py-2 px-4 text-red-700 font-semibold">USD 415</td>
                            </tr>
                            <tr className="border-b text-lg text-left">
                                <td className="py-2 pr-4 pl-6">CIA Part 3 Exam Fees</td>
                                <td className="py-2 px-4 text-green-700 font-semibold">USD 210</td>
                                <td className="py-2 px-4 text-red-700 font-semibold">USD 415</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <p className="pl-1 mt-4 text-gray-700 italic text-sm">Note: 18% GST is applicable on the above fees</p>
                    <p className="pl-1 mt-2 text-gray-700 italic text-sm">IIA Membership Fees: New Member - INR 6500 + GST | <span className="">Annual Renewal</span> - INR 4000 + GST</p> */}
                </div>

                {/* Card Layout (visible below md) */}
                <div className="md:hidden grid gap-6 mt-4">
                    {[
                        {
                            label: "CIA Application Fees",
                            member: "USD 90",
                            nonMember: "USD 240",
                        },
                        {
                            label: "CIA Part 1 Exam Fees",
                            member: "USD 232.50",
                            nonMember: "USD 445",
                        },
                        {
                            label: "CIA Part 2 Exam Fees",
                            member: "USD 210",
                            nonMember: "USD 415",
                        },
                        {
                            label: "CIA Part 3 Exam Fees",
                            member: "USD 210",
                            nonMember: "USD 415",
                        },
                    ].map((fee, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-300 rounded-xl shadow-md p-5"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                {fee.label}
                            </h2>
                            <div className="text-sm font-medium space-y-1">
                                <p>
                                    <span className="text-brand-blue font-bold">IIA Members: </span>
                                    <span className="text-green-700">{fee.member}</span>
                                </p>
                                <p>
                                    <span className="text-brand-blue font-bold">Non-Members: </span>
                                    <span className="text-red-700">{fee.nonMember}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Notes (shared below both layouts) */}
                <div className="mt-6 text-sm sm:text-base text-gray-700 italic space-y-2 pl-1">
                    <p>Note: 18% GST is applicable on the above fees</p>
                    <p>
                        IIA Membership Fees: <span className="font-medium">New Member ΓÇô INR 6500 + GST</span> |
                        <span className="font-medium ml-1">Annual Renewal ΓÇô INR 4000 + GST</span>
                    </p>
                </div>
            </div>



            <div className="max-w-6xl mx-auto my-16 sm:my-24 px-4">
                <div className="bg-white shadow-xl rounded-xl py-8 sm:py-12 px-6 sm:px-10 md:px-16 border border-gray-200">
                    <p className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-brand-blue">
                        Training Program Details
                    </p>
                    <hr className="border-2 border-solid border-gray-300 mb-6" />
                    <ul className="space-y-2 sm:space-y-6 list-disc pl-5 sm:pl-8">
                        {[
                            "Complete your CIA Certification within 7-8 months",
                            "Upcoming Batch Schedule: CIA Part 1 - May & June, CIA Part 2 - July & Aug, CIA Part 3 - Sep & Oct",
                            "15-20 live classes for each part, each class 3 hours long (weekend mornings, 7:00 AM IST to 10:00 AM IST)",
                            "Recordings uploaded within 24-48 hours after class",
                            "Access to LMS Portal with recorded sessions, PPT notes, and MCQs (no validity period)",
                            "Guidance from top CIA faculty in India, Mr. Arpit Garg",
                            "Access to Gleim software with soft copies of books and over 1000 MCQs (validity of 18 months)",
                            "End-to-end support until you clear all exams",
                        ].map((point, index) => (
                            <li
                                key={index}
                                className="text-gray-800 text-base sm:text-lg marker:text-brand-blue marker:text-xl sm:marker:text-2xl"
                            >
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>




            <div className="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-0 bg-orange-100 py-8 sm:py-12 rounded-lg shadow-xl">
                <p className="text-center text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 text-brand-blue">
                    Revised pricing plan <span className="whitespace-nowrap">16th April 2025</span> onwards...
                </p>

                <p className="text-center text-lg sm:text-2xl font-semibold text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                    Enroll for all 3 parts along with Gleim content for Γé╣58,999 only<br />
                    Or each part for Γé╣23,599 only
                </p>

                <p className="text-center text-xl sm:text-3xl md:text-4xl font-semibold text-brand-blue mb-8 sm:mb-10">
                    Enroll now to kickstart your career and stay ahead of the curve!
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    <Link
                        to="https://rzp.io/rzp/CIASessions"
                        target="_blank"
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-xl font-bold text-white bg-brand-blue rounded-lg hover:bg-orange-900 transition duration-200"
                    >
                        Enroll for All Parts
                    </Link>
                    <Link
                        to="https://rzp.io/rzp/iFUFvKph"
                        target="_blank"
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-xl font-bold text-white bg-brand-blue rounded-lg hover:bg-orange-900 transition duration-200"
                    >
                        Enroll for Each Part
                    </Link>
                </div>
            </div>

        </>

    );
}

export default Cia;
