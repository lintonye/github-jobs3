import React from "react";

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

function LoadingCards({ count }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <article className="job-card">
            <div className="logo loading-logo loading" />
            <div className="company loading"> </div>
            <div className="title loading"> </div>
            <div className="company loading"> </div>
          </article>
        ))}
    </>
  );
}

export function Results({ jobs, isLoading }) {
  return (
    <div className="results">
      {isLoading ? (
        <LoadingCards count={5} />
      ) : (
        jobs.map((job) => <JobCard {...job} key={job.id} />)
      )}
    </div>
  );
}
