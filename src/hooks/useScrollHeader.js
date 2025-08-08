import { useState, useEffect, useRef } from 'react';

const useScrollHeader = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Check if scrolling up
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
        // Add delay before showing header when scrolling up
        scrollTimeoutRef.current = setTimeout(() => {
          if (isScrollingUp) {
            setIsHeaderVisible(true);
          }
        }, 300); // 300ms delay - you can adjust this value
      } 
      // Check if scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
        // Hide header immediately when scrolling down
        if (currentScrollY > 100) {
          setIsHeaderVisible(false);
        }
      }
      
      // Always show header at the top
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY, isScrollingUp]);

  return isHeaderVisible;
};

export default useScrollHeader; 