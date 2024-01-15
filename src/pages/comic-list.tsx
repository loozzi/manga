import { Fragment, useEffect } from 'react'
import { useParams } from 'react-router'
import ListCardComp from '~/components/list-card'

const ComicList = () => {
  const { type } = useParams()
  let _type = type

  if (type?.length === 0) {
    _type = 'truyen-moi'
  }

  return (
    <Fragment>
      <ListCardComp type={_type as string} />
    </Fragment>
  )
}

export default ComicList
