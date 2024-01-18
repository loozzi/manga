import { Route, Routes, useLocation } from 'react-router'
import { Button, Result } from 'antd'

import routes from '~/configs/routes'
import PublicLayout from '~/layouts/public'
import HomePage from '~/pages/home'
import ComicList from '~/pages/comic-list'
import CategoryList from '~/pages/category-list'
import ComicDetail from '~/pages/comic-detail'
import HistoryPage from '~/pages/history-page'
import SearchPage from '~/pages/search'
import { history } from '~/configs/history'

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
          <Route path={routes.SEARCH} element={<SearchPage />} />
          <Route
            path='*'
            element={
              <Result
                style={{ backgroundColor: '#fff', height: '100vh' }}
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                  <Button type='primary' onClick={() => history.push('/')}>
                    Back Home
                  </Button>
                }
              />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
