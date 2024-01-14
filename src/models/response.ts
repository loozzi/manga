export interface IResponse<T> {
  status: string
  message: string
  data?: {
    items: T[]
    [key: string]: any
  }
}

export interface Category {
  _id: string
  slug: string
  name: string
}

export interface SeoOnPage {
  titleHead: string
  descriptionHead: string
  og_type: string
  og_image: string[]
}

export interface ChaptersLatest {
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
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}
export interface Params {
  type_slug: string
  filterCategory: any[]
  sortField: string
  pagination: Pagination
  itemsUpdateInDay: number
}
export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  pageRanges: number
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
  chaptersLatest: ChaptersLatest[]
}
