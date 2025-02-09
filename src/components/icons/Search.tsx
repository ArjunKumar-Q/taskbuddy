import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const Search: React.FC<LogoProps> = ({ fill = "#000000", ...props }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g opacity="0.6">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M3.75 8.25c0-2.482 2.018-4.5 4.5-4.5s4.5 2.018 4.5 4.5-2.018 4.5-4.5 4.5a4.504 4.504 0 0 1-4.5-4.5m11.78 6.22-2.546-2.547A5.96 5.96 0 0 0 14.25 8.25c0-3.308-2.692-6-6-6s-6 2.692-6 6 2.692 6 6 6a5.96 5.96 0 0 0 3.673-1.266l2.547 2.546a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06"
        clipRule="evenodd"
      ></path>
      <mask
        id="mask0_2038_7433"
        width="14"
        height="14"
        x="2"
        y="2"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M3.75 8.25c0-2.482 2.018-4.5 4.5-4.5s4.5 2.018 4.5 4.5-2.018 4.5-4.5 4.5a4.504 4.504 0 0 1-4.5-4.5m11.78 6.22-2.546-2.547A5.96 5.96 0 0 0 14.25 8.25c0-3.308-2.692-6-6-6s-6 2.692-6 6 2.692 6 6 6a5.96 5.96 0 0 0 3.673-1.266l2.547 2.546a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#mask0_2038_7433)">
        <path fill="#000" d="M0 0h18v18H0z"></path>
      </g>
    </g>
  </svg>
);

export default Search;
