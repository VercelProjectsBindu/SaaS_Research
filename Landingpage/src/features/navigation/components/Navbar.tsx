import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { getNavigationData } from '../services/navigationService';
import { NavigationData } from '@/types/landing';
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<NavigationData | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getNavigationData().then(setData);
  }, []);

  if (!data) return <div className="h-16 bg-white/80 dark:bg-neutral-950/80 animate-pulse" />;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center transition-colors">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{data.brandName}</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {data.navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all">
              Join Waitlist
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-600 dark:text-neutral-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 px-4 pt-2 pb-6 space-y-1"
          >
            {data.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full mt-4 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-5 py-4 rounded-xl text-base font-bold">
              Join Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
