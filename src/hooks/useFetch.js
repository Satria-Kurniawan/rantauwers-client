import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

export default function useFetch(url, method, body) {
  const [session, setSession] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSessionData() {
      const session = await getSession();
      setSession(session);
    }

    getSessionData();
  }, []);

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      axios({
        url,
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
        data: body,
      })
        .then((response) => setData(response.data))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }
  }, [session, url, method, body]);

  return { data, isLoading, error };
}
