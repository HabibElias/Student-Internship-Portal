import axios from "axios";

const url: string = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: url,
});

export const axiosPrivate = axios.create({
  baseURL: url,
});
