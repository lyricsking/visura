import { useState, useEffect } from 'react';

const useScript = (src) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => setIsScriptLoaded(false);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return isScriptLoaded;
};

export default useScript;
