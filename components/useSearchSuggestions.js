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
      if (keyword.length === 0) resolve([]);
      else
        setTimeout(() => {
          resolve(
            terms.filter((term) =>
              term.toLowerCase().includes(keyword.toLowerCase())
            )
          );
        }, 500);
    });
  },
};
export function useSearchSuggestions(keyword) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    SuggestionsAPI.load(keyword).then((result) => {
      setSuggestions(result);
      setIsLoading(false);
    });
  }, [keyword]);
  return { suggestions, isLoading };
}
