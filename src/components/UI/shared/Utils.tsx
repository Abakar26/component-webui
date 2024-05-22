/*
This is a function called classNames that accepts any number of arguments (using the rest parameter syntax), 
and returns a string containing only the truthy arguments, separated by spaces.
 */
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}