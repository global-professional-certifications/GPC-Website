import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout.jsx';
import { Analytics } from "@vercel/analytics/react"

// Lazy load components
const Home = lazy(() => import('./components/Home/Home.jsx'));
const AboutUs = lazy(() => import('./components/About/AboutUs.jsx'));
const Terms = lazy(() => import('./components/Terms/Terms.jsx'));
const PrivacyPolicy = lazy(() => import('./components/Privacy/PrivacyPolicy.jsx'));
const ContactUs = lazy(() => import('./components/Contact/ContactUs.jsx'));
const RefundPolicy = lazy(() => import('./components/Refund/RefundPolicy.jsx'));
const SuccessStories = lazy(() => import('./components/SuccessStories/SuccessStories.jsx'));
const Events = lazy(() => import("./components/Events/Events.jsx"));
const Cia = lazy(() => import('./components/Courses/Cia.jsx'));
const CoursesOverview = lazy(() => import('./components/CoursesOverview/CoursesOverview.jsx'));
const Crma = lazy(() => import('./components/Courses/Crma.jsx'));
const Cisa = lazy(() => import('./components/Courses/Cisa.jsx'));
const Iap = lazy(() => import('./components/Courses/Iap.jsx'));
const FaqPage = lazy(() => import('./components/FaqPage/FaqPage.jsx'));
const Glossary = lazy(() => import('./components/Glossary/Glossary.jsx'));
const BlogList = lazy(() => import('./components/Blogs/BlogList.jsx'));
const BlogPage = lazy(() => import('./components/Blogs/BlogPage.jsx'));
const StudioPage = lazy(() => import('./components/Studio/StudioPage.jsx'));
const Journey = lazy(() => import('./components/Journey/Journey.jsx'));
const Qaip = lazy(() => import('./components/Corporate/Qaip.jsx'));
const GtmTrainings = lazy(() => import('./components/Corporate/GtmTrainings.jsx'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-transparent">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/studio/*" element={<Suspense fallback={<PageLoader />}><StudioPage /></Suspense>} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutUs /></Suspense>} />
        <Route path="terms" element={<Suspense fallback={<PageLoader />}><Terms /></Suspense>} />
        <Route path="privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactUs /></Suspense>} />
        <Route path="refund" element={<Suspense fallback={<PageLoader />}><RefundPolicy /></Suspense>} />
        <Route path="faq" element={<Suspense fallback={<PageLoader />}><FaqPage /></Suspense>} />
        <Route path="glossary" element={<Suspense fallback={<PageLoader />}><Glossary /></Suspense>} />
        <Route path="success" element={<Suspense fallback={<PageLoader />}><SuccessStories /></Suspense>} />
        <Route path="our-journey" element={<Suspense fallback={<PageLoader />}><Journey /></Suspense>} />
        <Route path="courses" element={<Suspense fallback={<PageLoader />}><CoursesOverview /></Suspense>} />
        <Route path="courses/cia" element={<Suspense fallback={<PageLoader />}><Cia /></Suspense>} />
        <Route path="courses/crma" element={<Suspense fallback={<PageLoader />}><Crma /></Suspense>} />
        <Route path="courses/cisa" element={<Suspense fallback={<PageLoader />}><Cisa /></Suspense>} />
        <Route path="courses/iap" element={<Suspense fallback={<PageLoader />}><Iap /></Suspense>} />
        <Route path="events" element={<Suspense fallback={<PageLoader />}><Events /></Suspense>} />
        <Route path="corporate/qaip" element={<Suspense fallback={<PageLoader />}><Qaip /></Suspense>} />
        <Route path="corporate/gtm-trainings" element={<Suspense fallback={<PageLoader />}><GtmTrainings /></Suspense>} />
        <Route path="blogs" element={<Suspense fallback={<PageLoader />}><BlogList /></Suspense>} />
        <Route path="blogs/:slug" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
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
