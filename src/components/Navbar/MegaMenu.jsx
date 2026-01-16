import React from "react";
import { Link, useLocation } from "react-router-dom";

const MegaMenu = ({ items, isOpen, showItemLogos = false, panelImage = null, onClose }) => {
    const location = useLocation();

    return (
        <div
            className={`
        absolute top-full left-1/2 -translate-x-1/2
        w-[calc(100vw-2rem)] sm:w-[600px] md:w-[820px]
        max-w-[1200px]
        bg-white
        z-50
        shadow-lg
        transition-all duration-300 ease-out transform origin-top
        ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto mt-0"
                    : "opacity-0 scale-100 -translate-y-2 pointer-events-none mt-0"}
      `}
        >
            <div className="grid grid-cols-5 min-h-[320px]">
                {/* LEFT – Routes */}
                <div className="col-span-3 px-8 py-8 space-y-1 font-poppins">
                    <div className="mb-4 pb-2 border-b border-gray-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Programs & Modules</h4>
                    </div>
                    {items.map((item, index) => {
                        const isActive = location.pathname === item.link;
                        return (
                            <Link
                                key={index}
                                to={item.link}
                                onClick={() => onClose && onClose()}
                                className={`
                group flex items-center gap-4
                px-5 py-3
                transition-all duration-300
                border-l-2
                ${isActive
                                        ? 'bg-brand-blue/5 border-brand-blue'
                                        : 'border-transparent hover:bg-brand-blue/5 hover:border-brand-blue'}
              `}
                            >
                                {showItemLogos && (
                                    <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-sm group-hover:shadow transition-all">
                                        <img src={item.logo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className={`text-[14px] font-medium transition ${isActive ? 'text-brand-blue' : 'text-gray-900 group-hover:text-brand-blue'}`}>
                                        {item.name}
                                    </span>
                                    <span className="text-[12px] text-gray-500 leading-snug font-normal">
                                        {item.fullname}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* RIGHT – Visual Panel (Full-Bleed Image) */}
                <div className="col-span-2 overflow-hidden bg-gray-100 border-l border-gray-200">
                    <img
                        src={panelImage}
                        alt="Program visual"
                        className=" w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
