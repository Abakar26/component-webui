import React, { useState } from 'react';
import SingleRack from './SingleRack'; 
// This component has a set of 5 cubes and racks
const Racks = ({side, rowIndex, colIndex, setSide, setActiveColIndex, setActiveRowIndex } : any) => {
  return (
    <div
      className="absolute left-0"
    >
      {[5, 0, -5, -10, -15].map((shift, index) => (
        <SingleRack key={index} shift={shift} side={side} setSide={setSide} rowIndex={rowIndex} colIndex={colIndex} cubeIndex={index} setActiveColIndex={setActiveColIndex} setActiveRowIndex={setActiveRowIndex}/>
      ))}
    </div>
  );
};

export default Racks;

