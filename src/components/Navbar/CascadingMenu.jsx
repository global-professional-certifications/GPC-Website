import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

/**
 * Generic, data-driven two-level cascading dropdown.
 *
 * Renders three columns inside the standard mega-menu panel:
 *   1. Providers  (level 1 — `categories`)
 *   2. Courses    (level 2 — the hovered/active provider's `items`)
 *   3. Image      (branding panel, optional)
 *
 * Hovering a provider swaps the courses column; clicking a course navigates and
 * closes the menu. Adding providers/courses requires only updating the data
 * passed to `categories` — this component never needs to change.
 *
 * @param {object} props
 * @param {Array<{id:string,name:string,fullname?:string,items:Array}>} props.categories
 * @param {boolean} props.isOpen
 * @param {() => void} [props.onClose]
 * @param {string} [props.panelImage] - Optional branding image (third column).
 * @param {boolean} [props.showLogos=true] - Show course logos in the courses column.
 */
const CascadingMenu = ({ categories = [], isOpen, onClose, panelImage = null, showLogos = true }) => {
    const location = useLocation();
    const [activeId, setActiveId] = useState(categories[0]?.id);

    // Reset the highlighted provider to the first whenever the menu reopens, so
    // the courses column is always populated on open (never blank).
    useEffect(() => {
        if (isOpen) setActiveId(categories[0]?.id);
    }, [isOpen, categories]);

    const activeCategory = categories.find((c) => c.id === activeId) || categories[0];
    const courses = activeCategory?.items || [];

    return (
        <div
            className={`
        absolute top-full left-1/2 -translate-x-1/2
        w-[calc(100vw-2rem)] sm:w-[600px] md:w-[820px]
        max-w-[1200px]
        bg-white
        z-50
        shadow-lg
        transition-transform transition-opacity duration-300 ease-out transform origin-top will-change-transform
        ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto mt-0"
                    : "opacity-0 scale-100 -translate-y-2 pointer-events-none mt-0"}
      `}
        >
            <div className="grid grid-cols-6 min-h-[320px]">
                {/* COLUMN 1 — Providers (level 1) */}
                <div className="col-span-3 md:col-span-2 px-6 py-8 font-poppins border-r border-gray-100">
                    <div className="mb-4 pb-2 border-b border-gray-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Certification Organizations</h4>
                    </div>
                    <div className="space-y-1">
                        {categories.map((cat) => {
                            const isActive = cat.id === activeCategory?.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onMouseEnter={() => setActiveId(cat.id)}
                                    onFocus={() => setActiveId(cat.id)}
                                    className={`
                    group w-full flex items-center justify-between gap-3
                    px-4 py-3 text-left
                    transition-colors duration-300
                    border-l-2
                    ${isActive
                                            ? "bg-brand-blue/5 border-brand-blue"
                                            : "border-transparent hover:bg-brand-blue/5 hover:border-brand-blue"}
                  `}
                                >
                                    <span className="flex flex-col">
                                        <span className={`text-[14px] font-semibold transition-colors ${isActive ? "text-brand-blue" : "text-gray-900 group-hover:text-brand-blue"}`}>
                                            {cat.name}
                                        </span>
                                        {cat.fullname && (
                                            <span className="text-[12px] text-gray-500 leading-snug font-normal">
                                                {cat.fullname}
                                            </span>
                                        )}
                                    </span>
                                    <FaChevronRight className={`text-[10px] flex-shrink-0 transition-colors ${isActive ? "text-brand-blue" : "text-gray-300 group-hover:text-brand-blue"}`} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* COLUMN 2 — Courses (level 2, for the active provider) */}
                <div className="col-span-3 md:col-span-2 px-6 py-8 font-poppins">
                    <div className="mb-4 pb-2 border-b border-gray-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            {activeCategory?.name ? `${activeCategory.name} Programs` : "Programs"}
                        </h4>
                    </div>
                    <div className="space-y-1">
                        {courses.map((course, index) => {
                            const isActive = location.pathname === course.link;
                            return (
                                <Link
                                    key={course.link || index}
                                    to={course.link}
                                    onClick={() => onClose && onClose()}
                                    className={`
                    group flex items-center gap-3
                    px-3 py-3
                    transition-colors duration-300
                    border-l-2
                    ${isActive
                                            ? "bg-brand-blue/5 border-brand-blue"
                                            : "border-transparent hover:bg-brand-blue/5 hover:border-brand-blue"}
                  `}
                                >
                                    {showLogos && course.logo && (
                                        <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-sm group-hover:shadow transition-shadow">
                                            <img src={course.logo} alt="" className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className={`text-[14px] font-medium transition-colors ${isActive ? "text-brand-blue" : "text-gray-900 group-hover:text-brand-blue"}`}>
                                            {course.name}
                                        </span>
                                        {course.fullname && (
                                            <span className="text-[12px] text-gray-500 leading-snug font-normal">
                                                {course.fullname}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* COLUMN 3 — Visual Panel (Full-Bleed Image) */}
                {panelImage && (
                    <div className="hidden md:block col-span-2 overflow-hidden bg-gray-100 border-l border-gray-200">
                        <img
                            src={panelImage}
                            alt="Program visual"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            width="327"
                            height="327"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CascadingMenu;
