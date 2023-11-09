import { useEffect } from "react";

export const AnimateScroll = (refs,setInView) => {
    useEffect(() => {
        const handleScroll = () => {
          const newInView = refs.map(ref => {
            const element = ref?.current;
            if (!element) return false;
    
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
          });
    
          setInView(newInView);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [refs,setInView]);
}