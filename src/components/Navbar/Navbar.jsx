import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo-2.png";
import cisaLogo from "../../assets/cisa-logo-1.png";
import ciaLogo from "../../assets/cia-logo.png";
import iapLogo from "../../assets/iap-logo.png";
import crmaLogo from "../../assets/crma-logo-1.png";

const coursesOptions = [
  { name: "CIA", fullname: "Certified Internal Auditor", logo: ciaLogo },
  { name: "CISA", fullname: "Certified Information Systems Auditor", logo: cisaLogo },
  { name: "CRMA", fullname: "Certification in Risk Management Assurance", logo: crmaLogo },
  { name: "IAP", fullname: "Internal Audit Practitioner", logo: iapLogo },
  // { name: "Course 5", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 6", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 7", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 8", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 9", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 10", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 11", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 12", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 13", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 14", fullname: "Course 5 Desc", logo: iapLogo },
  // { name: "Course 15", fullname: "Course 5 Desc", logo: iapLogo },
];

const Navbar = ({ topOffset = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCoursesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle hover with delay for desktop
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsCoursesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCoursesDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };

  return (
    <nav
      className={`fixed w-full z-50 top-${topOffset} bg-white backdrop-blur-md border-b border-gray-200 shadow-sm px-0 md:px-8 transition-all duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="transform scale-150 md:scale-225">
            <img src={logo} className="h-8" alt="GPC logo" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {["Courses", "Events", "About", "Success", "Contact", "Blogs"].map((item, index) =>
            item === "Courses" ? (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Courses Button */}
                <NavLink
                  to="/courses"
                  className="relative flex items-center gap-1 text-lg font-semibold text-gray-800 dark:text-white hover:text-brand-blue transition group"
                >
                  {item}
                  <FaChevronDown
                    className={`text-sm transition-transform duration-300 ${isCoursesDropdownOpen ? "rotate-180 text-brand-blue" : ""}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </NavLink>

                {/* Dropdown Menu */}
                <div
                  className={`absolute -left-4 top-14 w-[40vw] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 transition-all duration-300 transform origin-top
                    ${isCoursesDropdownOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                >
                  <div className="grid grid-cols-2 m-2 gap-3">
                    {coursesOptions.map((course, idx) => (
                      <NavLink
                        key={idx}
                        to={`/courses/${course.name.toLowerCase()}`}
                        className={({ isActive }) =>
                          `border border-gray-300 flex items-center gap-3 px-2 py-2 transition-all duration-300 rounded-lg ${isActive ? "bg-gray-200 text-brand-blue" : "hover:bg-gray-100 text-gray-800"}`
                        }
                        onClick={() => setIsCoursesDropdownOpen(false)}
                      >
                        <img src={course.logo} alt={course.name} className="border border-gray-300 rounded-lg w-16 h-16 object-contain p-2 bg-white" />
                        <div>
                          <span className="font-semibold text-gray-900">{course.name}</span>
                          <p className="text-xs text-gray-600">({course.fullname})</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={index}
                to={item.toLowerCase()}
                className={({ isActive }) =>
                  `relative text-lg font-medium text-gray-800 dark:text-white hover:text-brand-blue transition group`
                }
              >
                {item === "Success" ? "Success Stories" : item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            )
          )}
        </div>

        {/* Desktop Login / Signup */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://learn.globalprofessionalcertifications.com/learn/account/signin"
            target="_blank"
            className="text-white bg-brand-blue hover:bg-brand-purple font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
          >
            Log In
          </a>
          <a
            href="https://learn.globalprofessionalcertifications.com/learn/account/signup?"
            target="_blank"
            className="text-white bg-brand-gray hover:bg-brand-dark font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
          >
            Sign Up
          </a>
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
        className={`lg:hidden fixed top-16 right-0 w-[65vw] bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-3">
          {["Courses", "Events", "About", "Success", "Contact", "Blogs"].map((item, index) => (
            <li key={index} className="w-full text-center">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={item === "Courses" ? "/courses" : item.toLowerCase()}
                className={({ isActive }) =>
                  `block w-full py-2 text-lg font-medium ${isActive ? "text-brand-purple" : "text-brand-dark"
                  } hover:text-brand-purple`
                }
              >
                {item === "Success" ? "Success Stories" : item}
              </NavLink>
            </li>
          ))}

          {/* Mobile Login / Signup */}
          <li className="flex flex-col items-center space-y-2 mt-3 px-6 w-full">
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signin"
              target="_blank"
              className="w-full text-center text-white bg-brand-blue hover:bg-brand-purple font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
            >
              Log In
            </a>
            <a
              href="https://learn.globalprofessionalcertifications.com/learn/account/signup?"
              target="_blank"
              className="w-full text-center text-white bg-brand-gray hover:bg-brand-dark font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
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
