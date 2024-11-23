import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Platform } from 'react-native'

import store from '~/redux/store'

export const BASE_URL =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.37:3000'

const headers = {
  'Content-Type': 'application/json',
  accept: '*/*'
}

export interface Response<T = any> {
  data?: T | null
  statusCode?: number
  message?: string
  result?: T
  path?: string
  success?: boolean,
  stylist?: []
}

export type MyResponse<T = any> = Promise<Response<T>>

class HttpClient {
  protected readonly axiosInstance: AxiosInstance

  public constructor () {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers,
      timeout: 15000
    })

    this._initializeResponseInterceptor()
  }

  private readonly _initializeResponseInterceptor = (): any => {
    this.axiosInstance.interceptors.request.use(
      async (config): Promise<any> => {
        const token = store.getState().auths.token
        config.headers.Authorization = `${token}`
        return config
      },
      (error) => {
        Promise.reject(error).catch((e) => {
          console.error(e)
        })
      }
    )

    this.axiosInstance.interceptors.response.use(
      (config) => {
        return config?.data
      },
      (error) => {
        let errorMessage = ''

        console.dir(error?.response?.data?.message)
        console.dir(error)

        if ((error?.message as string)?.includes('Network Error')) {
          errorMessage = 'Network Error'
        } else {
          errorMessage = error?.response?.data?.message ?? error?.message
          console.dir(errorMessage)
        }

        return {
          message: errorMessage,
          result: null,
          status: false
        }
      }
    )
  }

  public get = async <T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): MyResponse<T> => await this.axiosInstance.get(url, { params, ...config })

  public post = async <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): MyResponse<T> => await this.axiosInstance.post(url, data, { ...config })

  public put = async <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): MyResponse<T> => await this.axiosInstance.put(url, data, { ...config })

  public patch = async <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): MyResponse<T> => await this.axiosInstance.patch(url, data, { ...config })

  public delete = async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): MyResponse<T> => await this.axiosInstance.delete(url, { ...config })
}

export const request = new HttpClient()
