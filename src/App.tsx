/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhoItIsFor from "./components/WhoItIsFor";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import PsychologistPortfolio from "./components/PsychologistPortfolio";
import ServiceDetail from "./components/ServiceDetail";
import Events from "./components/Events";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";
import Assessment from "./components/Assessment";
import MentalHealthCheckIn from "./components/MentalHealthCheckIn";
import CheckInPromo from "./components/CheckInPromo";
import Resources from "./components/Resources";
import ResourceDetail from "./components/ResourceDetail";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CheckInPromo />
        <About />
        <Services />
        <WhoItIsFor />
        <Team />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/psychologist/:slug" element={<PsychologistPortfolio />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/assessment/:type" element={<Assessment />} />
          <Route path="/mental-health-checkin" element={<MentalHealthCheckIn />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
