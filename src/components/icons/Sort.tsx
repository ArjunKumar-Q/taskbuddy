const Sort = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M4 0L7.4641 3H0.535898L4 0Z" fill="black" fillOpacity="0.4" />
      <path d="M4 8L0.535898 5L7.4641 5L4 8Z" fill="black" fillOpacity="0.4" />
    </svg>
  );
};

export default Sort;
