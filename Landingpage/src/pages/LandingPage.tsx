import Navbar from '@/features/navigation/components/Navbar';
import Hero from '@/features/hero/components/Hero';
import ResearchCrisis from '@/features/research-crisis/components/ResearchCrisis';
import Process from '@/features/process/components/Process';
import ClosedBeta from '@/features/closed-beta/components/ClosedBeta';
import FAQ from '@/features/faq/components/FAQ';
import News from '@/features/news/components/News';
import Contact from '@/features/contact/components/Contact';
import Footer from '@/features/footer/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navbar />
      <Hero />
      <ResearchCrisis />
      <Process />
      <ClosedBeta />
      <FAQ />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
