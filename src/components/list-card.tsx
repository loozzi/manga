import { PaginationProps, Divider, Row, Pagination, Flex, Spin } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import api from '~/configs/api'
import { Data, Item } from '~/models/data'
import { PaginationModel } from '~/models/pagination'
import CardComp from './card'

const ListCardComp = (payload: { setSeoOnPage: Function | undefined; type: string }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Item[]>([])
  const [page, setPage] = useState<Number>(1)
  const [pagination, setPagination] = useState<PaginationModel>({} as PaginationModel)
  const [domainCdn, setDomainCdn] = useState<string>('')
  const [breadCrumb, setBreadCrumb] = useState<any[]>([])

  const { setSeoOnPage, type } = payload

  const changePage: PaginationProps['onChange'] = (page: Number) => {
    setPage(page)
  }

  useEffect(() => {
    setLoading(true)
    api.getByType(page, type).then((response: Data | any) => {
      setData(response.items)
      if (setSeoOnPage) setSeoOnPage(response.seoOnPage)
      setPagination(response.params.pagination)
      setDomainCdn(response.APP_DOMAIN_CDN_IMAGE)
      setBreadCrumb(response.breadCrumb)
      setLoading(false)
      console.log(response.seoOnPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [page])
  return (
    <Fragment>
      {!breadCrumb && <Spin />}
      {breadCrumb && <Divider orientation='left'>{`${breadCrumb[0]?.name} - ${breadCrumb[1]?.name}`}</Divider>}
      <Row gutter={16} justify={'center'} align={'top'} style={{ width: '100%', margin: '0' }}>
        {data.map((item: Item) => (
          <CardComp key={item._id} data={item} domainCdn={domainCdn} isLoading={loading} />
        ))}
      </Row>
      <Flex justify='center' style={{ marginTop: '16px' }}>
        <Pagination
          defaultCurrent={pagination.currentPage}
          onChange={changePage}
          showQuickJumper
          size='default'
          pageSize={pagination.totalItemsPerPage}
          pageSizeOptions={[24]}
          total={pagination.totalItems}
        ></Pagination>
      </Flex>
    </Fragment>
  )
}

export default ListCardComp
