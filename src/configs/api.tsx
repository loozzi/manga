import axios, { AxiosResponse } from 'axios'

import { IResponse, Category, Data } from '~/models/response'

const request = axios.create({
  baseURL: 'https://otruyenapi.com/v1/api'
})

request.interceptors.response.use(
  function (resp: AxiosResponse) {
    return resp.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

const api = {
  getCategories: async () => {
    const response: IResponse<Category> = await request.get('/the-loai')
    return response.status === 'success' ? response.data?.items : []
  },
  getHome: async (page: Number) => {
    const pageNum: Number = page || 1
    const response: IResponse<Data> = await request.get('/home', {
      params: {
        page: pageNum
      }
    })
    return response.status === 'success' ? response.data : {}
  }
}

export default api
