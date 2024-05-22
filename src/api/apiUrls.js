/* eslint-disable no-undef */
export const API_ENDPOINT = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `${API_ENDPOINT}/users/authenticate`;
export const LOGOUT_URL = `${API_ENDPOINT}/users/logout`;
export const CONTAINER_SERVICE_URL = `${API_ENDPOINT}/container/getContainerHierarchyDetails`;