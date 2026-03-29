import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getNewsData } from '../services/newsService';
import { NewsData } from '@/types/landing';

const News = () => {
  const [data, setData] = useState<NewsData | null>(null);

  useEffect(() => {
    getNewsData().then(setData);
  }, []);

  if (!data) return <div className="py-24 animate-pulse h-[400px]" />;

  return (
    <section id="news" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
            <p className="text-gray-600">{data.subtitle}</p>
          </div>
          <button className="text-primary-dark font-semibold flex items-center gap-1 hover:underline">
            {data.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.articles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-2xl mb-6 overflow-hidden">
                <img 
                  src="/src/assets/images/research_news.png" 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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

export default News;
