import { useEffect, useState } from 'react';
import { getCrisisData } from '../services/crisisService';
import { CrisisData } from '@/types/landing';
import { AlertCircle } from 'lucide-react';

const ResearchCrisis = () => {
  const [data, setData] = useState<CrisisData | null>(null);

  useEffect(() => {
    getCrisisData().then(setData);
  }, []);

  if (!data) return <div className="py-24 bg-gray-50 animate-pulse h-[400px]" />;

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.title}</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {data.description}
            </p>
            <ul className="space-y-4">
              {data.issues.map((item, i) => (
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
                      <div className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">{data.statusBadge}</div>
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

export default ResearchCrisis;
