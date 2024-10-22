import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
      "API-KEY": "87554104-bc93-42be-bdbe-8201f181e1db",
    },
  })