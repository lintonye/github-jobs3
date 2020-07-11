import MockPositions from "./mock-positions.json";
import { useState, useEffect } from "react";

function Header() {
  return (
    <div className="header">
      <h2>
        <strong>Github</strong> Jobs
      </h2>
      <div className="search-form-container">
        <form className="search-form">
          <input type="search" name="" />
          <button>Search</button>
        </form>
      </div>
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

function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl = `https://jobs.github.com/positions.json`;
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

function Results() {
  const { jobs } = useJobs();
  return (
    <div className="results">
      {jobs.map((job) => (
        <JobCard {...job} key={job.id} />
      ))}
    </div>
  );
}

export function JobList() {
  return (
    <div className="job-list">
      <Header />
      <Filters />
      <Results />
    </div>
  );
}
