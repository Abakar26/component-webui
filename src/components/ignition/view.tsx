import Iframe from 'react-iframe';

const View = () => {
  const ifram_url = process.env.REACT_APP_IFRAME_URL;
  console.log(ifram_url)
  return (
    <div className='border-[1px] border-[#EBF2F2] rounded-[10px] px-3 py-3 border-solid max-w-[95%] h-[600px] flex flex-col'>
      <p className=' font-semibold text-[18px] text-[#002040] mb-3'>Palletization</p>
      <Iframe url={ifram_url || ''}
        width="95%"
        id="myId"
        className="myClassname"
        height="531px"
      />

    </div>
  )
}

export default View;