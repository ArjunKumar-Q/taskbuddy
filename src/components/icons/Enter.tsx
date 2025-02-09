import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const Enter: React.FC<LogoProps> = ({ fill = "#2F2F2F", ...props }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      fill={fill}
    //   fillOpacity="0.8"
      d="M2.05 9.701a.665.665 0 0 0 .147.729l2.665 2.665a.667.667 0 0 0 .943-.943l-1.529-1.529h6.39A3.333 3.333 0 0 0 14 7.29V4.623a.667.667 0 0 0-1.333 0V7.29a2 2 0 0 1-2 2h-6.39L5.804 7.76a.667.667 0 1 0-.943-.943L2.197 9.484a.7.7 0 0 0-.146.217"
    ></path>
  </svg>
);

export default Enter;
