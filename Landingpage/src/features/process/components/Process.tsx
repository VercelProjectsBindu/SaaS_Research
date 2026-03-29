import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Microscope, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { getProcessData } from '../services/processService';
import { ProcessData } from '@/types/landing';

const iconMap: Record<string, any> = {
  Microscope,
  RefreshCw,
  ShieldCheck,
  Zap
};

const Process = () => {
  const [data, setData] = useState<ProcessData | null>(null);

  useEffect(() => {
    getProcessData().then(setData);
  }, []);

  if (!data) return <div className="py-24 bg-white animate-pulse h-[400px]" />;

  return (
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">{data.title}</h2>
          <p className="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-6 h-6 text-primary-dark dark:text-primary-light" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">{step.title}</h3>
                <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
