import MockPositions from "./mock-positions.json";
import { useState, useEffect } from "react";

function SearchForm({ onKeywordChange }) {
  const [term, setTerm] = useState("");
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onKeywordChange(term);
      }}
    >
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
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

function JobCard({
  type,
  company,
  company_logo,
  location,
  title,
  created_at,
  id,
}) {
  return (
    <article className="job-card">
      <img className="logo" src={company_logo} />
      <div className="company">{company}</div>
      <div className="title">{title}</div>
      <div className="type">{type}</div>
      <div className="location">{location}</div>
      <div className="created-at">{created_at}</div>
    </article>
  );
}

function useJobs({ keyword }) {
  const [status, setStatus] = useState("initial");
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl = `https://jobs.github.com/positions.json?search=${keyword}`;
  const url = `${proxyUrl}${destUrl}`;
  useEffect(() => {
    async function loadData() {
      try {
        setStatus("loading");
        setError(null);
        const res = await fetch(url);
        const json = await res.json();
        setJobs(json);
      } catch (error) {
        setError("Failed to fetch");
      } finally {
        setStatus("done");
      }
    }
    loadData();
  }, [url]);
  return { jobs, status, error };
}

function Results({ jobs }) {
  return (
    <div className="results">
      {jobs.map((job) => (
        <JobCard {...job} key={job.id} />
      ))}
    </div>
  );
}

export function JobList() {
  const [keyword, setKeyword] = useState("");
  const { jobs } = useJobs({ keyword });

  return (
    <div className="job-list">
      <Header>
        <SearchForm onKeywordChange={(k) => setKeyword(k)} />
      </Header>
      <Filters />
      <Results jobs={jobs} />
    </div>
  );
}
