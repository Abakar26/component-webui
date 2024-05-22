/* eslint-disable no-undef */
import axios from 'axios';
import { LOGIN_URL, LOGOUT_URL } from './apiUrls';

// This function sends a POST request to the API_ENDPOINT with the given email and password.
// If the request is successful (status code 200), it saves the returned user data to session storage
// and returns true. Otherwise, it alerts the error message and returns false.
export async function loginUser(email, password) {

  try {
    const user = await axios.post(LOGIN_URL, {
      email: email,
      password: password
    });
    if (user.status == 200) {
      sessionStorage.setItem('token', JSON.stringify(user.data))
      return true;
    }
  } catch (error) {
    alert(error.response.data);
    return false;
  }

}

//This Function is used to flush your session that is created after login
export async function logoutUesr() {
  try {
    const token = JSON.parse(sessionStorage.getItem('token') || '{}');
    const user = await axios.delete(LOGOUT_URL, {
      headers: {
        Authorization: `Bearer ${token.jwt}`
      }
    });
    if (user.status == 200) {
      sessionStorage.clear();
      location.reload();
    }
  } catch (error) {
    alert(error.response.data);
  }

}