import React from "react";

const Logout: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = "#2F2F2F",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      fill={fill}
      d="M2.4 8.203h8.147a.703.703 0 0 0 0-1.406H2.4l.909-.91a.703.703 0 1 0-.995-.994L.206 7.003l-.047.051-.018.025-.023.03-.018.03-.017.03q-.008.015-.015.031l-.014.031q-.007.015-.012.031l-.012.034-.008.032-.008.035-.006.036-.004.032L0 7.499v.002q0 .035.004.068.001.016.004.031.002.02.006.037l.008.035.008.032.012.033q.005.017.012.032l.014.03.015.032.017.029.018.03.022.03.02.026.044.049.002.002 2.11 2.11a.7.7 0 0 0 .994 0 .703.703 0 0 0 0-.995z"
    ></path>
    <path
      fill={fill}
      d="M14.297 1.172H5.39a.703.703 0 0 0-.703.703v2.812a.703.703 0 0 0 1.406 0V2.578h7.5v9.844h-7.5v-2.11a.703.703 0 0 0-1.407 0v2.813c0 .388.315.703.704.703h8.906a.703.703 0 0 0 .703-.703V1.875a.703.703 0 0 0-.703-.703"
    ></path>
  </svg>
);

export default Logout;
