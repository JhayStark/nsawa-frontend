import React from 'react';

const MoneySend = ({ size }: { size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.91675 11.4583C7.91675 12.2667 8.54176 12.9167 9.30843 12.9167H10.8751C11.5417 12.9167 12.0834 12.35 12.0834 11.6417C12.0834 10.8833 11.7501 10.6083 11.2584 10.4333L8.75008 9.55834C8.25841 9.38334 7.92509 9.11668 7.92509 8.35001C7.92509 7.65001 8.46674 7.07501 9.13341 7.07501H10.7001C11.4667 7.07501 12.0918 7.72501 12.0918 8.53335'
        stroke='#159A09'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 6.25V13.75'
        stroke='#159A09'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.3334 10C18.3334 14.6 14.6001 18.3334 10.0001 18.3334C5.40008 18.3334 1.66675 14.6 1.66675 10C1.66675 5.40002 5.40008 1.66669 10.0001 1.66669'
        stroke='#159A09'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.3333 5.00002V1.66669H15'
        stroke='#159A09'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.1667 5.83335L18.3334 1.66669'
        stroke='#159A09'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MoneySend;
