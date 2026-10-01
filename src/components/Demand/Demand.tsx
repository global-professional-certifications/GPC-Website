import React from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { RiGlobalFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";

import indianMaleProfessional from "../../assets/indian-male-professional.png";

export default function Demand() {
    return (
        <>
            <div className="mt-10 md:mt-40 w-full">
                <div className="flex justify-center">
                    <div className=" bg-[#ffebcd] grid grid-cols-1 md:grid-cols-2 md:w-[72rem] py-10 rounded-2xl shadow-xl mx-4">
                        <div className="flex flex-col px-10">
                            <h1 className="text-2xl md:text-4xl text-center md:text-left black font-bold mb-8">From Learning to Leadership!</h1>
                            <div className="flex space-x-2 mb-4 items-center">
                                <span><FaMoneyBillTrendUp className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" /></span>
                                <span className="text-black font-semibold sm:text-lg text-md">Earn competitive pay with great growth potential</span>
                            </div>
                            <div className="flex space-x-2 mb-4 items-center">
                                <span><MdOutlineSecurity className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" /></span>
                                <span className="text-black font-semibold sm:text-lg text-md">Enjoy stability in a thriving industry</span>
                            </div>
                            <div className="flex space-x-2 mb-4 items-center">
                                <span><RiGlobalFill className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-grayblack" /></span>
                                <span className="text-black font-semibold sm:text-lg text-md">Build a career with worldwide opportunities</span>
                            </div>
                            <div className="flex space-x-2 mb-4 items-center">
                                <span><BsGraphUpArrow className="h-6 w-6 md:h-8 md:w-8 mt-1 mr-2 text-black" /></span>
                                <span className="text-black font-semibold sm:text-lg text-md">Progress from entry-level to leadership roles</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center relative transform scale-130">
                            <img src={indianMaleProfessional} className="absolute bottom-1 hidden md:block right-20 w-full object-contain rounded-lg shadow-2xl shadow-gray-500/50 mask-image" alt="Sample" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

