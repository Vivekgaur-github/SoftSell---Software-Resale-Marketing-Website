import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.9) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="animate-on-scroll font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-gray-900 dark:text-white">
            Get the Most Value for Your <span className="text-blue-600 dark:text-blue-400">Unused Software</span>
          </h1>
          <p className="animate-on-scroll delay-100 text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10">
            SoftSell helps you sell your unused software licenses quickly and securely, with the best valuations in the industry.
          </p>
          <div className="animate-on-scroll delay-200 flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#contact" 
              className="btn btn-primary text-lg"
            >
              Sell My Licenses
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="#how-it-works" 
              className="btn btn-secondary text-lg"
            >
              How It Works
            </a>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="animate-on-scroll delay-300 relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Software dashboard" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white">
                <p className="text-lg md:text-xl font-semibold">Sell your licenses in minutes, not days</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;