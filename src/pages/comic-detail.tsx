import { Row, Col } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router'
import DetailComp from '~/components/detail'
import api from '~/configs/api'
import { history } from '~/configs/history'
import { Data, Item } from '~/models/data'
import { Params } from '~/models/pagination'
import { SeoOnPage } from '~/models/response'

const ComicDetail = () => {
  const { slug } = useParams()
  const [seoOnPage, setSeoOnPage] = useState<SeoOnPage>({} as SeoOnPage)
  const [data, setData] = useState<Item>({} as Item)
  const [params, setParams] = useState<Params>({} as Params)
  const [CDNUrl, setCDNUrl] = useState<string>('' as string)
  const [loading, setLoading] = useState<boolean>(true)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  if (!slug) {
    history.push('/')
  }

  useEffect(() => {
    setLoading(true)
    console.log(slug)
    api.getDetail(slug as string).then((_res) => {
      const res: Data = _res as Data
      setSeoOnPage(res.seoOnPage)
      setData(res?.item as unknown as Item)
      setParams(res.params)
      setCDNUrl(res.APP_DOMAIN_CDN_IMAGE)
      setLoading(false)
      console.log(res)
    })
  }, [slug])

  useEffect(() => {
    document.title = seoOnPage?.titleHead ?? 'Truyện tranh online'
  }, [seoOnPage])

  return (
    <Fragment>
      <Row
        style={{
          marginTop: '16px'
        }}
      >
        <Col span={isTabletOrMobile ? 1 : 3}>100px</Col>
        <Col span={isTabletOrMobile ? 22 : 18}>{!loading && <DetailComp item={data} cdn={CDNUrl} />}</Col>
        <Col span={isTabletOrMobile ? 1 : 3}>100px</Col>
      </Row>
    </Fragment>
  )
}

export default ComicDetail
