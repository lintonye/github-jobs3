import React from "react";
import "../styles.css";
import { SearchFormStatic } from "../components/SearchForm";

export default {
  title: "Search Form",
};

export function StaticStates() {
  return (
    <div style={{ backgroundColor: "#e0e0f0", padding: 16, width: 400 }}>
      <div>
        <h2>No Suggestions</h2>
        <SearchFormStatic />
      </div>
      <div>
        <h2>With Suggestions</h2>
        <SearchFormStatic suggestions={["A", "B", "C", "D"]} />
      </div>
      <div style={{ marginTop: 160, marginBottom: 160 }}>
        <h2>Loading</h2>
        <SearchFormStatic isLoading />
      </div>
    </div>
  );
}
