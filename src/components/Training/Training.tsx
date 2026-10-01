
import React from "react";
import training from "../../assets/training.webp";
import { SiKnowledgebase } from "react-icons/si";
import { FaBalanceScale } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Training() {
    return (
        <>
            <div className="flex justify-center">
                <div className="md:my-20 grid grid-cols-1 md:grid-cols-2 md:max-w-7xl">
                    <div className="flex items-center justify-center max-w-sm md:max-w-full mx-auto mb-10 md:mb-0">
                        <img src={training} className="object-contain rounded-lg shadow-2xl shadow-gray-500/50 mask-image md:h-[386px] md:w-[570px]" alt="Sample" />
                    </div>
                    <div className="flex flex-col px-10">
                        <h1 className="text-2xl md:text-4xl text-center md:text-left font-bold mb-8 text-brand-blue tracking-tight">Your Path to Success Starts Here</h1>
                        <div className="flex space-x-2 mb-4">
                            <span><SiKnowledgebase className="h-6 w-6 mt-1 mr-2" /></span>
                            <span className="text-brand-dark font-semibold sm:text-lg text-md">Real-world knowledge equips you with practical, actionable skills directly applicable to today’s dynamic professional environments.</span>
                        </div>
                        <div className="flex space-x-2 mb-4">
                            <span><FaBalanceScale className="h-6 w-6 mt-1 mr-2" /></span>
                            <span className="text-brand-dark font-semibold sm:text-lg text-md">Flexible learning on weekends allows you to balance your education with work and personal commitments, fitting your busy schedule seamlessly.</span>
                        </div>
                        <div className="flex space-x-2 mb-4">
                            <span><FaArrowTrendUp className="h-6 w-6 mt-1 mr-2" /></span>
                            <span className="text-brand-dark font-semibold sm:text-lg text-md">Career advancement opportunities connect you with a network of professionals and employers, boosting your growth and visibility in your field.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}