import { useState, useEffect } from "react";
export function useJobs({ keyword, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl = id
    ? `https://jobs.github.com/positions/${id}.json`
    : `https://jobs.github.com/positions.json?search=${keyword}`;
  const url = `${proxyUrl}${destUrl}`;
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(url);
        const json = await res.json();
        setJobs(json);
      } catch (error) {
        setError("Failed to fetch");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [url]);
  return { jobs, isLoading, error };
}

export function useJob(id) {
  const { jobs, isLoading, error } = useJobs({ id });
  return { job: jobs, isLoading, error };
}
