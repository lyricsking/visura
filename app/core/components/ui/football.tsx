import React from "react";

const FootballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="100"
      height="100"
      {...props}
    >
      {/* Outer Circle */}
      <circle
        cx="32"
        cy="32"
        r="32"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="2"
      />

      {/* Hexagons and pentagons on the football */}
      {/* Center black pentagon */}
      <polygon points="32,16 37,22 34,29 28,29 25,22" fill="#000000" />

      {/* Upper hexagon */}
      <polygon
        points="32,8 37,16 32,16 28,16"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Upper left hexagon */}
      <polygon
        points="25,14 20,22 25,22 28,16"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Upper right hexagon */}
      <polygon
        points="39,14 44,22 39,22 37,16"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Lower left hexagon */}
      <polygon
        points="28,29 23,37 28,37 32,29"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Lower right hexagon */}
      <polygon
        points="37,29 42,37 37,37 34,29"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Lower pentagon */}
      <polygon points="32,48 28,43 34,43 32,48" fill="#000000" />

      {/* Left lower hexagon */}
      <polygon
        points="23,37 18,43 23,43 28,37"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />

      {/* Right lower hexagon */}
      <polygon
        points="42,37 47,43 42,43 37,37"
        fill="#FFFFFF"
        stroke="#000000"
        stroke-width="1"
      />
    </svg>
  );
};

export default FootballIcon;
