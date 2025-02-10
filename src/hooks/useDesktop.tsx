import { useState,useEffect } from "react";

const useDesktop = ()=>{
    const [isDesktop, setIsDesktop] = useState<boolean | null>(true);
  
    useEffect(() => {
      if (window.innerWidth > 768) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
  
      const listener = () => {
        if (window.innerWidth > 768) {
          setIsDesktop(true);
        } else {
          setIsDesktop(false);
        }
      };
      window.addEventListener("resize", listener);
  
      return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);

    return [isDesktop]
}

export default useDesktop;