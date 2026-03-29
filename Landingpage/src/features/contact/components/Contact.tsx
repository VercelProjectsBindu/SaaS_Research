import { useEffect, useState } from 'react';
import { Mail, Twitter, Linkedin, Youtube } from 'lucide-react';
import { getContactData } from '../services/contactService';
import { ContactData } from '@/types/landing';

const Contact = () => {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    getContactData().then(setData);
  }, []);

  if (!data) return <div className="py-24 bg-gray-50 animate-pulse h-[500px]" />;

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-800 rounded-[3rem] shadow-xl overflow-hidden grid md:grid-cols-2 border border-transparent dark:border-neutral-700">
          <div className="p-12 bg-neutral-950 dark:bg-neutral-900 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">{data.title}</h2>
              <p className="text-gray-400 mb-12">
                {data.description}
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>{data.email}</span>
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
                  <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-300">{data.form.firstName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-300">{data.form.lastName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-300">{data.form.email}</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-300">{data.form.message}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <button className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-4 rounded-xl font-bold hover:opacity-90 transition-all">
                {data.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
