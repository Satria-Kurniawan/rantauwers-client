import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (url, config) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url,
        ...config,
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetch, setData };
}
