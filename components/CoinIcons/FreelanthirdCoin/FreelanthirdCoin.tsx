import type { SVGProps } from 'react';

export const FreelanthirdCoin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1000 1000"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <rect
      width="1000"
      height="1000"
      rx="500"
      fill="url(#paint0_linear_45_20)"
    />
    <path
      d="M498.498 833L456.569 762.353L738.01 275H821.294L498.498 833Z"
      fill="#FFD900"
    />
    <path
      d="M331.644 405.095H251.519L178 275H707.569L664.778 348.519H298.043L331.644 405.095Z"
      fill="black"
    />
    <path
      d="M617.68 430.367H265.591L442.497 733.634L482.416 666.433L388.506 504.173H577.187L617.68 430.367Z"
      fill="black"
    />
    <defs>
      <linearGradient
        id="paint0_linear_45_20"
        x1="500"
        y1="0"
        x2="500"
        y2="1000"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop stopColor="#FFF9DA" />
      </linearGradient>
    </defs>
  </svg>
);
