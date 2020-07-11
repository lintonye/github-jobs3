import React from "react";
import { JobList } from "../components/JobList";
import "../styles.css";
import MockLocations from "./mock-positions.json";

export default {
  title: "JobList",
};

export function Loading() {
  return <JobList isLoading={true} />;
}

export function Empty() {
  return <JobList jobs={[]} />;
}

export function WithData() {
  return <JobList jobs={MockLocations} />;
}
