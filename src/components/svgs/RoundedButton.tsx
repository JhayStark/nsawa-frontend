import React from 'react';

const RoundedButton = ({ size }: { size?: string }) => {
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox='0 0 95 95'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='47.5' cy='47.5' r='47.5' fill='#C0E864' />
        <path
          d='M67.0607 49.0607C67.6464 48.4749 67.6464 47.5251 67.0607 46.9393L57.5147 37.3934C56.9289 36.8076 55.9792 36.8076 55.3934 37.3934C54.8076 37.9792 54.8076 38.9289 55.3934 39.5147L63.8787 48L55.3934 56.4853C54.8076 57.0711 54.8076 58.0208 55.3934 58.6066C55.9792 59.1924 56.9289 59.1924 57.5147 58.6066L67.0607 49.0607ZM29 49.5H66V46.5H29V49.5Z'
          fill='#043F2E'
        />
      </svg>
    </div>
  );
};

export default RoundedButton;
