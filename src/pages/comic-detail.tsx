import { Row, Col } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router'
import DetailComp from '~/components/detail'
import api from '~/configs/api'
import { history } from '~/configs/history'
import { Data, Item } from '~/models/data'
import { SeoOnPage } from '~/models/response'
import ChapterDetail from './chapter-detail'

const ComicDetail = () => {
  const { slug, chapter } = useParams()
  const [seoOnPage, setSeoOnPage] = useState<SeoOnPage>({} as SeoOnPage)
  const [data, setData] = useState<Item>({} as Item)
  const [CDNUrl, setCDNUrl] = useState<string>('' as string)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentChapter, setCurrentChapter] = useState<string>('' as string)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  if (!slug) {
    history.push('/')
  }

  const exit = () => {
    setCurrentChapter('')
    history.push(`/truyen/${slug}`)
  }

  useEffect(() => {
    setLoading(true)
    api
      .getDetail(slug as string)
      .then((_res) => {
        const res: Data = _res as Data
        setSeoOnPage(res.seoOnPage)
        setData(res?.item as unknown as Item)
        setCDNUrl(res.APP_DOMAIN_CDN_IMAGE)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        history.push('/')
      })
  }, [slug, chapter])

  useEffect(() => {
    // If have chapter name in params, set current chapter
    if (!!chapter) {
      const _chapterIndex = data.chapters?.[0].server_data.map((e) => e.chapter_name).indexOf(chapter)
      if (_chapterIndex !== -1) {
        const curChap = data.chapters?.[0].server_data[_chapterIndex as number]
        const idChap = curChap?.chapter_api_data.split('/')?.[curChap?.chapter_api_data.split('/')?.length - 1]
        setCurrentChapter(idChap as string)
      }
    }
  }, [data, chapter])

  useEffect(() => {
    document.title = seoOnPage?.titleHead ?? 'Truyện tranh online'
  }, [seoOnPage])

  return (
    <Fragment>
      {!currentChapter && (
        <Row
          style={{
            marginTop: '16px'
          }}
        >
          <Col span={isTabletOrMobile ? 1 : 3}>100px</Col>
          <Col span={isTabletOrMobile ? 22 : 18}>
            <DetailComp item={data} cdn={CDNUrl} loading={loading} />
          </Col>
          <Col span={isTabletOrMobile ? 1 : 3}>100px</Col>
        </Row>
      )}
      {!!currentChapter && (
        <ChapterDetail
          chapter={currentChapter}
          slug={data.slug}
          listChapters={data?.chapters?.[0]?.server_data}
          exit={exit}
          detail={{ name: data.name, thumb_url: data.thumb_url, orign_name: data.origin_name, domainCdn: CDNUrl }}
        />
      )}
    </Fragment>
  )
}

export default ComicDetail
