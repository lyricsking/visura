import React from "react";

const FootballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64px"
      height="64px"
      fill="currentColor"
      {...props}
    >
      <circle cx="32" cy="32" r="32" fill="#000" />
      <path
        fill="#fff"
        d="M32 4.8c-15 0-27.2 12.2-27.2 27.2S17 59.2 32 59.2 59.2 47 59.2 32 47 4.8 32 4.8zm0 51.4c-13.3 0-24.2-10.8-24.2-24.2S18.7 7.8 32 7.8s24.2 10.8 24.2 24.2-10.9 24.2-24.2 24.2z"
      />
      <polygon
        fill="#fff"
        points="32 16.6 37.2 22 35.7 28.8 32 31.7 28.3 28.8 26.8 22 32 16.6"
      />
      <polygon
        fill="#fff"
        points="21.7 24.4 23.4 30.8 20.6 34.4 15.6 33.4 13.5 27.9 17.2 23.9"
      />
      <polygon
        fill="#fff"
        points="42.3 24.4 46.8 23.9 50.5 27.9 48.4 33.4 43.4 34.4 40.6 30.8"
      />
      <polygon
        fill="#fff"
        points="23.7 41.2 24.7 46.6 30.4 47.5 33.3 43.8 29.9 39.9 24.4 40.9"
      />
      <polygon
        fill="#fff"
        points="40.3 41.2 35.6 40.9 30.1 39.9 33.7 43.8 36.6 47.5 42.3 46.6"
      />
    </svg>
  );
};

export default FootballIcon;
