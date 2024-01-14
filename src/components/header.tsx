import React, { useEffect, useState } from 'react'

import { Header } from 'antd/es/layout/layout'
import { Menu } from 'antd'
import api from '~/configs/api'
import { Category } from '~/models/response'
import SubMenu from 'antd/es/menu/SubMenu'
import { Link } from 'react-router-dom'

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
      <Link to='/' style={{ height: '32px' }}>
        <img src='https://mangatooncom.vn/official/logo.svg' alt='' style={{ height: '32px' }} />
      </Link>
      <Menu theme='dark' mode='horizontal' style={{ flex: 1, minWidth: 0 }}>
        <Menu.Item key='category'>
          <Link to='/the-loai'>
            <SubMenu key='sub1' title='Thể loại'>
              {!loading && MenuItems(menu)}
            </SubMenu>
          </Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <Link to='/tim-kiem'>Tìm kiếm</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderComp
