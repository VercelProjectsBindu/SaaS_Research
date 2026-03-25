import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Zap, 
  ShieldCheck, 
  ChevronDown, 
  Mail, 
  Twitter, 
  Linkedin, 
  Youtube,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Microscope,
  FileSearch,
  RefreshCw,
  FlaskConical,
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight">SymbyAI</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 hover:text-primary-dark transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
              Join Waitlist
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <button className="w-full bg-black text-white px-5 py-3 rounded-full text-sm font-medium">
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary-dark rounded-full">
            Accelerating Scientific Research
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
            SymbyAI automates <span className="text-primary-dark">peer review</span>, replication, and analysis.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Empowering researchers with AI-driven tools to ensure scientific integrity and speed up the path to discovery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
              Join Waitlist <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
          <div className="rounded-2xl border border-gray-100 shadow-2xl overflow-hidden bg-gray-50 aspect-video md:aspect-[21/9] flex items-center justify-center">
             <div className="grid grid-cols-3 gap-8 p-12 w-full max-w-4xl">
                {[
                  { icon: FileSearch, label: "Peer Review", color: "text-blue-500" },
                  { icon: RefreshCw, label: "Replication", color: "text-primary-dark" },
                  { icon: Zap, label: "Rapid Analysis", color: "text-yellow-500" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-4"
                  >
                    <item.icon className={`w-10 h-10 ${item.color}`} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ResearchCrisis = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Research Crisis</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Scientific progress is being throttled by a reproducibility crisis and an overwhelmed peer review system. Thousands of papers are published daily, yet many lack the rigorous verification needed for true scientific advancement.
            </p>
            <ul className="space-y-4">
              {[
                "Overwhelmed peer review networks",
                "Lack of standardized replication methods",
                "Data manipulation and integrity issues",
                "Slow analysis cycles delaying breakthroughs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative z-10">
                <div className="space-y-6">
                   <div className="h-4 w-3/4 bg-gray-100 rounded" />
                   <div className="h-4 w-full bg-gray-100 rounded" />
                   <div className="h-4 w-5/6 bg-gray-100 rounded" />
                   <div className="pt-4 flex justify-between items-center border-t border-gray-50">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="w-20 h-4 bg-gray-100 rounded mt-2" />
                      </div>
                      <div className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">REJECTED</div>
                   </div>
                </div>
             </div>
             <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Automated Peer Review",
      description: "Our AI models analyze manuscripts for logical consistency, statistical validity, and adherence to reporting standards.",
      icon: Microscope
    },
    {
      title: "Method Replication",
      description: "Automatically extract and simulate experimental methodologies to verify if results can be reproduced computationally.",
      icon: RefreshCw
    },
    {
      title: "Data Integrity Check",
      description: "Advanced detection of data manipulation, image tampering, and statistical anomalies that human reviewers might miss.",
      icon: ShieldCheck
    },
    {
      title: "Rapid Analysis",
      description: "Get comprehensive feedback and verification reports in under 15 minutes, accelerating the publication cycle.",
      icon: Zap
    }
  ];

  return (
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Reimagined</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've built a pipeline that brings industrial-scale automation to the heart of scientific verification.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-primary-dark" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClosedBeta = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Closed Beta</h2>
          <p className="text-xl text-gray-400 mb-12">
            We are currently partnering with select research institutions and publishers to refine our models. Individual beta access launches early 2026.
          </p>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6">Why join the waitlist?</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                "Early access to the analysis engine",
                "Priority support for your institution",
                "Influence the product roadmap",
                "Exclusive research integrity reports"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full bg-primary text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-light transition-all">
              Secure Your Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does SymbyAI ensure accuracy?",
      a: "Our models are trained on millions of peer-reviewed papers and verified datasets. We use a multi-agent system where different models cross-check each other's findings before generating a final report."
    },
    {
      q: "Is my data secure?",
      a: "Yes. We employ enterprise-grade encryption and do not use your proprietary research data to train our public models without explicit consent."
    },
    {
      q: "Which research fields do you support?",
      a: "Currently, we have strong performance in Life Sciences, Physics, and Computer Science. We are rapidly expanding into Social Sciences and Humanities."
    },
    {
      q: "Can SymbyAI replace human reviewers?",
      a: "SymbyAI is designed to augment human expertise, not replace it. We automate the 'grunt work' of checking data and methods, allowing human reviewers to focus on high-level conceptual novelty."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-gray-600 text-sm"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const articles = [
    {
      date: "March 15, 2026",
      title: "SymbyAI Partners with Global Research Council",
      category: "Partnership"
    },
    {
      date: "February 28, 2026",
      title: "New Benchmark: AI Outperforms Humans in Data Anomaly Detection",
      category: "Research"
    },
    {
      date: "January 10, 2026",
      title: "Announcing our $12M Seed Round to Scale Scientific Integrity",
      category: "Company"
    }
  ];

  return (
    <section id="news" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest News</h2>
            <p className="text-gray-600">Updates from the frontier of scientific AI.</p>
          </div>
          <button className="text-primary-dark font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-primary-dark uppercase tracking-wider">{article.category}</span>
                <span className="text-xs text-gray-400">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary-dark transition-colors">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid md:grid-cols-2">
          <div className="p-12 bg-black text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in touch</h2>
              <p className="text-gray-400 mb-12">
                Have questions about institutional access or partnership opportunities? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>hello@symbyai.com</span>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-12">
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div className="p-12">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span className="text-lg font-bold tracking-tight">SymbyAI</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
            <a href="#" className="hover:text-black">Cookie Policy</a>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 SymbyAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

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
