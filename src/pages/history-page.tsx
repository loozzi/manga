import { Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HistoryPage = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    const histories = localStorage.getItem('history')
    if (histories) {
      console.log(JSON.parse(histories))
      const _data = JSON.parse(histories).reverse()
      setData(_data)
    }
  }, [])

  return (
    <Row
      gutter={[16, 16]}
      style={{
        padding: 16,
        margin: '0 auto'
      }}
    >
      {data.map((item: any) => (
        <Col span={26}>
          <Link to={`/truyen/${item.slug}`} key={item._id}>
            <Card
              style={{ width: 280 }}
              cover={
                <img
                  alt={item.detail.name}
                  src={`${item.detail.domainCdn}/uploads/comics/${item.detail.thumb_url}`}
                  style={{
                    height: '320px',
                    objectFit: 'cover'
                  }}
                />
              }
            >
              <Card.Meta title={item.detail.name} description={`Đang đọc: Chương ${item.chapter_name}`} />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default HistoryPage
