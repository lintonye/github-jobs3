import React from "react";
import { Header } from "./Header";
export function JobDetailsStatic({
  type,
  company,
  company_logo,
  location,
  title,
  created_at,
  how_to_apply,
  description,
}) {
  return (
    <div className="job-details">
      <div className="title">{title}</div>
      <img className="logo" src={company_logo} />
      <div className="company">{company}</div>
      <div className="location">{location}</div>
      <div className="created-at">{created_at}</div>
      <div className="how-to-apply">
        <h2>how to apply</h2>
        <div dangerouslySetInnerHTML={{ __html: how_to_apply }} />
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

export function JobDetails({ id }) {
  return (
    <div>
      <Header />
      <JobDetailsStatic />
    </div>
  );
}
