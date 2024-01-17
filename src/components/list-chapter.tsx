import { List } from 'antd'
import VirtualList from 'rc-virtual-list'
import { Link } from 'react-router-dom'
import { Chapter } from '~/models/data'

const ListChapter = (payload: { chapters: Chapter[]; slug: string }) => {
  const { slug } = payload

  const chapters = payload.chapters.reverse()

  return (
    <List>
      <VirtualList data={chapters} itemKey='chapter_name' height={400} itemHeight={28}>
        {(item: Chapter) => (
          <List.Item key={item.chapter_name}>
            <List.Item.Meta
              title={
                <Link
                  to={`/truyen/${slug}/${item.chapter_name}`}
                >{`Chương ${item.chapter_name}: ${item.filename}`}</Link>
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  )
}

export default ListChapter
