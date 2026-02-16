import React from 'react'
import { Globe } from 'lucide-react'

const PaymentMethodDropdown = ({ currency, setCurrency }) => {

    const options = [
        { value: "INR", label: "₹ INR" },
        { value: "USD", label: "$ USD" }
    ]

    return (
        <div className="flex justify-center gap-2 md:gap-4">
            <div className="text-gray-600 font-poppins text-sm md:text-base">
                Select Payment Currency:
            </div>

            <div className="flex border border-gray-300 rounded-md overflow-hidden">
                {options.map((opt) => {
                    const isActive = currency === opt.value

                    return (
                        <button
                            key={opt.value}
                            onClick={() => setCurrency(opt.value)}
                            className={`
                                px-4 py-1 text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer
                                focus:outline-none
                                ${isActive
                                    ? 'bg-brand-blue text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            {opt.label}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default PaymentMethodDropdown