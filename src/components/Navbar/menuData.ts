import cisaLogo from "../../assets/courses/cisa-logo.webp";
import ciaLogo from "../../assets/courses/cia-logo.webp";
import iapLogo from "../../assets/courses/iap-logo.webp";
import crmaLogo from "../../assets/courses/crma-logo.webp";

/**
 * Data-driven configuration for the cascading Courses menu.
 *
 * Structure: a list of provider categories (level 1), each with its own list of
 * course items (level 2). To add a future provider (PMI, ISC2, AWS, …) or a new
 * course, append to this array — no component changes required.
 *
 * Optional per-item fields supported by the renderer: `logo`, `fullname`,
 * `description`. Items without a `logo` simply render without one.
 */
export const coursesMenu = [
  {
    id: "iia",
    name: "IIA",
    fullname: "Institute of Internal Auditors",
    items: [
      {
        name: "CIA",
        fullname: "Certified Internal Auditor",
        logo: ciaLogo,
        link: "/courses/cia",
      },
      {
        name: "CRMA",
        fullname: "Certification in Risk Management Assurance",
        logo: crmaLogo,
        link: "/courses/crma",
      },
      {
        name: "IAP",
        fullname: "Internal Audit Practitioner",
        logo: iapLogo,
        link: "/courses/iap",
      },
    ],
  },
  {
    id: "isaca",
    name: "ISACA",
    fullname: "Information Systems Audit and Control Association",
    items: [
      {
        name: "CISA",
        fullname: "Certified Information Systems Auditor",
        logo: cisaLogo,
        link: "/courses/cisa",
      },
    ],
  },
];
