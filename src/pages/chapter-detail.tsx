import { Button, Select, Space, Tooltip, Watermark } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import api from '~/configs/api'
import { Chapter, ChapterData, ChapterResponse } from '~/models/data'
import { history } from '~/configs/history'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ChapterDetail = (payload: {
  chapter: string
  slug: string
  listChapters: Chapter[] | undefined
  exit: Function
  detail: any
}) => {
  const [data, setData] = useState<ChapterData>({} as ChapterData)
  const [cdn, setCdn] = useState<string>('')
  const [isShowPrev, setIsShowPrev] = useState<boolean>(true)
  const [isShowNext, setIsShowNext] = useState<boolean>(true)
  const { slug, chapter, listChapters, exit, detail } = payload

  const handleChangeChapter = (value: string) => {
    setData({} as ChapterData)
    history.push(`/truyen/${slug}/${value}`)
  }

  const goToPrevChapter = () => {
    if (!!listChapters) {
      const _chapterIndex = listChapters
        .map((e) => e.chapter_api_data.split('/')[e.chapter_api_data.split('/').length - 1])
        .indexOf(chapter)

      handleChangeChapter(listChapters[_chapterIndex - 1].chapter_name)
    }
  }

  const goToNextChapter = () => {
    if (!!listChapters) {
      const _chapterIndex = listChapters
        .map((e) => e.chapter_api_data.split('/')[e.chapter_api_data.split('/').length - 1])
        .indexOf(chapter)

      handleChangeChapter(listChapters[_chapterIndex + 1].chapter_name)
    }
  }

  useEffect(() => {
    api
      .getChapter(chapter as string)
      .then((_res) => {
        const res: ChapterResponse = _res as ChapterResponse
        setData(res.item)
        setCdn(res.domain_cdn)

        // Set history
        const histories = localStorage.getItem('history')
        if (histories) {
          const data = JSON.parse(histories)
          const index = data.map((item: any) => item.slug).indexOf(slug)
          if (index !== -1) data.splice(index, 1)
          localStorage.setItem(
            'history',
            JSON.stringify([
              ...data,
              {
                slug,
                chapter_name: res.item.chapter_name,
                detail: detail
              }
            ])
          )
        } else {
          localStorage.setItem(
            'history',
            JSON.stringify([
              {
                slug,
                chapter_name: res.item.chapter_name,
                detail
              }
            ])
          )
        }
      })
      .catch((err) => {
        console.log(err)
        history.push(`/truyen/${slug}`)
      })
  }, [chapter, slug])

  useEffect(() => {
    document.title = !!data ? `Chương ${data.chapter_name} - ${data.comic_name}` : 'Truyện tranh online'
  }, [data])

  useEffect(() => {
    if (!!listChapters) {
      const _chapterIndex = listChapters
        .map((e) => e.chapter_api_data.split('/')[e.chapter_api_data.split('/').length - 1])
        .indexOf(chapter)
      if (_chapterIndex === 0) {
        setIsShowPrev(false)
      } else {
        setIsShowPrev(true)
      }

      if (_chapterIndex === listChapters.length - 1) {
        setIsShowNext(false)
      } else {
        setIsShowNext(true)
      }
    }
  }, [chapter])

  return (
    <Space
      style={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        position: 'fixed',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}
    >
      <Space.Compact
        block
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          padding: 8,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
          width: '100%',
          backgroundColor: 'rgba(100, 80, 120, 0.8)',
          alignSelf: 'center'
        }}
      >
        <Tooltip title='Chương trước'>
          <Button disabled={!isShowPrev} icon={<LeftOutlined />} onClick={goToPrevChapter}>
            Prev
          </Button>
        </Tooltip>
        <Select
          placeholder={`Chương: ${data.chapter_name}`}
          style={{ maxWidth: '160px', width: '100%' }}
          onChange={handleChangeChapter}
          defaultValue={data.chapter_name}
          value={data.chapter_name}
          options={
            !!listChapters
              ? [...listChapters].reverse().map((item: Chapter) => ({
                  value: item.chapter_name,
                  label: `Chương ${item.chapter_name}: ${item.filename}`
                }))
              : []
          }
        />
        <Tooltip title='Chương sau'>
          <Button disabled={!isShowNext} onClick={goToNextChapter}>
            Next <RightOutlined />
          </Button>
        </Tooltip>
        <Tooltip title='Thoát'>
          <Button onClick={() => exit()}>Thoát</Button>
        </Tooltip>
      </Space.Compact>
      <div>
        <Watermark
          content='Truyenmoi.fun'
          inherit={false}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {data.chapter_image &&
            data.chapter_image.map((item, index) => (
              <LazyLoadImage
                style={{
                  maxWidth: '1200px',
                  width: '100%'
                }}
                key={index}
                src={`${cdn}/${data.chapter_path}/${item.image_file}`}
                alt=''
              />
            ))}
        </Watermark>
      </div>
    </Space>
  )
}

export default ChapterDetail
