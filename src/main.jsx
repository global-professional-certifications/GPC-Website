
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './components/Home/Home.jsx';
import Layout from './Layout.jsx';
import AboutUs from './components/About/AboutUs.jsx';
import Terms from './components/Terms/Terms.jsx';
import PrivacyPolicy from './components/Privacy/PrivacyPolicy.jsx';
import ContactUs from './components/Contact/ContactUs.jsx';
import RefundPolicy from './components/Refund/RefundPolicy.jsx';
import SuccessStories from './components/SuccessStories/SuccessStories.jsx';
import Events from "./components/Events/Events.jsx";
import Cia from './components/Courses/Cia.jsx';
import CoursesOverview from './components/CoursesOverview/CoursesOverview.jsx';
import Crma from './components/Courses/Crma.jsx';
import Cisa from './components/Courses/Cisa.jsx';
import Iap from './components/Courses/Iap.jsx';
/*import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import AddVideo from './components/AdminPanel/AddVideo.jsx';
import AddBlog from './components/AdminPanel/AddBlog.jsx';
import AdminLogin from './components/AdminPanel/AdminLogin.jsx';*/
import FaqPage from './components/FaqPage/FaqPage.jsx';
import Glossary from './components/Glossary/Glossary.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="refund" element={<RefundPolicy />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="success" element={<SuccessStories />} />
        <Route path="courses" element={<CoursesOverview />} />
        <Route path="courses/cia" element={<Cia />} />
        <Route path="courses/crma" element={<Crma />} />
        <Route path="courses/cisa" element={<Cisa />} />
        <Route path="courses/iap" element={<Iap />} />

        <Route path="events" element={<Events />} />
      </Route>
      {/*<Route path="admin" element={true ? <AdminPanel /> : <AdminLogin />} >
        <Route index element={<AddVideo />} />
        <Route path="addBlog" element={<AddBlog />} />
      </Route>*/}
    </>
  )
)

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Global Professional Certifications",
  "url": "https://globalprofessionalcertifications.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://globalprofessionalcertifications.com/search?query={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Global Professional Certifications",
  "url": "https://globalprofessionalcertifications.com",
  "logo": "https://globalprofessionalcertifications.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/global-professional-certifications/",
    "https://www.instagram.com/global__professionals",
    "https://www.youtube.com/watch?v=2FWaO_Cf0eg"
  ]
};

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <HelmetProvider>
      <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </Helmet>
        <RouterProvider router={router} />
      </>
    </HelmetProvider>
  </ThemeProvider>
)
