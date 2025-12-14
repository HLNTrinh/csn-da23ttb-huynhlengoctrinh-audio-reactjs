import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSection.css";

export default function HomeSection() {
  const sliderRef = useRef(null);
  const audioRef = useRef(new Audio());
  const navigate = useNavigate();

  const items = [
    { id: 1, img: "https://image-cdn.nct.vn/focus/2025/11/13/a/r/6/V/1763015966141_1500.jpg"},
    { id: 2, img: "https://image-cdn.nct.vn/focus/2025/09/29/z/q/2/h/1759129775879_1500.png" },
    { id: 3, img: "https://image-cdn.nct.vn/focus/2025/11/24/P/w/i/l/1763981207380_1500.png" },
    { id: 4, img: "https://image-cdn.nct.vn/focus/2025/12/02/T/G/q/2/1764667974925_1500.jpg" },
    { id: 5, img: "https://image-cdn.nct.vn/focus/2025/12/03/3/j/Y/U/1764737425997_1500.jpg" },
  ];

  const playSong = (item) => {
    audioRef.current.src = item.audio;
    audioRef.current.play();
  
  };

  useEffect(() => {
    const slider = sliderRef.current;
    let direction = -1; 
    const scrollStep = 3; // pixels mỗi frame
    let requestId;

    const loopScroll = () => {
      if (!slider) return;

      slider.scrollLeft += scrollStep * direction;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) direction = -1;
      if (slider.scrollLeft <= 0) direction = 1;

      requestId = requestAnimationFrame(loopScroll);
    };

    loopScroll();

    return () => cancelAnimationFrame(requestId);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {items.map((item, index) => (
          <div className="slider-item" key={index} onClick={() => playSong(item)}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
