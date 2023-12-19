import { DOMAIN } from '@env/env.d.ts'
import axios, { type Axios, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export const baseURL = `${DOMAIN}/api`

export const createAPI = (contentType?: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': contentType ? contentType : 'application/json'
    }
  })

  return api
}

export const getResponseData = <T>(response: AxiosResponse<T>): T => response.data

export const getHttpWrapper = (axiosInstance: Axios) => {
  return {
    get: <Res>(url: string, config?: AxiosRequestConfig) =>
      axiosInstance.get<Res>(url, config).then(getResponseData),
    post: <Res, Req = unknown>(url: string, body?: Req) =>
      axiosInstance.post<Res>(url, body).then(getResponseData)
  }
}

export const httpRequest = (contentType?: string) => getHttpWrapper(createAPI(contentType))
