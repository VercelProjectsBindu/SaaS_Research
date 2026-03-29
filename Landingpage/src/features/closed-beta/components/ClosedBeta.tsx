import { useEffect, useState } from 'react';
import { getBetaData } from '../services/betaService';
import { BetaData } from '@/types/landing';
import { CheckCircle2 } from 'lucide-react';

const ClosedBeta = () => {
  const [data, setData] = useState<BetaData | null>(null);

  useEffect(() => {
    getBetaData().then(setData);
  }, []);

  if (!data) return <div className="py-24 bg-black animate-pulse h-[400px]" />;

  return (
    <section className="py-12 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{data.title}</h2>
          <p className="text-xl text-gray-400 mb-12">
            {data.description}
          </p>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6">{data.waitlistPrompt}</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {data.benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full bg-primary text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-light transition-all">
              {data.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosedBeta;
