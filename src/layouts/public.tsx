import { Outlet } from 'react-router'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'

import Header from '~/components/header'
import Footer from '~/components/footer'
import { useMediaQuery } from 'react-responsive'
import HeaderMobileComp from '~/components/header-mobile'

const PublicLayout = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      {isTabletOrMobile ? <HeaderMobileComp /> : <Header />}
      <Content>
        <Outlet />
      </Content>
      <Footer />
      {isTabletOrMobile && <div style={{ height: 36 }}></div>}
    </Layout>
  )
}

export default PublicLayout
