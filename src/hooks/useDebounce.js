import { useEffect, useState } from "react";

// Returns `value` but delayed by `delay` ms of inactivity.
// Typing fast keeps resetting the timer, so only the last value survives.
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cancel stale timer on every keystroke
  }, [value, delay]);

  return debounced;
}
