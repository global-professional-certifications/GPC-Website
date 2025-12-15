
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
import FaqPage from './components/FaqPage/FaqPage.jsx';
import Glossary from './components/Glossary/Glossary.jsx';
import BlogList from './components/Blogs/BlogList.jsx';
import BlogPage from './components/Blogs/BlogPage.jsx';
import StudioPage from './components/Studio/StudioPage.jsx';
import Journey from './components/Journey/Journey.jsx';
import { Analytics } from "@vercel/analytics/react"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/studio/*" element={<StudioPage />} />
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
        <Route path="our-journey" element={<Journey />} />
        <Route path="courses" element={<CoursesOverview />} />
        <Route path="courses/cia" element={<Cia />} />
        <Route path="courses/crma" element={<Crma />} />
        <Route path="courses/cisa" element={<Cisa />} />
        <Route path="courses/iap" element={<Iap />} />
        <Route path="events" element={<Events />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/:slug" element={<BlogPage />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <HelmetProvider>
      <>
        <RouterProvider router={router} />
        <Analytics />
      </>
    </HelmetProvider>
  </ThemeProvider>
)
