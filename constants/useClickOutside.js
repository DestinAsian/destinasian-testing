import { useEffect } from 'react';

export function useClickOutside(ref, callback, exceptionRefs = []) {
  useEffect(() => {
    function handleClick(event) {
      const clickedInside = ref.current && ref.current.contains(event.target);
      const clickedException = exceptionRefs.some(
        (exRef) => exRef.current && exRef.current.contains(event.target)
      );

      if (!clickedInside && !clickedException) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, exceptionRefs]);
}
