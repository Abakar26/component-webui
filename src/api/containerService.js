/* eslint-disable no-undef */
//This Service is doing psot request to get Data from Backend about Conatainer
import axios from 'axios';
import { CONTAINER_SERVICE_URL } from './apiUrls';

export async function getContainerData() {

  try {
    const containerService = await axios.post(CONTAINER_SERVICE_URL, {
    });
    if (containerService.status == 200) {
      return containerService.data
    }
  } catch (error) {
    alert(error.response.data);
  }

}
