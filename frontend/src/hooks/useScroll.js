import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";

const useScroll = (callback, delay = 20) => {
  const callbackRef = useRef(callback);
  const handlerRef = useRef();

  // Update the callback ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Create a throttled function that calls the latest callback
    handlerRef.current = throttle(() => {
      callbackRef.current();
    }, delay);

    // Attach the throttled scroll handler with passive option
    window.addEventListener("scroll", handlerRef.current, { passive: true });
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handlerRef.current);
      handlerRef.current.cancel();
    };
  }, [delay]);
};

export default useScroll; 