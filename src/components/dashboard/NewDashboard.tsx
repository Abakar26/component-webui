// After Login success it rediect to this component wnich contain sideNav and Table Component
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Disclosure } from '@headlessui/react'
import logo from '../../images/svg/ias_logo_teal.svg'
import question from '../../images/svg/question.svg'
import bell from '../../images/svg/bell.svg'
import settings from '../../images/svg/setting.svg'
import exit from '../../images/svg/exits.svg'
import wright_arrow from '../../images/svg/warr_right.svg'
import { logoutUesr } from '../../api/LoginUser'
import { useTranslation } from 'react-i18next';
import Sidenav from '../UI/Sidenav'
import Table, { CheckBox, ExpandedRow, StatusPill } from '../UI/Table'
import React, { RefObject } from 'react'
import { useState, useRef, useEffect } from 'react';
import Loader from '../UI/Loader';
import Avatar from 'react-avatar';
import Location from '../UI/location/Location'
import View from '../ignition/view'
import { useKeycloak } from '@react-keycloak/web';
import KeycloakView from '../keycloak/view'


const getData = () => {
  // Define an array of data objects
  const data = [
    {
      mid_col_text: 'Text1',
      mid_col_float: '123456789',
      mid_col_date: '3/9/2023',
      mid_col_stat: 'Complete',
      mid_col_check: 'Active',
      right_col: 'Text',
      sub_module: SubRow
    },
    {
      mid_col_text: 'Text2',
      mid_col_float: '123456789',
      mid_col_date: '3/9/2023',
      mid_col_stat: 'Error',
      mid_col_check: 'Active',
      right_col: 'Text',
    },
    {
      mid_col_text: 'Text3',
      mid_col_float: '123456789',
      mid_col_date: '3/9/2023',
      mid_col_stat: 'Active',
      mid_col_check: 'nActive',
      right_col: 'Text',
    },
    {
      mid_col_text: 'Text4',
      mid_col_float: '123456789',
      mid_col_date: '3/9/2023',
      mid_col_stat: 'On Hold',
      mid_col_check: 'nActive',
      right_col: 'Text',
      sub_module: SubRow
    },
    {
      mid_col_text: 'Text5',
      mid_col_float: '123456789',
      mid_col_date: '3/9/2023',
      mid_col_stat: 'Inactive',
      mid_col_check: 'Active',
      right_col: 'Text',
    },
  ]
  return [...data, ...data, ...data]
}
// Define an array of data objects that will be used to render sub-rows
const SubRow = [
  {
    mid_col_text: 'sub Text 1',
    mid_col_float: '123456789',
    mid_col_date: '3/9/2023',
    mid_col_stat: 'Error',
    mid_col_check: 'Active',
    right_col: 'Text',
  },
  {
    mid_col_text: 'sub Text 2',
    mid_col_float: '123456789',
    mid_col_date: '3/9/2023',
    mid_col_stat: 'Active',
    mid_col_check: 'Active',
    right_col: 'Text',
  },
  {
    mid_col_text: 'sub Text 3',
    mid_col_float: '123456789',
    mid_col_date: '3/9/2023',
    mid_col_stat: 'Inactive',
    mid_col_check: 'nActive',
    right_col: 'Text',
  },
  {
    mid_col_text: 'sub Text 4',
    mid_col_float: '123456789',
    mid_col_date: '3/9/2023',
    mid_col_stat: 'Active',
    mid_col_check: 'nActive',
    right_col: 'Text',
  },
  {
    mid_col_text: 'sub Text 5',
    mid_col_float: '123456789',
    mid_col_date: '3/9/2023',
    mid_col_stat: 'On Hold',
    mid_col_check: 'Active',
    right_col: 'Text',
  },
]

// Define an array of language objects
const language = [{ code: 'en', country: 'English' }, { code: 'fr', country: 'Franch' }, { code: 'es', country: 'Spanish' },]

let randomColor: any = null;

function getRandomColor() {
  if (!randomColor) {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Construct the RGB color string
    randomColor = `rgb(${red}, ${green}, ${blue})`;
  }

  return randomColor;
}

