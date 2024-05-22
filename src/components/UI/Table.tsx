//This is the Table Component that is render in Dashbaord Component
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
// @ts-ignore
import React, { useState, Fragment } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination, useExpanded } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, PageButton } from './shared/Button'
import { classNames } from './shared/Utils'
import { SortIcon, SortUpIcon, SortDownIcon } from './shared/Icons'
import right_arrow from '../../images/svg/arr_right.svg'
import './table.css'
import { useTranslation } from 'react-i18next'
import { faBackward, faCaretLeft, faCaretRight, faForward } from '@fortawesome/free-solid-svg-icons'
import dropDown from '../../images/svg/tableDopDown.svg';

//This function perforn the Search in table
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  sideNav
}: any) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const { t } = useTranslation();

  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className='flex flex-col w-[92.3%] mb-12'>
      <span className='text-[18px] leading-[22px] mb-3 font-normal text-[#002040]'>{sideNav == 'containers' ? 'Containers List' : t('overview_page')}</span>
      <div className='flex justify-end'>
        <input
          id="search"
          name="search"
          type="text"
          value={value || ''}
          className="w-full max-w-[216px] text-[12px] font-extralight leading-[11px] h-[24px] rounded-md border-gray-300 bg-[#ffffff] px-[6px]
           text-[#002B52] ring-[0.5px] ring-inset ring-[#002B52] placeholder:text-[#002B52] focus:outline-none focus:ring-1
            focus:ring-inset focus:ring-[#002B52] sm:text-sm sm:leading-6 placeholder:text-[12px] placeholder:font-thin placeholder:leading-[11px]"
          placeholder="Search"
          style={{ fontFamily: 'AcuminProRegular' }}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  )
}

//This function is used for status colum styling
export function StatusPill({ value }: any) {
  const status = value ? value.toLowerCase() : 'unknown';

  return (
    <span
      className={
        classNames(
          'pl-3 py-1 capitalize leading-wide font-bold text-xs shadow-sm rounded',
          status.startsWith('complete') ? 'bg-[#00DD00] text-[#ffffff] pr-[39px]' : null,
          status.startsWith('error') ? 'bg-[#FF0000] text-[#ffffff] pr-[67px]' : null,
          status.startsWith('active') ? 'bg-[#20ECF6] text-[#ffffff] pr-[59px]' : null,
          status.startsWith('inactive') ? 'bg-[#ABC2CF] text-[#ffffff] pr-[50px]' : null,
          status.startsWith('on hold') ? 'bg-[#FFDD00] text-[#002B52] pr-[47.5px]' : null,

        )
      }
      style={{ fontFamily: 'AcuminProRegular' }}
    >
      {status}
    </span>
  );
}

//This function is used for Extended row Functionality
export function ExpandedRow({ row, totoggle, setTotoggle, id }: any) {
  const handleChange = (id: any) => {
    if (totoggle.includes(id)) {
      setTotoggle((prev: any) => {
        return [
          ...prev.filter((item: any) => item !== id)
        ]
      })
    } else {
      setTotoggle([...totoggle, id]);
    }
  }
  return (
    <>
      {row.original?.sub_module !== undefined &&
        <span onClick={() => { handleChange(id) }} className="cursor-pointer">
          {totoggle.includes(id) ? <SortDownIcon className="w-3 h-3 text-[#002B52]" /> : <img src={right_arrow} className='w-3 h-3' alt='arrow' />}
        </span>}
    </>
  );
}

//This function is used for checkbox colum styling
export function CheckBox({ value }: any) {
  const status = value ? value.toLowerCase() : 'unknown';
  const [checked, setChecked] = useState(status == 'active')

  return (
    <div className='w-4 h-4 border-[2px] border-[#002B52] rounded border-solid cursor-pointer flex justify-center items-center'
      onClick={() => { setChecked(!checked) }}
    >
      {checked && <div className='w-2 h-2 bg-[#002B52] rounded-sm'>
      </div>}
    </div>
  );
}

