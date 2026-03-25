import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileSearch, RefreshCw, Zap } from 'lucide-react';
import { getHeroData, HeroFullData } from '../services/heroService';

const iconMap: Record<string, any> = {
  FileSearch,
  RefreshCw,
  Zap
};

const Hero = () => {
  const [data, setData] = useState<HeroFullData | null>(null);

  useEffect(() => {
    getHeroData().then(setData);
  }, []);

  if (!data) return <div className="py-32 h-[80vh] flex items-center justify-center animate-pulse bg-gray-50" />;

  const { content, cards } = data;

  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary-dark rounded-full">
            {content.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
            {content.title.prefix}<span className="text-primary-dark">{content.title.highlight}</span>{content.title.suffix}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
              {content.cta.primary} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all">
              {content.cta.secondary}
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
                {cards.map((item, i) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <motion.div 
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-4"
                    >
                      {Icon && <Icon className={`w-10 h-10 ${item.color}`} />}
                      <span className="font-semibold text-sm">{item.label}</span>
                    </motion.div>
                  );
                })}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
