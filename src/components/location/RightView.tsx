import { useState } from 'react'
import Racks from './Racks';
import LastRow from './LastRow';
// This component has right view of locattion screen
const RightView = ({ side, setSide }: any) => {
  const [activeRowIndex, setActiveRowIndex] = useState();
  const [activeColIndex, setActiveColIndex] = useState();
  // In right view , last row(indexing) is repesent at buttom
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="h-24 w-11 flex justify-center"></div>
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
      <LastRow activeColIndex={activeColIndex} />
    </div>
  );
};

export default RightView;
