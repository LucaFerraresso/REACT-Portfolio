import React from "react";

const LinkedInSvg = () => {
  return (
    <a
      href="https://www.linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", width: "24px", height: "24px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="24"
        height="24"
        fill="#0077B5"
      >
        <path d="M100.28 448H7.4V148.9h92.88zm-46.14-343.2C24.29 104.8 0 80.46 0 50.24A49.92 49.92 0 0149.92 0C80.4 0 104 24.19 104 54.47c0 30.22-24.57 54.33-49.92 54.33zm394.2 343.2H348.36V304.3c0-34.28-12.26-57.65-42.84-57.65-23.38 0-37.3 15.74-43.42 30.94-2.23 5.45-2.79 13.03-2.79 20.63v149.77h-92.93s1.23-243.27 0-268.35h92.93v38.04c-.18.29-.43.61-.61.89h.61v-.89c12.34-19.08 34.4-46.35 83.66-46.35 61.08 0 106.88 39.79 106.88 125.3zm0 0" />
      </svg>
    </a>
  );
};

export default LinkedInSvg;
