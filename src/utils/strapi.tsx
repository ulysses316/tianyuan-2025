import axios, { AxiosInstance } from "axios";

const API_TOKEN = process.env.API_TOKEN;
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const strapi: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
