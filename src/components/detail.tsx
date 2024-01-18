import {
  Col,
  Row,
  Image,
  Tag,
  Descriptions,
  DescriptionsProps,
  Button,
  Collapse,
  Flex,
  message,
  Skeleton,
  Spin,
  Result
} from 'antd'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Item } from '~/models/data'
import ListChapter from './list-chapter'
import { useMediaQuery } from 'react-responsive'
import { history } from '~/configs/history'

const DetailComp = (payload: { item: Item; cdn: string; loading: boolean }) => {
  const { item, cdn, loading } = payload
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [messageApi, contextHolder] = message.useMessage()

  const randomColor = () => {
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const readAgain = () => {
    const chapters = item.chapters
    if (chapters?.length === 0) {
      messageApi.error('Chưa có chương nào')
    } else {
      const chapter_name = `${item.chapters?.[0]?.server_data?.[item.chapters?.[0]?.server_data.length - 1]?.chapter_name}`
      const url = `/truyen/${item.slug}/${chapter_name}`
      history.push(url)
    }
  }

  const readContinue = () => {
    const histories = localStorage.getItem('history')
    if (histories) {
      const data = JSON.parse(histories)
      const index = data.map((item: any) => item.slug).indexOf(item.slug)
      if (index !== -1) {
        const url = `/truyen/${item.slug}/${data[index].chapter_name}`
        history.push(url)
      } else {
        messageApi.warning('Bạn chưa đọc truyện này')
      }
    } else {
      messageApi.warning('Bạn chưa đọc truyện này')
    }
  }

  const desc = (): DescriptionsProps['items'] => {
    if (loading) return []

    return [
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
            key={Math.random() * 100}
          >
            {item.category.map((cat) => (
              <span key={cat._id}>
                <Tag
                  color={randomColor()}
                  style={{
                    marginBottom: 8
                  }}
                >
                  <Link to={`/the-loai/${cat.slug}`}>{cat.name}</Link>
                </Tag>
              </span>
            ))}
          </span>
        )
      },
      {
        key: 5,
        children: (
          <span>
            <Button type='primary' size='large' onClick={readAgain}>
              Đọc từ đầu
            </Button>
            <Button
              danger
              type='primary'
              style={{
                marginLeft: '8px'
              }}
              size='large'
              onClick={readContinue}
            >
              Đọc tiếp
            </Button>
          </span>
        )
      }
    ]
  }

  // item.content = item.content?.replace('Xem thêm', '')
  return (
    <Fragment>
      {contextHolder}
      <Row style={{ color: '#012' }}>
        <Flex vertical={isTabletOrMobile}>
          <Col
            style={{
              marginLeft: isTabletOrMobile ? '16px' : '0'
            }}
          >
            {loading ? (
              <Skeleton.Image />
            ) : (
              <Image
                style={{
                  width: '100%',
                  borderRadius: '8px'
                }}
                src={`${cdn}/uploads/comics/${item.thumb_url}`}
              ></Image>
            )}
          </Col>
          {loading ? (
            <Skeleton />
          ) : (
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
                items={desc()}
                layout='horizontal'
                column={1}
              />
            </Col>
          )}
        </Flex>
        <Collapse defaultActiveKey={['1']} style={{ width: '100%', marginTop: 16 }}>
          <Collapse.Panel header='Giới thiệu' key='1'>
            {loading ? <Skeleton /> : <span dangerouslySetInnerHTML={{ __html: item.content as string }} />}
          </Collapse.Panel>
        </Collapse>
        <Collapse
          defaultActiveKey={1}
          style={{
            width: '100%',
            marginTop: '16px'
          }}
        >
          <Collapse.Panel
            header={
              loading ? (
                <Spin />
              ) : item.chapters?.length === 0 ? (
                `Chưa có chương nào`
              ) : (
                `${item.chapters?.[0].server_name} - ${item.chapters?.[0].server_data.length} Chương`
              )
            }
            key='1'
          >
            {loading ? (
              <Skeleton />
            ) : item.chapters?.length === 0 ? (
              <Result status='warning' title='Xin lỗi, vì truyện chưa được ra mắt nên chưa có chương nào để hiển thị' />
            ) : (
              <ListChapter slug={item.slug} chapters={item.chapters?.[0].server_data as any} />
            )}
          </Collapse.Panel>
        </Collapse>
      </Row>
    </Fragment>
  )
}

export default DetailComp
