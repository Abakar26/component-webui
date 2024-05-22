// After Login success it rediect to this component wnich contain sideNav and Table Component
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Disclosure } from '@headlessui/react'
import logo from '../../images/svg/ias_logo_teal.svg'
import question from '../../images/svg/question.svg'
import bell from '../../images/svg/bell.svg'
import settings from '../../images/svg/settings.svg'
import exit from '../../images/svg/exit.svg'
import wright_arrow from '../../images/svg/warr_right.svg'
import { logoutUesr } from '../../api/LoginUser'
import { useTranslation } from 'react-i18next';
import Sidenav from '../UI/Sidenav'
import Table, { CheckBox, ExpandedRow, StatusPill } from '../UI/Table'
import React, { RefObject } from 'react'
import { useState, useRef, useEffect } from 'react';
import Loader from '../UI/Loader'
import { useKeycloak } from '@react-keycloak/web';


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

export default function Example() {

  // Define state variables using the useState hook
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [sideNav, setSideNav] = useState('hosts');
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
      Header: 'Container Lpn',
      accessor: 'containerLpn',
    },
    {
      Header: 'Container Type',
      accessor: 'containerType',
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
      Header: 'UpdatedDate',
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
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap pl-10">{value.mid_col_text}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{value.mid_col_float}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{value.mid_col_date}</td>
              <td className="px-6 py-4 whitespace-nowrap"><StatusPill value={value.mid_col_stat} /></td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-center">{<CheckBox />}</td>
              <td className="px-6 py-4 whitespace-nowrap pl-10">{value.right_col}</td>
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
      <div className="min-h-full px-4 py-4">
        <Disclosure as="nav" className="bg-[#20ECF6] mb-1 rounded-lg">
          {() => (
            <>
              <div className="max-w-[90%] px-4 pb-[10px] pt-[22px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                  </div>
                  <div className='flex relative'>
                    <input
                      id="search"
                      name="search"
                      type="text"
                      className="w-[208px] h-[24px] mr-4 pt-1 rounded border-0 bg-[#20ECF6] px-[6px] text-[#002B52] ring-1 ring-inset ring-[#002B52] placeholder:text-[#002B52] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#002B52] sm:text-sm sm:leading-6"
                      placeholder="Search"
                    />
                    <img
                      src={question}
                      className="mr-4 cursor-pointer"
                      alt="question icon"
                    />
                    <img
                      src={bell}
                      className="mr-4 cursor-pointer"
                      alt="bell icon"
                    />
                    <div
                      ref={dropDownRef}
                    >
                      <img
                        src={settings}
                        className="mr-4 cursor-pointer"
                        alt="settings icon"
                        onClick={() => setOpen(!open)}
                      />
                      {open &&
                        <div className='flex flex-col absolute px-1 py-1 top-[32px] right-[-4.25rem] rounded bg-[#002B52] divide-y divide-gray-20'
                        >
                          <span className='px-2 py-2 cursor-pointer flex items-baseline mr-2 text-[#ffffff]'
                            onClick={() => { setOpenSubMenu(!openSubMenu) }}
                          >Languages <img src={wright_arrow} className='w-3 h-3' alt='arrow' /></span>
                          {openSubMenu &&
                            <div className='flex flex-col absolute px-2 py-2 top-[-1px] right-[-96px] bg-[#002B52] divide-y divide-gray-20'
                            >
                              {language.map((lang) => {
                                return (
                                  <span
                                    className='px-2 py-2 cursor-pointer text-[#ffffff] hover:text-[#ffffff]'
                                    onClick={() => { i18n.changeLanguage(lang.code); }}
                                  >{lang.country}</span>
                                )
                              })}
                            </div>}
                        </div>
                      }
                    </div>
                    <img
                      src={exit}
                      className="cursor-pointer"
                      alt="exit icon"
                      onClick={() => { keycloak.authenticated ? keycloak.logout() : logoutUesr }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <div className="bg-[#002B52] rounded mb-4">
          <div className="max-w-[90%] pl-4 py-[6px] text-xs text-[#ffffff] font-bold flex justify-between pr-[74px] lowercase">
            <p>{`${t('start_header').toLowerCase()} > ${sideNav}`}</p>
            <div className='flex'>
              <p className='mr-[78px] uppercase'>{formatDate(currentDateTime)}</p>
              <p className='capitalize'>{`${t('user')}: ${userName}`}</p>
            </div>
          </div>
        </div>
        <div className='flex w-full'>
          <div className='max-w-[17%] w-ful'>
            <Sidenav setSideNav={setSideNav} setContainerData={setContainerData} setLoader={setLoader} />
          </div>
          <div className='w-full'>
            {sideNav == 'hosts' && <Table columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />}
            {sideNav == 'containers' &&
              (loader ?
                <div className='flex items-center h-full'>
                  <Loader />
                </div> :
                <Table columns={containerColumns} data={containerData} renderRowSubComponent={renderRowSubComponent} sideNav={sideNav} />
              )}
          </div>
        </div>
      </div>
    </>
  )
}