import React from "react";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="8" fill="#6366F1" />
        <path
          d="M11 13L8 18L11 23"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 13L28 18L25 23"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="18" r="2" fill="white" />
      </svg>

      <span style={{ fontSize: "18px", fontWeight: "600" }}>
        AI Code Reviewer
      </span>
    </div>
  );
};

export default Logo;
