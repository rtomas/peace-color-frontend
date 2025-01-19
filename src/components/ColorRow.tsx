import React from "react";

interface RowProps {
  color1: string;
  color2: string;
  colorName: string;
}

const ColorRow = ({ color1, color2, colorName }: RowProps) => {
  // make a gradient with the two colors
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${color1} 70%, ${color1} 80%, ${color2} 100%)`,
  };
  const textStyle = {
    color: '#ffffff', // White text
    textShadow: '2px 2px 2px #111111, -1px -1px 2px #111111',
    alignItems: 'flex-start',
    marginTop: '-7px'
  };
  return (
    <div
      style={gradientStyle}
      className="w-full flex items-center justify-center h-10"
    >
      <div style={textStyle}>
        {colorName}
      </div>
    </div>
  );
};

export default ColorRow;
