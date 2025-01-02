import axios, { AxiosInstance } from "axios";
import config from "@/utils/config";

const API_TOKEN = config.API_TOKEN;
const BASE_API_URL = config.NEXT_PUBLIC_API_URL;

export const strapi: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
