import { Col, Row, Image, Tag, Descriptions, DescriptionsProps, Button, Collapse, Flex } from 'antd'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Item } from '~/models/data'
import ListChapter from './list-chapter'
import { useMediaQuery } from 'react-responsive'

const DetailComp = (payload: { item: Item; cdn: string }) => {
  const { item, cdn } = payload
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const randomColor = () => {
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
    return colors[Math.floor(Math.random() * colors.length)]
  }
  const desc: DescriptionsProps['items'] = [
    {
      key: 1,
      label: 'Tác giả',
      children: item.author?.join(', ')
    },
    {
      key: 2,
      label: 'Tình trạng',
      children:
        item.status === 'ongoing' ? 'Đang cập nhật' : item.status === 'completed' ? 'Đã hoàn thành' : 'Chưa ra mắt'
    },
    {
      key: 3,
      label: 'Sub độc quyền',
      children: item.sub_docquyen ? 'Có' : 'Không'
    },
    {
      key: 4,
      label: 'Thể loại',
      children: (
        <span
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
          key={1}
        >
          {item.category.map((cat) => (
            <Fragment key={cat._id}>
              <Tag
                color={randomColor()}
                style={{
                  marginBottom: 8
                }}
              >
                <Link to={`/the-loai/${cat.slug}`}>{cat.name}</Link>
              </Tag>
            </Fragment>
          ))}
        </span>
      )
    },
    {
      key: 5,
      children: (
        <span>
          <Button type='primary' size='large'>
            Đọc từ đầu
          </Button>
          <Button
            danger
            type='primary'
            style={{
              marginLeft: '8px'
            }}
            size='large'
          >
            Đọc tiếp
          </Button>
        </span>
      )
    }
  ]

  item.content = item.content?.replace('Xem thêm', '')
  return (
    <Fragment>
      <Row style={{ color: '#012' }}>
        <Flex vertical={isTabletOrMobile}>
          <Col
            style={{
              marginLeft: isTabletOrMobile ? '16px' : '0'
            }}
          >
            <Image
              style={{
                width: '100%',
                borderRadius: '8px'
              }}
              src={`${cdn}/uploads/comics/${item.thumb_url}`}
            ></Image>
          </Col>
          <Col flex='1'>
            <h1
              style={{
                marginLeft: '16px'
              }}
            >
              {item.name}
            </h1>
            <Descriptions
              style={{
                marginLeft: '16px',
                width: '100%'
              }}
              title={item.origin_name}
              items={desc}
              layout='horizontal'
              column={1}
            />
          </Col>
        </Flex>
        <Collapse defaultActiveKey={['1']} style={{ width: '100%', marginTop: 16 }}>
          <Collapse.Panel header='Giới thiệu' key='1'>
            <span dangerouslySetInnerHTML={{ __html: item.content as string }} />
          </Collapse.Panel>
        </Collapse>
        <Collapse
          defaultActiveKey={1}
          style={{
            width: '100%',
            marginTop: '16px'
          }}
        >
          {item.chapters?.map((chap) => (
            <Collapse.Panel header={`${chap.server_name} - ${chap.server_data.length} Chương`} key='1'>
              <ListChapter chapters={chap.server_data} />
            </Collapse.Panel>
          ))}
          {item.chapters?.length === 0 && <h4 style={{ padding: '16px' }}>Chưa có chương nào</h4>}
        </Collapse>
      </Row>
    </Fragment>
  )
}

export default DetailComp
