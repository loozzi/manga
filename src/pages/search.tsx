import { SearchOutlined } from '@ant-design/icons'
import { Divider, Input, Row, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import CardComp from '~/components/card'
import api from '~/configs/api'
import { Item } from '~/models/data'

const SearchPage = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Item[]>([])
  const [domainCdn, setDomainCdn] = useState<string>('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setData([])
      setLoading(true)
      api.search(search).then((response: any) => {
        setData(response.items)
        setDomainCdn(response.APP_DOMAIN_CDN_IMAGE)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        placeholder='Tìm kiếm'
        size='large'
        style={{
          margin: '16px',
          width: 'calc(100% - 32px)'
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider orientation='left'>Kết quả</Divider>
      <Skeleton
        style={{
          margin: 16
        }}
        loading={loading}
      />
      <Row gutter={[16, 16]} justify={'center'} align={'top'} style={{ width: '100%', margin: '0' }}>
        {data.map((item: Item) => (
          <CardComp key={item._id} data={item} domainCdn={domainCdn} isLoading={loading} />
        ))}
      </Row>
    </div>
  )
}

export default SearchPage