export default function Example() {

  // Define state variables using the useState hook
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [sideNav, setSideNav] = useState('containers');
  const [subTitle, setSubTitle] = useState('Containers Overview')
  const [containerData, setContainerData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { keycloak } = useKeycloak();


  const token = JSON.parse(sessionStorage.getItem('token') || '{}')
  const userName = `${token.firstName}  ${token.lastName}`

  // Use the useTranslation hook to get access to the i18n object
  const { i18n } = useTranslation();

  // Create a reference to the dropdown element using the useRef hook
  const dropDownRef: RefObject<HTMLDivElement> = useRef(null);

  const logoutKeyCloak = () => {
    sessionStorage.clear()
    keycloak.logout()
  }


  // Define a useEffect hook that listens for clicks outside the dropdown element
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // If the click was not inside the dropdown element, close the dropdown and its sub-menu
      if (!dropDownRef.current?.contains(event.target)) {
        setOpen(false);
        setOpenSubMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: any) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString(undefined, options).replace(/,/g, '');
  };

  // Define the columns for the data table using the useMemo hook
  const columns = React.useMemo(() => [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ExpandedRow
    },
    {
      Header: 'Mid col text',
      accessor: 'mid_col_text',
    },
    {
      Header: 'Mid col float',
      accessor: 'mid_col_float',
    },
    {
      Header: 'Mid col date',
      accessor: 'mid_col_date',
    },
    {
      Header: 'Mid col stat',
      accessor: 'mid_col_stat',
      Cell: StatusPill
    },
    {
      Header: 'Mid col check',
      accessor: 'mid_col_check',
      Cell: CheckBox,
    },
    {
      Header: 'Right col',
      accessor: 'right_col',
    },
  ], [])

  const containerColumns = React.useMemo(() => [
    {
      Header: 'Container LPN',
      accessor: 'containerLpn',
    },
    {
      Header: 'Container Type',
      accessor: 'containerType',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: StatusPill
    },
    {
      Header: 'Created By',
      accessor: 'createdBy',
    },
    {
      Header: 'Created Date',
      accessor: 'createdDate',
    },
    {
      Header: 'Updated Date',
      accessor: 'updatedDate',
    },
  ], [])

  // Define a callback function that renders the sub-component of a row
  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => (
      // Use the SubRow data to render the sub-component
      <>
        {SubRow.map((value, index) => {
          return (
            <tr className='text-xs text-[#002B52] font-normal' key={index}>
              <td className='px-6 py-4 whitespace-nowrap'></td>
              <td className='px-6 py-4 whitespace-nowrap pl-10'>{value.mid_col_text}</td>
              <td className='px-6 py-4 whitespace-nowrap text-right'>{value.mid_col_float}</td>
              <td className='px-6 py-4 whitespace-nowrap text-right'>{value.mid_col_date}</td>
              <td className='px-6 py-4 whitespace-nowrap'><StatusPill value={value.mid_col_stat} /></td>
              <td className='px-6 py-4 whitespace-nowrap flex justify-center'>{<CheckBox />}</td>
              <td className='px-6 py-4 whitespace-nowrap pl-10'>{value.right_col}</td>
            </tr>
          )
        })}
      </>
    ),
    []
  )

  // Define the data for the data table using the useMemo hook
  const data = React.useMemo(() => getData(), [])

  // Use the useTranslation hook to get access to the t function
  const { t } = useTranslation();

  // Render the component
  return (
    <>
      <div className='flex w-full'>
        <div className='max-w-[216px] w-full bg-[#002040] min-h-screen pl-5 pt-12'>
          <Sidenav setSideNav={setSideNav} setSubTitle={setSubTitle} setContainerData={setContainerData} setLoader={setLoader} />
        </div>
        <div className='w-full pl-6 pt-12'>
          <Disclosure as='nav' className='mb-[115px]'>
            {() => (
              <>
                <div className='max-w-[95%]'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col pl-3'>
                      <p className='text-[24px] text-[#ABC2CF] leading-[29px] font-extralight capitalize tracking-[-0.02em] mb-3'
                        style={{ fontFamily: 'AcuminProWideLight' }}
                      >{sideNav}</p>
                      <p className='text-[24px] text-[#002040] leading-7 font-normal capitalize'>{subTitle}</p>
                    </div>
                    <div className='flex relative'>
                      {/* <input
                        id='search'
                        name='search'
                        type='text'
                        className='w-[216px] h-[24px] text-[12px] mr-4 pt-1 rounded-md border-0 px-[6px] text-[#002B52] ring-1 ring-inset ring-[#002B52] placeholder:text-[#002B52] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#002B52] sm:text-sm sm:leading-6'
                        placeholder='Search'
                      />
                      <div className='w-6 h-6 border-[1px] border-[#002040] items-center rounded-[5px] flex justify-center mr-4 cursor-pointer'>
                        <img
                          src={question}
                          alt='question icon'
                        />
                      </div>
                      <div className='w-6 h-6 border-[1px] border-[#002040] items-center rounded-[5px] flex justify-center mr-4 cursor-pointer'>
                        <img
                          src={bell}
                          alt='bell icon'
                        />
                      </div> */}
                      <div
                        ref={dropDownRef}
                      >
                        <Avatar
                          name={keycloak.authenticated ? keycloak.idTokenParsed?.name : userName}
                          size='24'
                          textSizeRatio={2}
                          className='rounded-[5px] cursor-pointer pt-[2px]'
                          color={getRandomColor()}
                          onClick={() => setOpen(!open)}
                        />
                        {open &&
                          <div className='flex flex-col absolute pt-3 pl-3 top-[32px] right-0 rounded border-[1px] border-[#002040] w-[180px]'
                          >
                            <p className='text-[#002040] text-[12px] leading-[14px] font-semibold capitalize mb-2'>{keycloak.authenticated ? keycloak.idTokenParsed?.name : userName}</p>
                            <div className='flex mb-2 items-end cursor-pointer'>
                              <img src={settings} className='mr-2' alt='setting icon' />
                              <p className='text-[#002040] text-[12px] leading-[14px] font-normal' style={{ fontFamily: 'AcuminProRegular' }}>Settings</p>
                            </div>
                            <div className='flex mb-2 items-end cursor-pointer'
                              onClick={() => { keycloak.authenticated ? logoutKeyCloak() : logoutUesr() }}
                            >
                              <img src={exit} className='mr-2' alt='exit icon' />
                              <p className='text-[#002040] text-[12px] leading-[14px] font-normal' style={{ fontFamily: 'AcuminProRegular' }}>Sign Out</p>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          {/* <div className='border-[1px] border-[#EBF2F2] rounded-[10px] px-3 py-3 border-solid max-w-[95%]'> */}
          {/* {sideNav == 'hosts' &&
            <div className='border-[1px] border-[#EBF2F2] rounded-[10px] px-3 py-3 border-solid max-w-[95%]'>
              <Table columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
            </div>
          } */}
          {sideNav == 'containers' &&
            (loader ?
              <div className='flex items-center h-full'>
                <Loader />
              </div> : <div className='border-[1px] border-[#EBF2F2] rounded-[10px] px-3 py-3 border-solid max-w-[95%]'>
                <Table columns={containerColumns} data={containerData} renderRowSubComponent={renderRowSubComponent} sideNav={sideNav} /></div>
            )}

          {
            sideNav == 'locations' && <div className='border-[1px] border-[#EBF2F2] rounded-[10px] py-3 border-solid max-w-[95%]'> <Location /> </div>
          }
          {sideNav == 'views' &&

            <View />
          }
          {sideNav == 'keycloak' &&

            <KeycloakView />
          }

          {/* </div> */}
          <div className='flex w-full mt-6 pl-3'>
            <p className='text-[12px] leading-[14px] text-[#ABC2CF] mr-[89px]'
              style={{ fontFamily: 'AcuminProRegular' }}
            >©2023 Adaptec Solutions</p>
            <a href='#' className='text-[12px] leading-[14px] text-[#ABC2CF]'
              style={{ fontFamily: 'AcuminProRegular' }}
            >www.adaptecsolutions.com</a>
          </div>
        </div>
      </div>
    </>
  )
}