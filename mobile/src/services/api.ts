import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:3333'
}) as AxiosInstance;

api.interceptors.response.use((response) => {
  console.log("INTERCEPTOR =>", response)
  return response
}, (error) => {
  console.log('INTERCEPTOR RESPONSE ERROR =>', error)
  return Promise.reject(error);
})

export { api }