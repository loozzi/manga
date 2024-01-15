import { Alert, Divider, Pagination, PaginationProps, Row } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import ListCardComp from '~/components/list-card'
import { SeoOnPage } from '~/models/response'

const HomePage = () => {
  const [seoOnPage, setSeoOnPage] = useState<SeoOnPage>({} as SeoOnPage)

  const loadSeoOnpage = (s: SeoOnPage) => {
    setSeoOnPage(s)
  }

  return (
    <Fragment>
      <Alert
        style={{ margin: '16px 16px 0' }}
        type='info'
        message={
          <Marquee pauseOnClick gradient={false} speed={50}>
            {seoOnPage.descriptionHead ?? 'Loading...'}
          </Marquee>
        }
      />
      <ListCardComp setSeoOnPage={loadSeoOnpage} type='truyen-moi' />
    </Fragment>
  )
}

export default HomePage
