import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Link, NavLink } from '../routing';
import { FaChevronDown, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import MegaMenu from "./MegaMenu";
import CascadingMenu from "./CascadingMenu";
import { coursesMenu } from "./menuData";

import logo from "../../assets/navbar/gpc-navbar-logo.webp";
import grcOpeningsLogo from "../../assets/grc-openings-logo.webp";
import coursesPanelImage from "../../assets/navbar/navbar-courses-panel.webp";
import corporatePanelImage from "../../assets/navbar/navbar-corporate-panel.webp";
import type { CmsData, ComponentProps } from '../../types/cms';

const exploreOptions = [
  {
    name: "About",
    fullname: "Who we are and what drives us",
    link: "/about"
  },
  {
    name: "Events",
    fullname: "Webinars, workshops and live sessions",
    link: "/events"
  },
  {
    name: "Success Stories",
    fullname: "Hear from our certified professionals",
    link: "/success"
  },
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

const resourcesOptions = [
  {
    name: "Blogs",
    fullname: "Insights on audit, risk and certifications",
    link: "/blogs"
  },
];

const GRC_OPENINGS_URL = "https://grcopenings.com/";

// Flat dropdowns (rendered with MegaMenu). Courses uses the cascading menu instead.
const dropdownMenus = {
  explore: { items: exploreOptions, heading: "Explore GPC", panelImage: coursesPanelImage },
  corporate: { items: corporateOptions, heading: "Programs & Modules", panelImage: corporatePanelImage },
  resources: { items: resourcesOptions, heading: "Resources", panelImage: corporatePanelImage },
};

// Top-level order, shared by desktop and mobile.
// `to` = the label itself is a link; `menu` = it opens a dropdown.
const navItems = [
  { label: "Courses", to: "/courses", menu: "courses" },
  { label: "Upcoming", to: "/upcoming" },
  { label: "Explore", menu: "explore" },
  { label: "Corporate", menu: "corporate" },
  { label: "Contact", to: "/contact" },
  { label: "Resources", menu: "resources" },
];

const underline = (active: boolean) =>
  `absolute -bottom-1 left-0 w-full h-0.5 bg-brand-blue transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`;

const Navbar = ({ topOffset = 48 }: ComponentProps) => {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  // Mobile specific states
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  const [mobileOpenProvider, setMobileOpenProvider] = useState<CmsData>(null);

  const desktopMenuRef = useRef<CmsData>(null);
  const authDropdownRef = useRef<CmsData>(null);
  const menuTimeoutRef = useRef<CmsData>(null);
  const authTimeoutRef = useRef<CmsData>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock background page scroll while the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Hover with a short close delay so the cursor can travel into the panel
  const handleMenuMouseEnter = (menu: string) => {
    clearTimeout(menuTimeoutRef.current);
    setOpenMenu(menu);
  };

  const handleMenuMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const handleAuthMouseEnter = () => {
    clearTimeout(authTimeoutRef.current);
    setIsAuthDropdownOpen(true);
  };

  const handleAuthMouseLeave = () => {
    authTimeoutRef.current = setTimeout(() => {
      setIsAuthDropdownOpen(false);
    }, 200);
  };

  // A dropdown trigger is highlighted when the current page is one of its children
  const isMenuActive = (menu: string) =>
    dropdownMenus[menu]?.items.some(
      (item) => !item.external && (pathname === item.link || pathname.startsWith(`${item.link}/`))
    );

  const closeMobile = () => setIsOpen(false);

  return (
    <nav
      className="fixed w-full z-50 bg-white backdrop-blur-md shadow-sm px-0 md:px-6 transition-transform duration-300"
      style={{ top: `${topOffset}px` }}
    >
      <div className="relative max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto py-2 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="transform scale-150 md:scale-130 origin-left transition-transform duration-300">
            <img src={logo} className="w-24 h-auto object-contain" alt="GPC logo" width="96" height="46" />
          </div>
        </Link>

        {/* Desktop Menu */}
        {/* mr-auto pins the links beside the logo; ml-16 clears the logo's scale() overflow */}
        <div ref={desktopMenuRef} className="hidden lg:flex items-center space-x-5 ml-16 mr-auto font-poppins">
          {navItems.map((item) => {
            const chevron = item.menu && (
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${openMenu === item.menu ? "rotate-180 text-brand-blue" : ""}`}
              />
            );

            // Plain link, no dropdown
            if (!item.menu) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium whitespace-nowrap ${isActive ? 'text-brand-blue' : 'text-gray-800'} hover:text-brand-blue transition group`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={underline(isActive)}></span>
                    </>
                  )}
                </NavLink>
              );
            }

            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center"
                onMouseEnter={() => handleMenuMouseEnter(item.menu)}
                onMouseLeave={handleMenuMouseLeave}
              >
                {item.to ? (
                  // Courses: the label navigates, hovering opens the menu
                  <NavLink
                    to={item.to}
                    onClick={() => setOpenMenu(null)}
                    className={({ isActive }) =>
                      `relative flex items-center gap-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-brand-blue' : 'text-gray-800'} hover:text-brand-blue transition group`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {chevron}
                        <span className={underline(isActive)}></span>
                      </>
                    )}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu)}
                    aria-expanded={openMenu === item.menu}
                    className={`relative flex items-center gap-1 text-sm font-medium whitespace-nowrap ${isMenuActive(item.menu) ? 'text-brand-blue' : 'text-gray-800'} hover:text-brand-blue transition group`}
                  >
                    {item.label}
                    {chevron}
                    <span className={underline(isMenuActive(item.menu))}></span>
                  </button>
                )}

                {openMenu === item.menu && (
                  item.menu === "courses" ? (
                    <CascadingMenu
                      categories={coursesMenu}
                      isOpen
                      showLogos={true}
                      panelImage={coursesPanelImage}
                      onClose={() => setOpenMenu(null)}
                    />
                  ) : (
                    <MegaMenu
                      items={dropdownMenus[item.menu].items}
                      heading={dropdownMenus[item.menu].heading}
                      isOpen
                      showItemLogos={false}
                      panelImage={dropdownMenus[item.menu].panelImage}
                      onClose={() => setOpenMenu(null)}
                    />
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* GRC Openings — sister product, opens in a new tab */}
        <a
          href={GRC_OPENINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GRC Openings (opens in a new tab)"
          className="hidden lg:block mr-6 motion-safe:animate-float hover:[animation-play-state:paused]"
        >
          <img src={grcOpeningsLogo} alt="GRC Openings" className="h-9 w-auto object-contain" width="83" height="36" />
        </a>

        {/* Divider between GRC Openings and Account */}
        <span aria-hidden="true" className="hidden lg:block h-7 w-px bg-gray-300 mr-6" />

        <div
          className="hidden lg:flex items-center relative font-poppins"
          ref={authDropdownRef}
          onMouseEnter={handleAuthMouseEnter}
          onMouseLeave={handleAuthMouseLeave}
        >
          <button className={`flex items-center gap-2 py-2 text-sm font-medium transition-colors ${isAuthDropdownOpen ? "text-brand-blue" : "text-gray-800"} hover:text-brand-blue`}>
            <FaUserCircle className="text-lg" />
            Account
          </button>

          {/* Auth Dropdown */}
          <div
            className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 origin-top-right will-change-transform ${isAuthDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
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
          className="lg:hidden text-gray-800 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 right-0 w-[85vw] md:w-[65vw] bg-white shadow-xl overflow-y-auto overscroll-contain max-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ul className="flex flex-col py-6 space-y-2 px-6">
          {navItems.map((item) => {
            const groupOpen = mobileOpenMenu === item.menu;

            if (!item.menu) {
              return (
                <li key={item.label} className="w-full border-b border-gray-100 last:border-0">
                  <NavLink
                    onClick={closeMobile}
                    to={item.to}
                    className={({ isActive }) =>
                      `block w-full py-3 text-lg font-medium ${isActive ? "text-brand-purple" : "text-brand-dark"
                      } hover:text-brand-purple transition-colors`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            }

            return (
              <li key={item.label} className="w-full border-b border-gray-100 last:border-0">
                <div className="w-full">
                  <button
                    onClick={() => setMobileOpenMenu(groupOpen ? null : item.menu)}
                    className="flex items-center justify-between w-full py-3 text-lg font-medium text-brand-dark hover:text-brand-purple transition-colors"
                  >
                    {item.label}
                    <FaChevronDown className={`text-xs transition-transform duration-300 ${groupOpen ? "rotate-180 text-brand-purple" : ""}`} />
                  </button>

                  {item.menu === "courses" ? (
                    <div className={`overflow-hidden transition-all duration-300 ${groupOpen ? "max-h-[600px] opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
                      <div className="flex flex-col space-y-1 pl-4 border-l-2 border-brand-light/20 ml-1">
                        {coursesMenu.map((provider) => {
                          const providerOpen = mobileOpenProvider === provider.id;
                          return (
                            <div key={provider.id}>
                              {/* Provider (level 1) */}
                              <button
                                onClick={() => setMobileOpenProvider(providerOpen ? null : provider.id)}
                                className="flex items-center justify-between w-full gap-2 py-2 text-sm font-semibold text-brand-dark hover:text-brand-purple transition-colors"
                              >
                                <span className="min-w-0 flex-1 truncate text-left">
                                  {provider.name}
                                  <span className="text-xs text-gray-400 font-normal ml-1">- {provider.fullname}</span>
                                </span>
                                <FaChevronDown className={`flex-shrink-0 text-[10px] transition-transform duration-300 ${providerOpen ? "rotate-180 text-brand-purple" : ""}`} />
                              </button>
                              {/* Courses (level 2) */}
                              <div className={`overflow-hidden transition-all duration-300 ${providerOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="flex flex-col space-y-1 pl-4 border-l-2 border-brand-light/20 ml-1">
                                  {provider.items.map((course, idx) => (
                                    <NavLink
                                      key={course.link || idx}
                                      to={course.link}
                                      onClick={closeMobile}
                                      className={({ isActive }) =>
                                        `flex min-w-0 items-center py-2 text-sm ${isActive ? "text-brand-purple font-medium" : "text-gray-600"} hover:text-brand-purple transition-colors`
                                      }
                                    >
                                      <span className="min-w-0 truncate">
                                        {course.name} <span className="text-xs text-gray-400 font-normal ml-1">- {course.fullname}</span>
                                      </span>
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={`overflow-hidden transition-all duration-300 ${groupOpen ? "max-h-64 opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
                      <div className="flex flex-col space-y-2 pl-4 border-l-2 border-brand-light/20 ml-1">
                        {dropdownMenus[item.menu].items.map((sub) =>
                          sub.external ? (
                            <a
                              key={sub.link}
                              href={sub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMobile}
                              className="block py-2 text-sm text-gray-600 hover:text-brand-purple transition-colors"
                            >
                              {sub.name}
                            </a>
                          ) : (
                            <NavLink
                              key={sub.link}
                              to={sub.link}
                              onClick={closeMobile}
                              className={({ isActive }) =>
                                `block py-2 text-sm ${isActive ? "text-brand-purple font-medium" : "text-gray-600"} hover:text-brand-purple transition-colors`
                              }
                            >
                              {sub.name}
                            </NavLink>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}

          {/* Mobile GRC Openings */}
          <li className="pt-4">
            <a
              href={GRC_OPENINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              aria-label="GRC Openings (opens in a new tab)"
              className="inline-block motion-safe:animate-float"
            >
              <img src={grcOpeningsLogo} alt="GRC Openings" className="h-10 w-auto object-contain" width="92" height="40" />
            </a>
          </li>

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
