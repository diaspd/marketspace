import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: 'http://172.25.160.1:3333'
}) as AxiosInstance;

api.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
})

export { api }