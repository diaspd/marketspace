import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:3333'
}) as AxiosInstance;

export { api }