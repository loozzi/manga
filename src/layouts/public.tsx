import React from 'react'
import { Outlet } from 'react-router'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'

import Header from '~/components/header'
import Footer from '~/components/footer'

const PublicLayout = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default PublicLayout
