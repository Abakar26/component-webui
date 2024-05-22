import React, { useState, useEffect, useRef } from 'react';
import rack from '../../images/svg/loc_rounded.svg';
import cube from '../../images/svg/cube.svg'; //image for simple cube
import yellowCube from '../../images/svg/yellow-cube.svg'; //image for hovered cube

// A single rack containing cube
const SingleRack = ({
  shift,
  side,
  setSide,
  rowIndex,
  colIndex,
  cubeIndex,
  setActiveColIndex,
  setActiveRowIndex
}: any) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hover, setHover] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const contexMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contexMenuRef.current && !contexMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contexMenuRef]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(!showContextMenu);
    document.addEventListener('click', () => setShowContextMenu(false));
  };

  const handlePopUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };

  const handelOnMouseEnter = () => {
    setHover(true)
    setActiveColIndex(colIndex)
    setActiveRowIndex(rowIndex)
  }

  const handelOnMouseLeave = () => {
    setHover(false)
    setActiveColIndex(-1)
    setActiveRowIndex(-1)
  }

  return (
    <div className='relative'>
      <div
        className='relative'
        style={{ transform: `translate(${shift}px, ${shift * 4.5}px)` }}
      >
        <img
          src={hover ? yellowCube : cube}
          onContextMenu={handleContextMenu}
          onClick={handlePopUp}
          onMouseEnter={handelOnMouseEnter}
          onMouseLeave={handelOnMouseLeave}
          className='absolute z-10 top-0 left-2.5 inline'
        />
        <img src={rack} className='ml-2 mt-6 inline w-8 h-2' />

      </div>
      {showContextMenu && (
        <div
          ref={contexMenuRef}
          className=' absolute w-32 z-50 top-0 left-9 top-2 bg-transparent border p-2 rounded'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', transform: `translate(${shift}px, ${shift * 4.5}px)` }}
        >
          <button
            className='border-b border-gray-400 font-extralight'
            style={{ fontFamily: 'AcuminPro' }}
            onClick={() => {
              setSide('L');
              setShowContextMenu(false);
            }}
          >
            Left View
          </button>
          <button
            className='text[12px] font-extralight'
            style={{ fontFamily: 'AcuminPro' }}
            onClick={() => {
              setSide('R');
              setShowContextMenu(false);
            }}
          >
            Right View
          </button>
        </div>
      )}
      {showPopup && (
        <div
          ref={popupRef}
          className='absolute z-50 w-64 border text-[12px] font-extralight bg-transparent p-2 top-2 left-9 rounded'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', fontFamily: 'AcuminPro', transform: `translate(${shift}px, ${shift * 4.5}px)` }}
        >
          <p>Counter ID: 1001000001</p>
          {`Location ID: 2${side}-${String(3 - rowIndex + 1)}-${String(
            colIndex + 1
          ).padStart(3, '0')}-${String(4 - cubeIndex + 1)}`}
        </div>
      )
      }
    </div>
  );
};

export default SingleRack;