import { useEffect, useState } from 'react'

import { Header } from 'antd/es/layout/layout'
import { Menu } from 'antd'
import api from '~/configs/api'
import { Category } from '~/models/category'
import SubMenu from 'antd/es/menu/SubMenu'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import logo from '~/assets/imgs/logo.png'

const HeaderComp = () => {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)

  const MenuItems = (categories: Category[]) =>
    categories.map((category: Category) => (
      <Menu.Item key={category._id}>
        <Link to={`the-loai/` + category.slug}>{category.name}</Link>
      </Menu.Item>
    ))

  useEffect(() => {
    const categoies = localStorage.getItem('categories')

    if (categoies) {
      setMenu(JSON.parse(categoies))
    } else {
      setLoading(true)
      api.getCategories().then((response: Category[] | undefined) => {
        setMenu(response as any)
        setLoading(false)
        localStorage.setItem('categories', JSON.stringify(response))
      })
    }
  }, [])

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Menu theme='dark' mode='horizontal' style={{ flex: 1, minWidth: 0 }} selectedKeys={[]}>
        <Menu.Item key='home'>
          <Link
            to='/'
            style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img src={logo} alt='' style={{ height: '32px' }} />
          </Link>
        </Menu.Item>
        <SubMenu key='category' title='Thể loại'>
          {!loading && MenuItems(menu)}
        </SubMenu>
        <SubMenu title='Danh Sách' key='commic-list'>
          <Menu.Item key='new'>
            <Link to='/danh-sach/truyen-moi'>Mới Cập Nhật</Link>
          </Menu.Item>
          <Menu.Item key='comming-soon'>
            <Link to='/danh-sach/sap-ra-mat'>Sắp Ra Mắt</Link>
          </Menu.Item>
          <Menu.Item key='ongoing'>
            <Link to='/danh-sach/dang-phat-hanh'>Đang Phát Hành</Link>
          </Menu.Item>
          <Menu.Item key='completed'>
            <Link to='/danh-sach/hoan-thanh'>Hoàn Thành</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='history'>
          <Link to={routes.HISTORY}>Lịch sử</Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <Link to={routes.SEARCH}>Tìm kiếm</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderComp
