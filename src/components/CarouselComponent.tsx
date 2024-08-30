// components/CarouselComponent.tsx
'use client';
import React, { CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel'; // Ensure you have the correct import based on your project setup

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import default styles

interface CarouselProps {
  images?: string[];
  axis?: 'horizontal' | 'vertical';
  autoPlay?: boolean;
  infiniteLoop?: boolean;
  showThumbs?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  dynamicHeight?: boolean;
  centerMode?: boolean;
  centerSlidePercentage?: number;
  interval?: number;
  transitionTime?: number;
  swipeable?: boolean;
}

const defaultImages = [1, 2, 3, 4, 5].map(index => `/assets/${index}.jpeg`);

const CarouselComponent: React.FC<CarouselProps> = ({
  images = defaultImages,
  axis = 'horizontal',
  autoPlay = true,
  infiniteLoop = true,
  showThumbs = true,
  showArrows = false,
  showIndicators = true,
  dynamicHeight = false,
  centerMode = false,
  centerSlidePercentage = 80,
  interval = 2000,
  transitionTime = 500,
  swipeable = true,
}) => {
  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
  };

  const indicatorStyles: CSSProperties = {
    background: '#fff',
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 8px',
  };

  return (
    <Carousel
      axis={axis}
      autoPlay={autoPlay}
      infiniteLoop={infiniteLoop}
      showThumbs={showThumbs}
      showArrows={showArrows}
      showIndicators={showIndicators}
      dynamicHeight={dynamicHeight}
      centerMode={centerMode}
      centerSlidePercentage={centerSlidePercentage}
      interval={interval}
      transitionTime={transitionTime}
      swipeable={swipeable}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type='button'
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            &lt;
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type='button'
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
          >
            &gt;
          </button>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              style={{ ...indicatorStyles, background: '#000' }}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            style={indicatorStyles}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role='button'
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
