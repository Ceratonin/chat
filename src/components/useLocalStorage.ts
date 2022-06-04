import { useEffect, useState } from "react";

const useLocalStorage = (initKey: string, initValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(initKey);
      return value !== null ? JSON.parse(value) : initValue;
    }
  });

  useEffect(() => {
    if (initKey !== null && initKey !== undefined && initKey !== "") {
      localStorage.setItem(initKey, storedValue);
    }
  }, [initKey, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
