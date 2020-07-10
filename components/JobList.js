import MockPositions from "./mock-positions.json";

function Header() {
  return (
    <div className="header">
      <h2>Github Jobs</h2>
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
        <div>LOCATION</div>
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
