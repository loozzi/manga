import {
  HistoryOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import { Link } from 'react-router-dom'
import { history } from '~/configs/history'

const HeaderMobileComp = () => {
  const goHome = () => {
    history.push('/')
  }

  const goTo = (path: string) => {
    history.push(path)
  }

  return (
    <Space
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#333333',
        zIndex: 1,
        height: 48,
        color: '#fff',
        padding: '0 4px'
      }}
    >
      <div
        style={{
          margin: '0 2px'
        }}
        onClick={() => goTo('/the-loai')}
      >
        <UnorderedListOutlined /> Thể loại
      </div>
      <div onClick={() => goTo('/danh-sach')}>
        <MenuUnfoldOutlined /> Danh sách
      </div>
      <div
        onClick={goHome}
        style={{
          padding: '16px 16px'
        }}
      >
        <HomeOutlined
          style={{
            fontSize: 20
          }}
        />
      </div>

      <div onClick={() => goTo('/tim-kiem')}>
        <SearchOutlined /> Tìm kiếm
      </div>
      <div onClick={() => goTo('/lich-su')}>
        <HistoryOutlined /> Lịch sử
      </div>
    </Space>
  )
}

export default HeaderMobileComp
