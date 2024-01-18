const routes = {
  PUBLIC: '/*',
  PRIVATE: '/*',
  HOME: '',
  COMIC_LIST: 'danh-sach/:type?',
  CATEGORY_LIST: 'the-loai/:slug?',
  COMIC: 'truyen/:slug/:chapter?'
}

export default routes
