import React from 'react';

const PeopleIcon = ({
  className,
  size,
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17.9998 7.91002C17.9698 7.91002 17.9498 7.91002 17.9198 7.91002H17.8698C15.9798 7.85002 14.5698 6.39001 14.5698 4.59001C14.5698 2.75001 16.0698 1.26001 17.8998 1.26001C19.7298 1.26001 21.2298 2.76001 21.2298 4.59001C21.2198 6.40001 19.8098 7.86001 18.0098 7.92001C18.0098 7.91001 18.0098 7.91002 17.9998 7.91002ZM17.8998 2.75002C16.8898 2.75002 16.0698 3.57002 16.0698 4.58002C16.0698 5.57002 16.8398 6.37002 17.8298 6.41002C17.8398 6.40002 17.9198 6.40002 18.0098 6.41002C18.9798 6.36002 19.7298 5.56002 19.7398 4.58002C19.7398 3.57002 18.9198 2.75002 17.8998 2.75002Z'
          fill='currentColor'
        />
        <path
          d='M18.01 15.28C17.62 15.28 17.23 15.25 16.84 15.18C16.43 15.11 16.16 14.72 16.23 14.31C16.3 13.9 16.69 13.63 17.1 13.7C18.33 13.91 19.63 13.68 20.5 13.1C20.97 12.79 21.22 12.4 21.22 12.01C21.22 11.62 20.96 11.24 20.5 10.93C19.63 10.35 18.31 10.12 17.07 10.34C16.66 10.42 16.27 10.14 16.2 9.73002C16.13 9.32002 16.4 8.93003 16.81 8.86003C18.44 8.57003 20.13 8.88002 21.33 9.68002C22.21 10.27 22.72 11.11 22.72 12.01C22.72 12.9 22.22 13.75 21.33 14.35C20.42 14.95 19.24 15.28 18.01 15.28Z'
          fill='currentColor'
        />
        <path
          d='M5.96998 7.91C5.95998 7.91 5.94998 7.91 5.94998 7.91C4.14998 7.85 2.73998 6.39 2.72998 4.59C2.72998 2.75 4.22998 1.25 6.05998 1.25C7.88998 1.25 9.38998 2.75 9.38998 4.58C9.38998 6.39 7.97998 7.85 6.17998 7.91L5.96998 7.16L6.03998 7.91C6.01998 7.91 5.98998 7.91 5.96998 7.91ZM6.06998 6.41C6.12998 6.41 6.17998 6.41 6.23998 6.42C7.12998 6.38 7.90998 5.58 7.90998 4.59C7.90998 3.58 7.08998 2.75999 6.07998 2.75999C5.06998 2.75999 4.24998 3.58 4.24998 4.59C4.24998 5.57 5.00998 6.36 5.97998 6.42C5.98998 6.41 6.02998 6.41 6.06998 6.41Z'
          fill='currentColor'
        />
        <path
          d='M5.96 15.28C4.73 15.28 3.55 14.95 2.64 14.35C1.76 13.76 1.25 12.91 1.25 12.01C1.25 11.12 1.76 10.27 2.64 9.68002C3.84 8.88002 5.53 8.57003 7.16 8.86003C7.57 8.93003 7.84 9.32002 7.77 9.73002C7.7 10.14 7.31 10.42 6.9 10.34C5.66 10.12 4.35 10.35 3.47 10.93C3 11.24 2.75 11.62 2.75 12.01C2.75 12.4 3.01 12.79 3.47 13.1C4.34 13.68 5.64 13.91 6.87 13.7C7.28 13.63 7.67 13.91 7.74 14.31C7.81 14.72 7.54 15.11 7.13 15.18C6.74 15.25 6.35 15.28 5.96 15.28Z'
          fill='currentColor'
        />
        <path
          d='M11.9998 15.38C11.9698 15.38 11.9498 15.38 11.9198 15.38H11.8698C9.97982 15.32 8.56982 13.86 8.56982 12.06C8.56982 10.22 10.0698 8.72998 11.8998 8.72998C13.7298 8.72998 15.2298 10.23 15.2298 12.06C15.2198 13.87 13.8098 15.33 12.0098 15.39C12.0098 15.38 12.0098 15.38 11.9998 15.38ZM11.8998 10.22C10.8898 10.22 10.0698 11.04 10.0698 12.05C10.0698 13.04 10.8398 13.84 11.8298 13.88C11.8398 13.87 11.9198 13.87 12.0098 13.88C12.9798 13.83 13.7298 13.03 13.7398 12.05C13.7398 11.05 12.9198 10.22 11.8998 10.22Z'
          fill='currentColor'
        />
        <path
          d='M11.9998 22.76C10.7998 22.76 9.59978 22.45 8.66978 21.82C7.78978 21.23 7.27979 20.39 7.27979 19.49C7.27979 18.6 7.77978 17.74 8.66978 17.15C10.5398 15.91 13.4698 15.91 15.3298 17.15C16.2098 17.74 16.7198 18.58 16.7198 19.48C16.7198 20.37 16.2198 21.23 15.3298 21.82C14.3998 22.44 13.1998 22.76 11.9998 22.76ZM9.49979 18.41C9.02979 18.72 8.77979 19.11 8.77979 19.5C8.77979 19.89 9.03979 20.27 9.49979 20.58C10.8498 21.49 13.1398 21.49 14.4898 20.58C14.9598 20.27 15.2098 19.88 15.2098 19.49C15.2098 19.1 14.9498 18.72 14.4898 18.41C13.1498 17.5 10.8598 17.51 9.49979 18.41Z'
          fill='currentColor'
        />
      </svg>
    </div>
  );
};

export default PeopleIcon;
