export interface IResponse<T> {
  status: string
  message: string
  data?: {
    items: T[]
    [key: string]: any
  }
}

export interface SeoOnPage {
  titleHead: string
  descriptionHead: string
  og_type: string
  og_image: string[]
}
