import { AxiosRequestConfig, AxiosResponse } from "axios"

import axiosInstance from "@/config/axios"
import { RESPONSE_CODE } from "@/constants/HTTPResponseStatus"
import { globalModal } from "@/components/Modals/GlobalModal"

interface RequestConfig extends AxiosRequestConfig {
  contentType: string
}

interface FetchParams {
  url: string
  config: AxiosRequestConfig
  contentType?: string
  useGeneralErrorHandlding?: boolean
}

class ApiUtil {

  async onError(response: AxiosResponse) {
    const { data: responseData } = response

    switch (responseData.status) {
      case RESPONSE_CODE.UNAUTHORIZE:
        break

      case RESPONSE_CODE.FORBIDDEN:
        break

      case RESPONSE_CODE.CONTENT_TOO_LARGE:
        break
      case 500:
      case 404:
        globalModal.open({
          title: 'Lỗi hệ thống ! Hãy thử lại sau.',
          children: undefined
        })
        break
      default:

    }
  }

  async configRequest(config: RequestConfig) {
    const {
      method = "POST",
      timeout = 3000,
      headers = {},
      contentType,
      url,
      data
    } = config

    return {
      url,
      method,
      timeout,
      data,
      headers: {
        ...headers,
        "Content-Type": contentType,
        // "Access-Control-Allow-Origin" : "*",
        // Authorization: "Bearer Token...",
      },
    }
  }

  async fetch(params: FetchParams) {
    const {
      url,
      config,
      contentType = "application/json",
      useGeneralErrorHandlding = true
    } = params

    try {
      const requestConfig = await this.configRequest({
        ...config,
        contentType,
        url,
      })
      console.log('config ', requestConfig)
      const response = await axiosInstance(requestConfig)

      if (response.data.status !== RESPONSE_CODE.SUCCESS && useGeneralErrorHandlding) this.onError(response)
      return response
    } catch (error) { }
  }
}

export default new ApiUtil()
