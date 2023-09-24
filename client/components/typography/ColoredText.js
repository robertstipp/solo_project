import React from 'react'

const ColoredText = ({text}) => {
  const colors = ['#dd0100', '#fac901','#225095'];
  return (
    <div>
      {text.split("").map((char, index) => (
        <span key={index} style={{color: colors[index % colors.length]}}>
          {char}
        </span>
      ))}
    </div>
  );
}

export default ColoredText