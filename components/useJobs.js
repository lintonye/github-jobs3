import { useState, useEffect } from "react";
import { useQuery } from "react-query";

function fetchJobs(key, query) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl =
    key === "job-by-id"
      ? `https://jobs.github.com/positions/${query}.json`
      : `https://jobs.github.com/positions.json?search=${query}`;
  const url = `${proxyUrl}${destUrl}`;

  return fetch(url).then((response) => response.json());
}

export function useJobs({ keyword, id }) {
  const { data: jobs, isLoading, error } = useQuery(
    id ? ["job-by-id", id] : ["jobs", keyword],
    fetchJobs
  );

  return { jobs, isLoading, error };
}

export function useJob(id) {
  const { jobs, isLoading, error } = useJobs({ id });
  return { job: jobs, isLoading, error };
}
