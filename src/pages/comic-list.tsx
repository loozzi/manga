import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ListCardComp from '~/components/list-card'
import { history } from '~/configs/history'

const ComicList = () => {
  const { type } = useParams()
  const [_type, setType] = useState<string>('' as string)

  useEffect(() => {
    let _type = `/danh-sach/${type}`
    if (type === undefined) {
      _type = '/danh-sach/truyen-moi'
    }
    console.log(type)
    history.push(_type)
    setType(_type)
  }, [type])

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px',
          marginBottom: 16
        }}
      >
        <Link style={{ padding: '16px 32px' }} to={'/danh-sach/truyen-moi'}>
          Mới cập nhật
        </Link>
        <Link style={{ padding: '16px 32px' }} to={'/danh-sach/sap-ra-mat'}>
          Sắp ra mắt
        </Link>
        <Link style={{ padding: '16px 32px' }} to={'/danh-sach/dang-phat-hanh'}>
          Đang phát hành
        </Link>
        <Link style={{ padding: '16px 32px' }} to={'/danh-sach/hoan-thanh'}>
          Hoàn thành
        </Link>
      </div>
      <ListCardComp type={_type as string} />
    </Fragment>
  )
}

export default ComicList
