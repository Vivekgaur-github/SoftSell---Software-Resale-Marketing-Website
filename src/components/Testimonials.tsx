import React, { useEffect, useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechNova Inc.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'SoftSell made it incredibly easy to recover value from our unused Adobe licenses. The process was smooth, and the valuation was better than we expected. Highly recommended for any company looking to optimize their software costs.',
    },
    {
      id: 2,
      name: 'David Rodriguez',
      role: 'IT Director',
      company: 'Global Systems',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'As we transitioned to a new ERP system, we had several unused enterprise licenses. SoftSell helped us recoup nearly 65% of our original investment. Their team was professional and the payment was processed quickly.',
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Operations Manager',
      company: 'Bright Solutions',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'We were skeptical about the process at first, but SoftSell exceeded our expectations. They offered fair prices for our Microsoft licenses and handled everything securely. I wouldn\'t hesitate to use their service again.',
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section bg-blue-50 dark:bg-gray-800/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll font-bold mb-6 text-gray-900 dark:text-white">
            What Our <span className="text-blue-600 dark:text-blue-400">Customers Say</span>
          </h2>
          <p className="animate-on-scroll text-lg text-gray-600 dark:text-gray-300">
            Don't just take our word for it. Hear from companies who have successfully sold their software licenses through SoftSell.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Mobile view (carousel) */}
          <div className="md:hidden">
            <TestimonialCard 
              testimonial={testimonials[activeIndex]}
              delay="delay-100"
            />
            
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex justify-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full mx-1 ${
                    index === activeIndex 
                      ? 'bg-blue-600 dark:bg-blue-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop view (grid) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id}
                testimonial={testimonial}
                delay={`delay-${index * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;