import { Alert } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import ListCardComp from '~/components/list-card'
import { SeoOnPage } from '~/models/response'

const HomePage = () => {
  const [seoOnPage, setSeoOnPage] = useState<SeoOnPage>({} as SeoOnPage)

  const loadSeoOnpage = (s: SeoOnPage) => {
    setSeoOnPage(s)
  }

  useEffect(() => {
    document.title = 'Truyenmoi.fun - Truyện mới cập nhật - Truyện Hay Online'
  }, [])

  return (
    <Fragment>
      {!!seoOnPage.descriptionHead && (
        <Alert
          style={{ margin: '16px 16px 0' }}
          type='info'
          message={
            <Marquee pauseOnClick gradient={false} speed={50}>
              {seoOnPage.descriptionHead}
            </Marquee>
          }
        />
      )}
      <ListCardComp setSeoOnPage={loadSeoOnpage} type='/danh-sach/truyen-moi' />
    </Fragment>
  )
}

export default HomePage
