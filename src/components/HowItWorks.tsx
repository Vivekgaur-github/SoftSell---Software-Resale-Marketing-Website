import React, { useEffect } from 'react';
import { Upload, BarChart2, CreditCard } from 'lucide-react';
import StepCard from './StepCard';

const HowItWorks: React.FC = () => {
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

  const steps = [
    {
      id: 1,
      title: 'Upload License',
      description: 'Simply upload your software license details through our secure portal.',
      icon: <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'Get Valuation',
      description: 'Our experts analyze your license and provide you with the best possible valuation.',
      icon: <BarChart2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-200'
    },
    {
      id: 3,
      title: 'Get Paid',
      description: 'Accept our offer and receive payment within 48 hours via your preferred method.',
      icon: <CreditCard className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      delay: 'delay-300'
    }
  ];

  return (
    <section id="how-it-works" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll font-bold mb-6 text-gray-900 dark:text-white">
            How It <span className="text-blue-600 dark:text-blue-400">Works</span>
          </h2>
          <p className="animate-on-scroll text-lg text-gray-600 dark:text-gray-300">
            Our streamlined process makes selling your unused software licenses quick, easy and profitable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <StepCard 
              key={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={step.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;