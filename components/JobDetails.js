import React from "react";
import { Header } from "./Header";
import { useJob } from "./useJobs";
import Link from "next/link";

export function JobDetailsStatic({ isLoading, job }) {
  const {
    type,
    company,
    company_logo,
    location,
    title,
    created_at,
    how_to_apply,
    description,
  } = job || {};
  return (
    <div className="job-details">
      <div>
        <Link href="/">← Back to search</Link>
        <div className="how-to-apply">
          <h2>how to apply</h2>
          <div dangerouslySetInnerHTML={{ __html: how_to_apply }} />
        </div>
      </div>
      <div>
        <h1 className={isLoading ? "title loading" : "title"}>{title}</h1>
        <div className="created-at">{created_at}</div>
        <img className="logo" src={company_logo} />
        <div className="company">{company}</div>
        <div className="location">{location}</div>
        <div
          className={isLoading ? "description loading" : "description"}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

export function JobDetails({ id }) {
  const { job, isLoading, error } = useJob(id);
  return (
    <div>
      <Header />
      <JobDetailsStatic job={job} isLoading={isLoading} />
    </div>
  );
}
