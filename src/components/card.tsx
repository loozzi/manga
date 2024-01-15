import { Card, Col, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { Item } from '~/models/data'

const CardComp = (payload: { data: Item; domainCdn: string; isLoading: boolean }) => {
  const { data, domainCdn, isLoading } = payload

  return (
    <Col span={26}>
      <Link to={`/truyen/${data.slug}`}>
        <Card
          key={data._id}
          hoverable
          style={{ width: 240, marginBottom: '16px' }}
          loading={isLoading}
          cover={
            <img
              alt={data.name}
              src={`${domainCdn}/uploads/comics/${data.thumb_url}`}
              style={{
                height: '320px',
                objectFit: 'cover'
              }}
            />
          }
        >
          <Card.Meta title={data.name} description={`Chater: ${data.chaptersLatest[0].chapter_name}`} />
          <Tag
            color={data.status === 'ongoing' ? 'green' : 'orange'}
            style={{ position: 'absolute', bottom: 20, right: 16 }}
          >
            {data.status}
          </Tag>
        </Card>
      </Link>
    </Col>
  )
}

export default CardComp
