import React, { useState } from 'react';
import RightView from '../../location/RightView';
import LeftView from '../../location/LeftView';

/* This Component that has both Left and right Rack View 
based on what we choose to represent on screen
*/
const Location = () => {
  const [side, setSide] = useState('L');

  return (
    <div className="relative">
      <p
        className='text-[18px] text-[#002040] pl-4 font-semibold capitalize'
        style={{ fontFamily: 'AcuminPro' }}
      >
        {`Rack ID: 2${side == 'L' ? 'L' : 'R'}`}
      </p>
      <div className='pt-16 pl-16'>
        {side == 'R' && <RightView side={side} setSide={setSide} />}
        {side == 'L' && <LeftView side={side} setSide={setSide} />}
      </div>
    </div>
  );
};

export default Location;
