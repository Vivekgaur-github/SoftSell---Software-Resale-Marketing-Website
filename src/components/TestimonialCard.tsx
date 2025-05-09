import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  delay: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, delay }) => {
  return (
    <div className={`animate-on-scroll ${delay} card hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
      <div className="p-6 flex-grow">
        <Quote className="w-10 h-10 text-blue-200 dark:text-blue-800 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
          "{testimonial.quote}"
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 flex items-center">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;