export const setupScrollAnimation = () => {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // If element is in viewport
      if (position.top < window.innerHeight * 0.9) {
        element.classList.add('animated');
      }
    });
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger on initial load
  setTimeout(handleScroll, 100);
  
  // Cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
};