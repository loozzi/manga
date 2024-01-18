import { Route, Routes, useLocation } from 'react-router'

import routes from '~/configs/routes'
import PublicLayout from '~/layouts/public'
import PrivateLayout from '~/layouts/private'
import HomePage from '~/pages/home'
import ComicList from '~/pages/comic-list'
import CategoryList from '~/pages/category-list'
import ComicDetail from '~/pages/comic-detail'
import HistoryPage from '~/pages/history-page'

const App = () => {
  const location = useLocation()

  return (
    <div className='root'>
      <Routes location={location}>
        <Route path={routes.PUBLIC} element={<PublicLayout />}>
          <Route path={routes.HOME} element={<HomePage />} />
          <Route path={routes.COMIC_LIST} element={<ComicList />} />
          <Route path={routes.CATEGORY_LIST} element={<CategoryList />} />
          <Route path={routes.COMIC} element={<ComicDetail />} />
          <Route path={routes.HISTORY} element={<HistoryPage />} />
        </Route>
        <Route path={routes.PRIVATE} element={<PrivateLayout />}></Route>
      </Routes>
    </div>
  )
}

export default App
