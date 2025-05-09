import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.licenseType) {
      newErrors.licenseType = 'License type is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          message: ''
        });
      }, 1500);
    }
  };

  const licenseTypes = [
    'Microsoft Office',
    'Adobe Creative Cloud',
    'AutoCAD',
    'SAP',
    'Oracle',
    'Windows Server',
    'Other'
  ];

  return (
    <section id="contact" className="section bg-white dark:bg-gray-900">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="animate-on-scroll font-bold mb-6 text-gray-900 dark:text-white">
                Ready to <span className="text-blue-600 dark:text-blue-400">Sell Your Licenses?</span>
              </h2>
              <p className="animate-on-scroll text-lg text-gray-600 dark:text-gray-300 mb-8">
                Fill out the form to get started with a free valuation, or contact our team directly for more information.
              </p>
              
              <div className="animate-on-scroll delay-100 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span> 
                    <a href="mailto:contact@softsell.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      contact@softsell.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Phone:</span> 
                    <a href="tel:+1-800-555-1234" className="text-blue-600 dark:text-blue-400 hover:underline">
                      (800) 555-1234
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Address:</span> 
                    <span>123 IT Park, Chandigarh, CA 94107</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll delay-200">
              {isSubmitted ? (
                <div className="card p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your request has been submitted successfully. Our team will get back to you within 24 hours with a valuation.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  className="card p-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="company" 
                        className="block text-sm font-medium mb-2"
                      >
                        Company<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 ${
                          errors.company ? 'border-red-500' : ''
                        }`}
                        placeholder="Your Company"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                      )}
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="licenseType" 
                        className="block text-sm font-medium mb-2"
                      >
                        License Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="licenseType"
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 ${
                          errors.licenseType ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="" disabled>Select license type</option>
                        {licenseTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.licenseType && (
                        <p className="text-red-500 text-sm mt-1">{errors.licenseType}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium mb-2"
                    >
                      Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                      placeholder="Tell us about the licenses you'd like to sell (quantity, version, etc.)"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Get Your Free Valuation
                        <Send className="ml-2 w-5 h-5" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;