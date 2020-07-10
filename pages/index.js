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
function Results() {
  return <div>Results</div>;
}
function JobList() {
  return (
    <div className="job-list">
      <Header />
      <Filters />
      <Results />
    </div>
  );
}
export default function Home() {
  return <JobList />;
}
