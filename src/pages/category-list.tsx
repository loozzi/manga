import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ListCardComp from '~/components/list-card'
import api from '~/configs/api'
import { Category } from '~/models/category'

const CategoryList = () => {
  const { slug } = useParams()
  const [_type, setType] = useState<string>('' as string)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let _type = `/the-loai/${slug}`
    setType(_type)
  }, [slug])

  useEffect(() => {
    const categoies = localStorage.getItem('categories')

    if (categoies) {
      setCategories(JSON.parse(categoies))
    } else {
      api.getCategories().then((response: Category[] | undefined) => {
        setCategories(response as any)
        localStorage.setItem('categories', JSON.stringify(response))
      })
    }
  }, [])

  return (
    <Fragment>
      {!slug ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px'
          }}
        >
          {categories.map((category: Category) => (
            <Link
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '8px'
              }}
              key={category._id}
              to={`/the-loai/` + category.slug}
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : (
        <ListCardComp type={_type as string} />
      )}
    </Fragment>
  )
}

export default CategoryList
