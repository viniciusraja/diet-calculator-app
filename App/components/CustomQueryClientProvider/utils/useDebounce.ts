import { useEffect, useState } from "react";

const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!!delay && typeof delay !== "number" && delay <= 0)
      return setDebouncedValue(value);

    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
