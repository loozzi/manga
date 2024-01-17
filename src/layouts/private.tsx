import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router'

const PrivateLayout = () => {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default PrivateLayout
