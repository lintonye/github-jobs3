import MockPositions from "./mock-positions.json";
import { useState, useEffect } from "react";

function Header() {
  return (
    <div className="header">
      <h2>
        <strong>Github</strong> Jobs
      </h2>
      <form className="search-form">
        <div>
          <input type="search" name="" />
          <button>Search</button>
        </div>
      </form>
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
  const [status, setStatus] = useState("initial");
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const destUrl = `https://jobs.github.com/positions.json`;
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
