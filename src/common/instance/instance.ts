import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true,
      headers: {
         "API-KEY": `${process.env.REACT_APP_API_KEY}`,
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
    }
  })
  