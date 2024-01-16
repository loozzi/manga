import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Card, Col, Tag, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { Item } from '~/models/data'
import CardContentComp from './card-content'

const CardComp = (payload: { data: Item; domainCdn: string; isLoading: boolean }) => {
  const { data, domainCdn, isLoading } = payload

  return (
    <Col span={26}>
      <Link to={`/truyen/${data.slug}`}>
        <Card
          key={data._id}
          hoverable
          style={{ width: 280 }}
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
          <Tooltip title={<CardContentComp item={data} />}>
            <Card.Meta
              title={data.name}
              description={`Chapter: ${data.chaptersLatest ? data.chaptersLatest[0].chapter_name : 0}`}
            />
            <Tag
              color={data.status === 'ongoing' ? 'processing' : data.status === 'coming_soon' ? 'warning' : 'success'}
              icon={
                data.status === 'ongoing' ? (
                  <SyncOutlined spin />
                ) : data.status === 'coming_soon' ? (
                  <ClockCircleOutlined />
                ) : (
                  <CheckCircleOutlined />
                )
              }
              style={{ position: 'absolute', bottom: 20, right: 16 }}
            >
              {data.status}
            </Tag>
          </Tooltip>
        </Card>
      </Link>
    </Col>
  )
}

export default CardComp
