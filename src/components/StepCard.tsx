import React from 'react';

interface StepCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const StepCard: React.FC<StepCardProps> = ({ title, description, icon, delay }) => {
  return (
    <div className={`animate-on-scroll ${delay} card p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;