import React, { useState } from 'react';
import NextIcon from '../assets/icons/right-arrow.svg';
import PrevIcon from '../assets/icons/left-arrow.svg';
import "../assets/styles/slidercomponent.css"

export default function SliderComponent({ items = [] }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (!items.length) return;
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    if (!items.length) return;
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="slider">

      {/* SLIDER CONTENT */}
      <div className="slider-view">
        {items.length > 0 ? (
          <img
            src={items[index].flag}
            alt={items[index].name}
            className="slider-img"
          />
        ) : (
          <div className="slider-placeholder"></div>
        )}
      </div>

      <div className="slider-controls">

        <button className="arrow-btn" onClick={prev}>
          <img src={PrevIcon} alt="prev" className="arrow-icon"/>
        </button>

        <div className="dots">
          {items.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></div>
          ))}
        </div>

        <button className="arrow-btn" onClick={next}>
          <img src={NextIcon} alt="next" className="arrow-icon"/>
        </button>

      </div>
    </div>
  );
}
