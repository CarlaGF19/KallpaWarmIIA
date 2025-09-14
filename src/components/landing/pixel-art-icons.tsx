import type { SVGProps } from 'react';

export const ScienceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M38 4H26V10H20V16H16V22H14V42H16V48H20V54H26V60H38V54H44V48H48V42H50V22H48V16H44V10H38V4ZM32 16C27.5817 16 24 19.5817 24 24V32H28V24C28 21.7909 29.7909 20 32 20C34.2091 20 36 21.7909 36 24V40H40V24C40 19.5817 36.4183 16 32 16Z" fill="currentColor"/>
  </svg>
);

export const TechIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M52 12H12V52H52V12ZM46 18H18V46H46V18Z" fill="currentColor"/>
    <path d="M22 22H32V26H22V22Z" fill="currentColor"/>
    <path d="M36 22H42V26H36V22Z" fill="currentColor"/>
    <path d="M22 30H28V34H22V30Z" fill="currentColor"/>
    <path d="M32 30H42V34H32V30Z" fill="currentColor"/>
    <path d="M22 38H36V42H22V38Z" fill="currentColor"/>
  </svg>
);

export const EngineeringIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M32 4L38 10H34V18L44 24V28H20V24L30 18V10H26L32 4ZM44 34V42L36 46V54L42 60H22L28 54V46L20 42V34H44ZM32 32C28.6863 32 26 34.6863 26 38C26 41.3137 28.6863 44 32 44C35.3137 44 38 41.3137 38 38C38 34.6863 35.3137 32 32 32Z" fill="currentColor"/>
  </svg>
);

export const MathIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path d="M16 16H24V24H16V16Z" fill="currentColor"/>
    <path d="M40 16H48V24H40V16Z" fill="currentColor"/>
    <path d="M28 28H36V36H28V36V28Z" fill="currentColor"/>
    <path d="M16 40H48V48H16V40Z" fill="currentColor"/>
  </svg>
);

export const ArtIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path d="M32 4L12 24L22 28L18 36L32 50L46 36L42 28L52 24L32 4Z" fill="currentColor" />
    <path d="M32 52V60" stroke="currentColor" strokeWidth="4" />
    <path d="M24 58H40" stroke="currentColor" strokeWidth="4" />
  </svg>
);
