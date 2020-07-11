import React from "react";
import { useState } from "react";
import { useSearchSuggestions } from "./useSearchSuggestions";

export function SearchFormStatic({
  onSubmit,
  onChange,
  suggestions,
  isLoading,
  value,
  onSuggestionClick,
}) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input type="search" value={value} onChange={onChange} />
      {isLoading ? (
        <ul className="loading suggestions">...</ul>
      ) : (
        suggestions &&
        suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s) => (
              <li
                key={s}
                onClick={() =>
                  typeof onSuggestionClick === "function" &&
                  onSuggestionClick(s)
                }
              >
                <div>{s}</div>
              </li>
            ))}
          </ul>
        )
      )}
      <button>Search</button>
    </form>
  );
}

export function SearchForm({ onKeywordChange }) {
  const [term, setTerm] = useState("");
  const { suggestions, isLoading } = useSearchSuggestions(term);
  function dispatchKeywordChange(k) {
    typeof onKeywordChange === "function" && onKeywordChange(k);
  }

  return (
    <SearchFormStatic
      onSubmit={(e) => {
        e.preventDefault();
        dispatchKeywordChange(term);
      }}
      onChange={(e) => {
        setTerm(e.target.value);
        if (e.target.value.length === 0) dispatchKeywordChange("");
      }}
      onSuggestionClick={(s) => setTerm(s)}
      value={term}
      suggestions={suggestions}
      isLoading={isLoading}
    />
  );
}
