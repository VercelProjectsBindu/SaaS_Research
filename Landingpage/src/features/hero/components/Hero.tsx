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
    <section className="pt-32 pb-20 px-4 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary-dark rounded-full">
            {content.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-neutral-900 dark:text-neutral-50">
            {content.title.prefix}<span className="text-primary">{content.title.highlight}</span>{content.title.suffix}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            {content.description}
          </p>
          <div className="flex flex-col sm:row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-all shadow-[0_20px_40px_-10px_rgba(13,148,136,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
              {content.cta.primary} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border-2 border-neutral-200 dark:border-neutral-800 px-10 py-5 rounded-full text-xl font-bold text-neutral-900 dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
              {content.cta.secondary}
            </button>
          </div>

          {/* Trusted By / Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
              <div className="text-base md:text-xl font-black italic tracking-tighter text-neutral-900 dark:text-neutral-50">TECHFLOW</div>
              <div className="text-base md:text-xl font-black italic tracking-tighter text-neutral-900 dark:text-neutral-50">GENSYS</div>
              <div className="text-base md:text-xl font-black italic tracking-tighter text-neutral-900 dark:text-neutral-50">BIOLAB</div>
              <div className="text-base md:text-xl font-black italic tracking-tighter text-neutral-900 dark:text-neutral-50">DATACORE</div>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 flex flex-col items-center gap-2 text-neutral-400 cursor-pointer hover:text-primary transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Discovery</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="mt-40 relative max-w-6xl mx-auto md:perspective-2000"
        >
          {/* Main 3D Container - Subtle Tilt on Desktop Only */}
          <div className="relative transform-gpu transition-all duration-700 md:hover:rotate-x-1 md:hover:-rotate-y-1 group">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-blue-400/5 to-transparent blur-[120px] -z-20 pointer-events-none" />
            
            {/* The "Stage" */}
            <div className="relative rounded-[3rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden min-h-[400px] p-8 md:p-20 md:rotate-x-[10deg] md:rotate-y-[-5deg] md:rotate-z-[2deg] md:skew-x-[-2deg] transition-all duration-700">
              
              {/* Product Mockup Visualization */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/home/bindu/.gemini/antigravity/brain/33dc6ecc-ef28-4a5f-abe4-7c7e85a46936/user_friendly_hero_mockup_v1_1774442314542_png_1774442379392.png" 
                  alt="Product Mockup"
                  className="w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-[15s] ease-out"
                />
              </div>

              {/* Grid Background Effect */}
              <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] z-10" />
              
              {/* Central Glowing Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

              <div className="relative z-10 w-full h-full flex items-center justify-around gap-12">
                {cards.map((item, i) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 50, rotateX: 0 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -15, 0],
                        rotateX: [0, 5, 0]
                      }}
                      transition={{ 
                        delay: 0.8 + (i * 0.2), 
                        duration: 5, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      whileHover={{ scale: 1.1, rotateX: 0, z: 50 }}
                      className="relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white dark:border-neutral-800 flex flex-col items-center text-center gap-6 transition-all duration-500 w-64 group/card scale-[0.85] md:scale-100"
                    >
                      {/* Floating Effect Shadow */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/5 dark:bg-white/5 blur-xl rounded-full scale-x-150" />
                      
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-700 group-hover/card:border-primary/30 transition-colors">
                        {Icon && <Icon className={`w-8 h-8 ${item.color}`} />}
                      </div>
                      
                      <div className="space-y-3 w-full">
                        <span className="font-extrabold text-neutral-900 dark:text-neutral-50 block text-lg tracking-tight uppercase">{item.label}</span>
                        <div className="flex justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <motion.div 
                              key={dot}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: (i * 0.2) + (dot * 0.1) }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Animated Corner Decorations */}
                      <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-primary/20 rounded-tr" />
                      <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-primary/20 rounded-bl" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Data Stream Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[1px]"
              />
              <motion.div 
                animate={{ x: ['-200%', '100%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
                className="absolute bottom-1/3 left-0 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-[1px]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
