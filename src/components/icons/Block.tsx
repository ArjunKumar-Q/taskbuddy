import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const Block: React.FC<LogoProps> = ({ fill = "#231F2082", ...props }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
      >
        <path
          fill={fill}
          d="M12.364 2H3.636A1.636 1.636 0 0 0 2 3.636v8.728A1.636 1.636 0 0 0 3.636 14h8.728A1.636 1.636 0 0 0 14 12.364V3.636A1.636 1.636 0 0 0 12.364 2m.545 10.364a.545.545 0 0 1-.545.545H3.636a.545.545 0 0 1-.545-.545V3.636a.545.545 0 0 1 .545-.545h8.728a.545.545 0 0 1 .545.545zm-1.636-7.637v3.818a.545.545 0 1 1-1.091 0V4.727a.545.545 0 0 1 1.09 0m-2.728 0v6.546a.545.545 0 1 1-1.09 0V4.727a.545.545 0 1 1 1.09 0m-2.727 0V6.91a.545.545 0 0 1-1.09 0V4.727a.545.545 0 0 1 1.09 0"
        ></path>
      </svg>
    );
    
    export default Block;
    