const formatter = (dateValue: string | number | Date) => {
  const date = new Date(dateValue);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}/${date
        .getFullYear()
        .toString()
        .slice(2, 4)} ${(date.getHours() % 12)
          .toString()
          .padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${date
              .getSeconds()
              .toString()
              .padStart(2, '0')}.${date
                .getMilliseconds()
                .toString()
                .padStart(3, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

  return formattedDate;
};

function Table({ columns, data, renderRowSubComponent, sideNav }: any) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 10 }
  },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,  // new
  )

  const [activeIndex, setActiveIndex] = useState([-1]);
  const [toggle, setToggle] = useState(true);
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // Render the UI for your table
  return (
    <>
      <div className="sm:flex sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          sideNav={sideNav}
        />
      </div>
      {/* <div className='flex'>
        <div className={`${toggle ? 'bg-[#002B52] text-[#20ECF6]' : 'bg-[#FAFBFC] text-[#ABC2CF]'} px-4 py-[10px] cursor-pointer items-center font-semibold text-xs flex justify-center rounded-t-lg`}
          onClick={() => { setToggle(true) }}>
          {t('Selected_Tab')}
        </div>
        <div className={`${toggle ? 'bg-[#FAFBFC] text-[#ABC2CF]' : ' bg-[#002B52] text-[#20ECF6]'} px-4 py-[10px] cursor-pointer items-center font-semibold text-xs flex justify-center rounded-t-lg`}
          onClick={() => { setToggle(false) }}
        >
          {t('Unselected_Tab')}
        </div>
      </div> */}
      <div className="flex flex-col mb-14">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block w-full rounded-lg">
            <div className="shadow overflow-hidden border-[1px] border-[#EBF2F2] sm:rounded-lg">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#002B52]">
                  {/* Mapping the data in Table Colum Header */}
                  {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[] }) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="text-[#20ECF6] text-xs">
                      {headerGroup.headers.map((column: { getHeaderProps: (arg0: any) => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; getSortByToggleProps: () => any; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; isSorted: any; isSortedDesc: any; id: any }) => (
                        <th
                          scope="col"
                          className={`py-3 text-left text-[12px] leading-[11px] font-semibold text-[#20ECF6] tracking-wider ${column.id == 'mid_col_check' ? 'w-[150px] px-4' : 'px-6'} `}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex items-center justify-between">
                            {column.render('Header')}
                            {column?.id !== 'expander' &&
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? <SortDownIcon className="w-4 h-4 text-[#20ECF6]" />
                                    : <SortUpIcon className="w-4 h-4 text-[#20ECF6]" />
                                  : (
                                    <SortIcon className="w-4 h-4 text-[#20ECF6]" />
                                  )}
                              </span>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* Mapping the data in Table Colum */}
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200 "
                >
                  {page.map((row, i) => {  // new
                    prepareRow(row)
                    return (
                      <Fragment {...row.getRowProps()}>
                        <tr >
                          {row.cells.map((cell: any) => {
                            return (
                              < td
                                {...cell.getCellProps()}
                                className={`px-6 py-3 whitespace-nowrap ${cell.column.Cell.name == 'CheckBox' && 'flex justify-center'}
                                ${cell.column.id == 'mid_col_float' && 'text-right'} ${cell.column.id == 'mid_col_date' && 'text-right'}`}
                              >
                                <div className="text-xs text-[#002B52] font-[12px] leading-[11px]"
                                  style={{ fontFamily: 'AcuminProRegular' }}
                                >
                                  {(cell.column.id == 'createdDate' || cell.column.id == 'updatedDate') ? formatter(cell.value) : cell.render('Cell')}</div>

                              </td>
                            )
                          })}
                        </tr>
                        {activeIndex.includes(i) && renderRowSubComponent({ row })}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Here is the pagination work performed */}
      <div className="flex items-center justify-between max-w-[95%]">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline space-x-16 md:space-x-10 lg:space-x-5 xl:space-x-20">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
            </span>
            <div className='flex pl-10 md:pl-10 lg:pl-10 xl:pl-28 gap-x-10 items-baseline'>
              <span className='text-sm text-gray-700'>Display</span>
              <label>
                <div
                  className="dropdown"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="dropdown-button">
                    <div className='flex gap-2'>
                      {state.pageSize}
                      <img src={dropDown} alt='image' />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      {[10, 25, 50].map(option => (
                        <div
                          key={option}
                          className="dropdown-item"
                          onClick={() => setPageSize(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <FontAwesomeIcon icon={faBackward} className="h-3 w-3 text-[#002040]" />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <FontAwesomeIcon icon={faCaretLeft} className="h-4 w-4 text-[#002040]" />
              </PageButton>
              <PageButton
                onClick={() => nextPage()}
                disabled={!canNextPage
                }>
                <span className="sr-only">Next</span>
                <FontAwesomeIcon icon={faCaretRight} className="h-4 w-4 text-[#002040]" />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <FontAwesomeIcon icon={faForward} className="h-3 w-3 text-[#002040]" />
              </PageButton>
            </nav>
          </div>
        </div >
      </div >
    </>
  )
}

export default Table;