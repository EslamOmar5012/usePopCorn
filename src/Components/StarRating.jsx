import { useState } from "react";

const listStyle = {
  listStyle: "none",
  display: "flex",
  gap: "10px",
  cursor: "pointer",
};

const ratingBoxStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  fontSize: "32px",
  fontWeight: "bold",
};

export default function StarRating({
  maxRating = "5",
  size = "48px",
  color = "#fcd53f",
  cls = "",
  onSetRating = "",
}) {
  const [hoveredNum, setHoveredNum] = useState(0);
  const [tempHoveredNum, setTempHoveredNum] = useState(0);

  const handleClick = (num) => {
    setHoveredNum(num + 1);
    onSetRating(num + 1);
  };

  const handleHover = (num) => {
    setTempHoveredNum(num + 1);
  };

  const handleMouseOut = () => setTempHoveredNum(0);

  const checkHover = (num) => {
    if (tempHoveredNum) return tempHoveredNum >= num + 1;

    if (hoveredNum) return hoveredNum >= num + 1;

    return false;
  };

  return (
    <div className={cls} style={ratingBoxStyle}>
      <ul style={listStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <li
            onClick={() => handleClick(i)}
            onMouseOver={() => handleHover(i)}
            onMouseOut={handleMouseOut}
            key={i + 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
            >
              <path
                fill={checkHover(i) ? color : "none"}
                stroke={color}
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873z"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
