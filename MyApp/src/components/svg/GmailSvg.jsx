import React from "react";

const GmailSvg = () => {
  return (
    <a
      href="https://mail.google.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", width: "24px", height: "24px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="24"
        height="24"
      >
        <path
          fill="#EA4335"
          d="M502.3 190.8L273.4 347 44.8 190.9V464c0 26.5 21.5 48 48 48h361.6c26.5 0 48-21.5 48-48V190.8z"
        />
        <path
          fill="#34A853"
          d="M44.8 48C18.3 48 0 69.5 0 96v22.2l256 177.8L512 118.2V96c0-26.5-21.5-48-48-48H44.8z"
        />
        <path
          fill="#FBBC04"
          d="M512 118.2L256 296 0 118.2V287l256 177.8L512 287V118.2z"
        />
        <path
          fill="#4285F4"
          d="M502.3 47.9c-20.1-9-43.5-3.9-60.7 8.6L256 211.4 70.5 56.5c-17.3-12.5-40.7-17.7-60.7-8.6C4.1 51.5 0 63.8 0 76.7v242.3l256 177.8L512 319V76.7c0-12.9-4.1-25.2-9.7-28.8z"
        />
      </svg>
    </a>
  );
};

export default GmailSvg;
