import React from "react";

export function RestartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={props.onClick} 
      style={{ cursor: "pointer" }} 
    >
      <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
    </svg>
  );
}