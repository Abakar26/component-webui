//This component has x-axis indexing of rack view
const LastRow = ({ activeColIndex }: any) => {
  return (
    <div className="flex">
      <div className="h-24 w-11 flex justify-center"></div>
      <div className="flex ml-4">
        {Array.from({ length: 24 }, (_, colIndex) => (
          <div
            key={colIndex}
            className="h-20 w-11 flex justify-start"
          >
            <p
              className={`text-[#002040] text-[12px] ${colIndex == activeColIndex ? 'font-bold' : 'font-extralight'}`}
              style={{ fontFamily: 'AcuminProLight' }}
            >
              {String(colIndex + 1).padStart(3, '0')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LastRow;
