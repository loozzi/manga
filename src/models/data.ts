import { Category } from './category'
import { Params } from './pagination'
import { SeoOnPage } from './response'

export interface Chapter {
  filename: string
  chapter_name: string
  chapter_title: string
  chapter_api_data: string
}

export interface Data {
  seoOnPage: SeoOnPage
  items: Item[]
  params: Params
  type_list: string
  APP_DOMAIN_CDN_IMAGE: string
  breadCrumb?: any[]
  APP_DOMAIN_FRONTEND?: string
  item?: Item
}

export interface Item {
  _id: string
  name: string
  slug: string
  origin_name: string[]
  status: string
  thumb_url: string
  sub_docquyen: boolean
  category: Category[]
  updatedAt: string
  chaptersLatest?: Chapter[]
  chapters?: Server[]
  content?: string
  author?: string[]
}

export interface Server {
  server_name: string
  server_data: Chapter[]
}

export interface ChapterImage {
  image_page: number
  image_file: string
}

export interface ChapterData {
  _id: string
  comic_name: string
  chapter_name: string
  chapter_title: string
  chapter_path: string
  chapter_image: ChapterImage[]
}

export interface ChapterResponse {
  domain_cdn: string
  item: ChapterData
}
