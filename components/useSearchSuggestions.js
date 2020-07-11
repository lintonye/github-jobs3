import { useState, useEffect } from "react";

const terms = [
  "GitHub",
  "JavaScript",
  "Java",
  "Python",
  "Rust",
  "Design",
  "Developer",
  "Engineer",
  "InVision",
];
const SuggestionsAPI = {
  load(keyword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          keyword.length === 0
            ? []
            : terms.filter((term) =>
                term.toLowerCase().includes(keyword.toLowerCase())
              )
        );
      }, 500);
    });
  },
};
export function useSearchSuggestions(keyword) {
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState("initial");
  useEffect(() => {
    setStatus("loading");
    SuggestionsAPI.load(keyword).then((result) => {
      setSuggestions(result);
      setStatus("done");
    });
  }, [keyword]);
  return { suggestions, status };
}
