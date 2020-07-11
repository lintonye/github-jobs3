import React from "react";
import { Results } from "../components/Results";
import "../styles.css";
import MockLocations from "./mock-positions.json";

export default {
  title: "Results",
};

export function Loading() {
  return <Results isLoading={true} />;
}

export function Empty() {
  return <Results jobs={[]} />;
}

export function WithData() {
  return <Results jobs={MockLocations} />;
}
