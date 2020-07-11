import React from "react";
export function Header({ children }) {
  return (
    <div className="header">
      <h2>
        <strong>Github</strong> Jobs
      </h2>
      <div className="hero">{children}</div>
    </div>
  );
}
