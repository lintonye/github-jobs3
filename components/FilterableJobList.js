import React from "react";
import { useState, useEffect } from "react";
import { JobList } from "./JobList";
import { SearchForm } from "./SearchForm";

function Header({ children }) {
  return (
    <div className="header">
      <h2>
        <strong>Github</strong> Jobs
      </h2>
      <div className="hero">{children}</div>
    </div>
  );
}

function Filters() {
  const locations = ["London", "Amsterdam", "New York", "Berlin"];
  return (
    <div className="filters">
      <label>
        <input type="checkbox" />
        Full time
      </label>
      <label>
        <div className="location-title">LOCATION</div>
        <input type="search" />
      </label>
      <fieldset>
        {locations.map((location) => (
          <label key={location}>
            <input type="radio" value={location} name="location" />
            {location}
          </label>
        ))}
      </fieldset>
    </div>
  );
}

function useJobs({ keyword }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl = `https://jobs.github.com/positions.json?search=${keyword}`;
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

export function FilterableJobList() {
  const [keyword, setKeyword] = useState("");
  const { jobs, isLoading, error } = useJobs({ keyword });

  return (
    <div className="job-list">
      <Header>
        <SearchForm onKeywordChange={(k) => setKeyword(k)} />
      </Header>
      <Filters />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <JobList jobs={jobs} isLoading={isLoading} />
      )}
    </div>
  );
}
