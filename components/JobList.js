import MockPositions from "./mock-positions.json";

function Header() {
  return (
    <div className="header">
      Github Jobs
      <form className="search-form">
        <input type="search" name="" />
        <button>Search</button>
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
        LOCATION
        <input type="search" />
      </label>
      <fieldset>
        {locations.map((location) => (
          <label key={location}>
            <input type="radio" />
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
      <div className="title">{title}</div>
      <img className="logo" src={company_logo} />
      <div className="company">{company}</div>
      <div className="location">{location}</div>
      <div className="created-at">{created_at}</div>
    </article>
  );
}

function Results() {
  const jobs = MockPositions;
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
