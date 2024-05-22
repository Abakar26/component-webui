/*These are two React components Button and PageButton.
 They both return a button element with some default styles and additional classes
  that can be passed through className prop.
 */
import React from 'react'
import { classNames } from './Utils'

export function Button({ children, className, ...rest }: any) {
  return (
    <button
      type="button"
      className={
        classNames(
          'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
          className
        )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton({ children, className, ...rest }: any) {
  return (
    <button
      type="button"
      className={
        classNames(
          'relative inline-flex items-center px-2 py-2 bg-white text-sm font-medium text-[#002B52] hover:bg-gray-50',
          className
        )}
      {...rest}
    >
      {children}
    </button>
  )
}
