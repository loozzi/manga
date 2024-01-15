import { Flex, Tag } from 'antd'
import { Category } from '~/models/category'
import { Item } from '~/models/data'

const CardContentComp = (payload: { item: Item }) => {
  const { item }: { item: Item } = payload

  return (
    <Flex vertical={true}>
      <h3
        style={{
          color: 'orange'
        }}
      >
        {item.name}
      </h3>
      {item.origin_name[0].length > 0 && <span>Tên khác: {item.origin_name[0]}</span>}
      {item.chaptersLatest && <span>Chương mới nhất: {item.chaptersLatest[0].chapter_name}</span>}
      <span>
        Tình trạng:{' '}
        {item.status === 'ongoing' ? 'Đang cập nhật' : item.status === 'coming_soon' ? 'Sắp ra mắt' : 'Đã hoàn thành'}
      </span>
      <span>
        {item.category.map((item: Category) => (
          <Tag style={{ margin: '4px', marginLeft: 0 }} key={item._id} color='#2db7f5'>
            {item.name}
          </Tag>
        ))}
      </span>
    </Flex>
  )
}

export default CardContentComp
