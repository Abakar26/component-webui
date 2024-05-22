//This is login component that take and email and password on successfull redirect to main page Otherwise it pop down a invalid message
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import adaptecLogo from '../../images/svg/adaptec.svg'
import { loginUser } from '../../api/LoginUser';
import { useTranslation } from 'react-i18next';
import iasLogin from '../../images/svg/login-ias-logo.svg'
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
// import { googleClientId } from '../../oauthConfig';
import { useKeycloak } from '@react-keycloak/web';

// Define a Login component that takes a `setToken` prop
const Login = ({ setToken }: any) => {
  // Define state variables using the useState hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { keycloak } = useKeycloak();

  // Get the i18n object to translate strings
  const { t } = useTranslation();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  // Handle the form submission
  const handleSubmit = async () => {
    setLoading(true);
    const response = await loginUser(email, password);
    setToken(response); // Set the token in state using the setToken prop passed down from the parent component
    setEmail(''); // Clear the email input field
    setPassword(''); // Clear the password input field
    setLoading(false); // Set loading state to false
  }

  // Render the login form
  return (
    <div className="min-h-screen flex bg-custom-image bg-cover bg-no-repeat pr-[72px] xl:pr-[144px]">
      <div className="flex justify-end w-full">
        <div className='flex xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[90%] w-[95%] min-h-screen'>
          <div className='flex w-full flex-col'>
            <div className='flex w-full justify-end'>
              <img className='mb-[218px] mt-[111px] w-[180px] h-[33px]' src={adaptecLogo} alt="ias logo" />
            </div>
            <div className='flex w-full justify-between'>
              <img className='w-[172px] h-[108px]' src={iasLogin} alt="ias logo" />
              <div className='flex flex-col items-end w-full mt-8'>
                <div className='flex items-end w-full justify-between max-w-[290px] mb-5'>
                  <label htmlFor="remember-me" className="text-[12px] leading-[14px] font-bold text-[#ffffff]">
                    {t('username')}
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    className="relative block bg-transparent w-full max-w-[180px] rounded-[5px] border-0 px-3.5 mt-2 bg-[#002B52] md:text-[12px]
                     text-[#ffffff] ring-1 ring-inset ring-[#ffffff]
                      placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#002B52] sm:text-sm sm:leading-6"
                    placeholder=""
                    onChange={(event) => { setEmail(event.target.value) }}
                    style={{ fontFamily: 'AcuminProRegular' }}
                  />
                </div>
                <div className='flex items-end w-full justify-between max-w-[290px] mb-10'>
                  <label htmlFor="remember-me" className="text-[12px] leading-[14px] font-bold text-[#ffffff]">
                    {t('password')}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    className="relative block bg-transparent w-full max-w-[180px] rounded-[5px] border-0 px-3.5 mt-2 md:text-[12px]
                     bg-[#002B52] text-[#ffffff] ring-1 ring-inset ring-[#ffffff] placeholder:text-gray-400
                      focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#002B52] sm:text-sm sm:leading-6"
                    placeholder=""
                    onChange={(event) => { setPassword(event.target.value) }}
                  />
                </div>
                {/* <div className="mb-[44px] pr-2">
                  <a href="#" className="text-[11px] leading-[1.25rem] font-medium text-[#ffffff] text-center">
                    {t('forgot_password')}
                  </a>
                </div> */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`flex w-full max-w-[180px] justify-center rounded-md bg-[#06ebf7] py-1 text-[12px] leading-[16px] font-bold text-[#002b51] hover:bg-[#002b51] hover:text-[#06ebf7] mb-5
               ${loading && 'bg-[#002b51] text-[#002b51] hover:bg-[#002b51] hover:text-[#06ebf7]'}`}
                  disabled={loading}
                >
                  {`${t('login')}${loading ? '...' : ''}`}
                </button>
                <button
                  type="button"
                  onClick={() => { keycloak.login(); }}
                  className={'flex w-full max-w-[180px] justify-center rounded-md bg-[#06ebf7] py-1 text-[12px] leading-[16px] font-bold text-[#002b51] hover:bg-[#002b51] hover:text-[#06ebf7] mb-5'}
                >
                  Keycloak Login
                </button>
                {/* <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse.credential);
                      sessionStorage.setItem('token', JSON.stringify(credentialResponse.credential))
                      setToken(true)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                      setToken(false)
                    }}
                    useOneTap
                  />
                </GoogleOAuthProvider> */}
              </div>
            </div>
            <div className='flex w-full justify-between pr-3 mt-[207px]'>
              <p className='text-[14px] leading-[16.8px] text-[#ffffff]' style={{ fontFamily: 'AcuminProRegular' }}>©2023 Adaptec Solutions</p>
              <a href="#" className='text-[14px] leading-[16.8px] text-[#ffffff]' style={{ fontFamily: 'AcuminProRegular' }}>www.adaptecsolutions.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
