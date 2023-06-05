import React, { useEffect, useState } from "react";
interface IuseFetch {
  url: string;
  method: string;
  dataTobeSent?: any;
}
interface IReturnType {
  data: any;
  isLoading: boolean;
  error: any;
}
function useFetch({ url, method, dataTobeSent }: IuseFetch) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | any>(null);
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataTobeSent),
  };
  // useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  // }, [url, method]);

  return { data, isLoading, error, fetchData };
}

export default useFetch;
