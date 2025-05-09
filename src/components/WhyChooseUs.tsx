import React, { useEffect } from 'react';
import { Shield, DollarSign, Clock, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

const WhyChooseUs: React.FC = () => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      id: 1,
      title: 'Secure Transactions',
      description: 'Our secure platform ensures your license information and payment details are always protected.',
      icon: <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'Best Value Guarantee',
      description: 'We promise to offer you the best possible value for your software licenses on the market.',
      icon: <DollarSign className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-200'
    },
    {
      id: 3,
      title: 'Quick Process',
      description: 'Get valuations within 24 hours and payment within 48 hours after accepting our offer.',
      icon: <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-300'
    },
    {
      id: 4,
      title: 'Expert Team',
      description: 'Our team of industry experts ensures accurate license verification and fair valuations.',
      icon: <Award className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-400'
    }
  ];

  return (
    <section id="why-choose-us" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="animate-on-scroll font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose <span className="text-blue-600 dark:text-blue-400">SoftSell</span>
            </h2>
            <p className="animate-on-scroll text-lg text-gray-600 dark:text-gray-300 mb-8">
              With thousands of satisfied customers, SoftSell is the trusted marketplace for software license resale. Here's why companies choose us:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={feature.delay}
                />
              ))}
            </div>
          </div>
          
          <div className="animate-on-scroll delay-300 relative">
            <img 
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Business team" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">$10M+</p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Paid to customers</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-5 -left-5 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;