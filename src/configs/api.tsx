import axios, { AxiosResponse } from 'axios'
import { Category } from '~/models/category'
import { ChapterResponse, Data } from '~/models/data'
import { IResponse } from '~/models/response'

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
  getByType: async (page: Number, type: string) => {
    const pageNum: Number = page || 1
    const response: IResponse<Data> = await request.get(type, {
      params: {
        page: pageNum
      }
    })
    return response.status === 'success' ? response.data : {}
  },
  getDetail: async (slug: string) => {
    const response: IResponse<Data> = await request.get(`/truyen-tranh/${slug}`)
    return response.status === 'success' ? response.data : {}
  },
  getChapter: async (chapter: string) => {
    const response: IResponse<ChapterResponse> = (
      await axios.get(`https://sv1.otruyencdn.com/v1/api/chapter/${chapter}`)
    ).data
    return response.status === 'success' ? response.data : {}
  },
  search: async (search: string) => {
    const response: IResponse<any> = await request.get('/tim-kiem', {
      params: {
        keyword: search
      }
    })

    return response.status === 'success' ? response.data : {}
  }
}

export default api
