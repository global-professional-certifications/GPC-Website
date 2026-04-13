import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes, FaAward, FaRocket, FaUserCircle } from "react-icons/fa";
import MegaMenu from "./MegaMenu";

import logo from "../../assets/navbar/gpc-navbar-logo.png";
import cisaLogo from "../../assets/courses/cisa-logo.webp";
import ciaLogo from "../../assets/courses/cia-logo.webp";
import iapLogo from "../../assets/courses/iap-logo.webp";
import crmaLogo from "../../assets/courses/crma-logo.webp";
import coursesPanelImage from "../../assets/navbar/navbar-courses-panel.webp";
import corporatePanelImage from "../../assets/navbar/navbar-corporate-panel.webp";

const coursesOptions = [
  { name: "CIA", fullname: "Certified Internal Auditor", logo: ciaLogo, link: "/courses/cia" },
  { name: "CISA", fullname: "Certified Information Systems Auditor", logo: cisaLogo, link: "/courses/cisa" },
  { name: "CRMA", fullname: "Certification in Risk Management Assurance", logo: crmaLogo, link: "/courses/crma" },
  { name: "IAP", fullname: "Internal Audit Practitioner", logo: iapLogo, link: "/courses/iap" },
];

const corporateOptions = [
  {
    name: "IIA Global Training Modules",
    fullname: "Specialized Corporate Training Programmes",
    link: "/corporate/gtm-trainings"
  },
  {
    name: "QAIP",
    fullname: "Quality Assurance & Improvement Program",
    link: "/corporate/qaip"
  },
];

