import React from "react";
import { JobDetailsStatic } from "../components/JobDetails";
import "../styles.css";
import MockLocations from "./mock-positions.json";

export default {
  title: "JobDetails",
};

export function Loading() {
  return <JobDetailsStatic isLoading={true} />;
}

export function WithData() {
  return <JobDetailsStatic job={MockLocations[0]} />;
}
