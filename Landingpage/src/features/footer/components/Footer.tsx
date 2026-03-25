import { useEffect, useState } from 'react';
import { getFooterData } from '../services/footerService';
import { FooterData } from '@/types/landing';

const Footer = () => {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    getFooterData().then(setData);
  }, []);

  if (!data) return <div className="py-12 border-t border-gray-100 animate-pulse h-[100px]" />;

  return (
    <footer className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span className="text-lg font-bold tracking-tight">{data.brand}</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            {data.links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-black">{link.name}</a>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
