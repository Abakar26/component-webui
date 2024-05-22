import Iframe from 'react-iframe';
import mykeycloak from '../../Keycloak';

const KeycloakView = () => {
  const ifram_url = process.env.REACT_APP_IFRAME_URL;
  return (
    <div className='border-[1px] border-[#EBF2F2] rounded-[10px] px-3 py-3 border-solid max-w-[95%] h-[600px] flex flex-col'>
      <p className=' font-semibold text-[18px] text-[#002040] mb-3'>Keycloak Admin Console</p>
      <iframe
        // url='https://www.youtube.com/watch?v=843nec-IvW0'
        src="http://localhost:8080"
        width="95%"
        id="myId"
        className="myClassname"
        height="531px"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  )
}

export default KeycloakView;