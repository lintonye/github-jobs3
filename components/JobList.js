import React from "react";
import { useState, useEffect } from "react";
import { Results } from "./Results";

function SearchForm({ onKeywordChange }) {
  const [term, setTerm] = useState("");
  function dispatchKeywordChange(k) {
    typeof onKeywordChange === "function" && onKeywordChange(k);
  }
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        dispatchKeywordChange(term);
      }}
    >
      <input
        type="search"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          if (e.target.value.length === 0) dispatchKeywordChange("");
        }}
      />
      <button>Search</button>
    </form>
  );
}

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

export function JobList() {
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
        <Results jobs={jobs} isLoading={isLoading} />
      )}
    </div>
  );
}
