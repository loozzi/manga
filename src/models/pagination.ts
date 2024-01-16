export interface Params {
  type_slug?: string
  filterCategory?: any[]
  sortField?: string
  pagination?: PaginationModel
  itemsUpdateInDay?: number
}

export interface PaginationModel {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  pageRanges: number
}