const Navbar = ({ topOffset = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isCorporateDropdownOpen, setIsCorporateDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  // Mobile specific states
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileCorporateOpen, setMobileCorporateOpen] = useState(false);

  const coursesDropdownRef = useRef(null);
  const corporateDropdownRef = useRef(null);
  const authDropdownRef = useRef(null);
  const coursesTimeoutRef = useRef(null);
  const corporateTimeoutRef = useRef(null);
  const authTimeoutRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(event.target)) {
        setIsCoursesDropdownOpen(false);
      }
      if (corporateDropdownRef.current && !corporateDropdownRef.current.contains(event.target)) {
        setIsCorporateDropdownOpen(false);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle hover with delay for Courses
  const handleCoursesMouseEnter = () => {
    clearTimeout(coursesTimeoutRef.current);
    setIsCoursesDropdownOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => {
      setIsCoursesDropdownOpen(false);
    }, 200);
  };

  // Handle hover with delay for Corporate
  const handleCorporateMouseEnter = () => {
    clearTimeout(corporateTimeoutRef.current);
    setIsCorporateDropdownOpen(true);
  };

  const handleCorporateMouseLeave = () => {
    corporateTimeoutRef.current = setTimeout(() => {
      setIsCorporateDropdownOpen(false);
    }, 200);
  };

  // Handle hover with delay for Auth
  const handleAuthMouseEnter = () => {
    clearTimeout(authTimeoutRef.current);
    setIsAuthDropdownOpen(true);
  };

  const handleAuthMouseLeave = () => {
    authTimeoutRef.current = setTimeout(() => {
      setIsAuthDropdownOpen(false);
    }, 200);
  };

  return (
    <nav
      className={`fixed w-full z-50 top-${topOffset} bg-white backdrop-blur-md shadow-sm px-0 md:px-8 transition-all duration-300`}
    >
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="transform scale-150 md:scale-130 transition-transform duration-300">
            <img src={logo} className="w-24 h-auto object-contain" alt="GPC logo" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-poppins">
          {["Courses", "Events", "About", "Success", "Corporate", "Contact", "Blogs"].map((item, index) =>
            item === "Courses" ? (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
                ref={coursesDropdownRef}
                onMouseEnter={handleCoursesMouseEnter}
                onMouseLeave={handleCoursesMouseLeave}
              >
                {/* Courses Link - Clickable to go to /courses */}
                <NavLink
                  to="/courses"
                  onClick={() => setIsCoursesDropdownOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-1 text-[15px] font-medium ${isActive ? 'text-brand-blue' : 'text-gray-800 dark:text-white'} hover:text-brand-blue transition group`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item}
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-300 ${isCoursesDropdownOpen ? "rotate-180 text-brand-blue" : ""}`}
                      />
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </>
                  )}
                </NavLink>

                {/* MegaMenu for Courses */}
                <MegaMenu
                  items={coursesOptions}
                  isOpen={isCoursesDropdownOpen}
                  showItemLogos={true}
                  panelImage={coursesPanelImage}
                  onClose={() => setIsCoursesDropdownOpen(false)}
                />
              </div>
            ) : item === "Corporate" ? (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
                ref={corporateDropdownRef}
                onMouseEnter={handleCorporateMouseEnter}
                onMouseLeave={handleCorporateMouseLeave}
              >
                {/* Corporate Button */}
                <button
                  className="relative flex items-center gap-1 text-[15px] font-medium text-gray-800 dark:text-white hover:text-brand-blue transition group"
                >
                  {item}
                  <FaChevronDown
                    className={`text-[10px] transition-transform duration-300 ${isCorporateDropdownOpen ? "rotate-180 text-brand-blue" : ""}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* MegaMenu for Corporate */}
                <MegaMenu
                  items={corporateOptions}
                  isOpen={isCorporateDropdownOpen}
                  showItemLogos={false}
                  panelImage={corporatePanelImage}
                  onClose={() => setIsCorporateDropdownOpen(false)}
                />
              </div>
            ) : (
              <NavLink
                key={index}
                to={item.toLowerCase()}
                className={({ isActive }) =>
                  `relative text-[15px] font-medium ${isActive ? 'text-brand-blue' : 'text-gray-800 dark:text-white'} hover:text-brand-blue transition group`
                }
              >
                {({ isActive }) => (
                  <>
                    {item === "Success" ? "Success Stories" : item}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </>
                )}
              </NavLink>
            )
          )}
        </div>

        <div
          className="hidden lg:flex items-center relative font-poppins"
          ref={authDropdownRef}
          onMouseEnter={handleAuthMouseEnter}
          onMouseLeave={handleAuthMouseLeave}
        >
          <button className="flex items-center gap-2 bg-brand-blue text-white px-5 py-2 rounded-full text-[15px] font-medium hover:bg-brand-purple transition-all duration-300 group shadow-md hover:shadow-lg">
            <FaUserCircle className="text-base" />
            Account
            <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isAuthDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Auth Dropdown */}
          <div
            className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 origin-top-right ${isAuthDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
          >
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signin"
              target="_blank"
              className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Login
            </a>
            <div className="h-px bg-gray-100 mx-4"></div>
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signup?"
              target="_blank"
              className="block px-6 py-3 text-sm text-brand-blue font-medium hover:bg-gray-50 transition"
            >
              Signup
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-800 dark:text-white focus:outline-none"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 right-0 w-[85vw] md:w-[65vw] bg-white dark:bg-gray-900 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ul className="flex flex-col py-6 space-y-2 px-6">
          {["Courses", "Corporate", "Events", "About", "Success", "Contact", "Blogs"].map((item, index) => (
            <li key={index} className="w-full border-b border-gray-100 dark:border-gray-800 last:border-0">
              {item === "Courses" ? (
                <div className="w-full">
                  <button
                    onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                    className="flex items-center justify-between w-full py-3 text-lg font-medium text-brand-dark hover:text-brand-purple transition-colors"
                  >
                    Courses
                    <FaChevronDown className={`text-xs transition-transform duration-300 ${mobileCoursesOpen ? "rotate-180 text-brand-purple" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileCoursesOpen ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col space-y-2 pl-4 border-l-2 border-brand-light/20 ml-1">
                      {coursesOptions.map((course, idx) => (
                        <NavLink
                          key={idx}
                          to={course.link}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `block py-2 text-sm ${isActive ? "text-brand-purple font-medium" : "text-gray-600"} hover:text-brand-purple transition-colors`
                          }
                        >
                          {course.name} <span className="text-xs text-gray-400 font-normal ml-1">- {course.fullname}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item === "Corporate" ? (
                <div className="w-full">
                  <button
                    onClick={() => setMobileCorporateOpen(!mobileCorporateOpen)}
                    className="flex items-center justify-between w-full py-3 text-lg font-medium text-brand-dark hover:text-brand-purple transition-colors"
                  >
                    Corporate
                    <FaChevronDown className={`text-xs transition-transform duration-300 ${mobileCorporateOpen ? "rotate-180 text-brand-purple" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileCorporateOpen ? "max-h-48 opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col space-y-2 pl-4 border-l-2 border-brand-light/20 ml-1">
                      {corporateOptions.map((corp, idx) => (
                        <NavLink
                          key={idx}
                          to={corp.link}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `block py-2 text-sm ${isActive ? "text-brand-purple font-medium" : "text-gray-600"} hover:text-brand-purple transition-colors`
                          }
                        >
                          {corp.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to={item === "Success" ? "/success" : item === "Blogs" ? "/blogs" : item.toLowerCase()}
                  className={({ isActive }) =>
                    `block w-full py-3 text-lg font-medium ${isActive ? "text-brand-purple" : "text-brand-dark"
                    } hover:text-brand-purple transition-colors`
                  }
                >
                  {item === "Success" ? "Success Stories" : item}
                </NavLink>
              )}
            </li>
          ))}

          {/* Mobile Login / Signup */}
          <li className="flex flex-col space-y-3 pt-6 mt-2">
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signin"
              target="_blank"
              className="w-full text-center text-brand-blue border border-brand-blue hover:bg-brand-blue hover:text-white font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-300"
            >
              Log In
            </a>
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signup?"
              target="_blank"
              className="w-full text-center text-white bg-brand-blue hover:bg-brand-purple font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-300 shadow-md"
            >
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
