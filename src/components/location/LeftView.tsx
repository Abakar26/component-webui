import { useState } from 'react'
import Racks from './Racks';
import LastRow from './LastRow';

// This component has Left Rack view from Location screen
const LeftView = ({ side, setSide }: any) => {
  const [activeRowIndex, setActiveRowIndex] = useState();
  const [activeColIndex, setActiveColIndex] = useState();
  // In left view we have LastRow at top
  return (
    <div className="flex flex-col">
      <div className='ml-4'>
        <LastRow activeColIndex={activeColIndex} />
      </div>
      {Array.from({ length: 4 }, (_, rowIndex) => (
        <div key={rowIndex} className="flex">
          <div className="h-24 w-11 flex justify-start pt-4">
            <p
              className={`text-[#002040] text-[12px] ${rowIndex == activeRowIndex ? 'font-bold' : 'font-extralight'}`}
              style={{ fontFamily: 'AcuminProLight' }}
            >
              {4 - rowIndex}
            </p>
          </div>
          <div className='flex ml-4'>
            {Array.from({ length: 24 }, (_, colIndex) => (
              <div
                key={colIndex}
                className="h-24 w-11 flex items-center justify-center relative"
              >
                <Racks side={side} rowIndex={rowIndex} colIndex={colIndex} setSide={setSide} setActiveColIndex={setActiveColIndex} setActiveRowIndex={setActiveRowIndex} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftView;
