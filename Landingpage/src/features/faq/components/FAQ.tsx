import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { getFaqData } from '../services/faqService';
import { FaqData } from '@/types/landing';

const FAQ = () => {
  const [data, setData] = useState<FaqData | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    getFaqData().then(setData);
  }, []);

  if (!data) return <div className="py-24 bg-gray-50 animate-pulse h-[400px]" />;

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-neutral-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-neutral-50">{data.title}</h2>
        <div className="space-y-4">
          {data.faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-neutral-900 dark:text-neutral-50"
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
                    className="px-6 pb-5 text-gray-600 dark:text-neutral-400 text-sm"
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

export default FAQ;
