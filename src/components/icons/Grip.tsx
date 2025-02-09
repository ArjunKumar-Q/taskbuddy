import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const Grip: React.FC<LogoProps> = ({ fill = "#231F2082", ...props }) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="15"
    fill="none"
    viewBox="0 0 21 15"
    {...props}
  >
    <g opacity="0.6">
      <path
        fill={fill}
        // fillOpacity="0.6"
        fillRule="evenodd"
        d="M13.5 4.375a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m0 1.875a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-1.25 5.625a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"
        clipRule="evenodd"
      ></path>
      <mask
        id="mask0_2027_2950"
        width="3"
        height="13"
        x="12"
        y="1"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M13.5 4.375a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m0 1.875a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-1.25 5.625a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"
          clipRule="evenodd"
        ></path>
      </mask>
    </g>
    <g opacity="0.6">
      <path
        fill={fill}
        // fillOpacity="0.6"
        fillRule="evenodd"
        d="M7.5 4.375a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m0 1.875a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-1.25 5.625a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"
        clipRule="evenodd"
      ></path>
      <mask
        id="mask1_2027_2950"
        width="3"
        height="13"
        x="6"
        y="1"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M7.5 4.375a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m0 1.875a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-1.25 5.625a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"
          clipRule="evenodd"
        ></path>
      </mask>
    </g>
  </svg>
);

export default Grip;
