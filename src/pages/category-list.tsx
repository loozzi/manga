import { Fragment } from 'react'
import { useParams } from 'react-router'
import ListCardComp from '~/components/list-card'

const CategoryList = () => {
  const { slug } = useParams()
  let _type = `/the-loai/${slug}`

  if (slug?.length === 0) {
    _type = '/danh-sach/truyen-moi'
  }

  return (
    <Fragment>
      <ListCardComp type={_type as string} />
    </Fragment>
  )
}

export default CategoryList
