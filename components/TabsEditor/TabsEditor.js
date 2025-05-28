import className from 'classnames/bind'
import styles from './TabsEditor.module.scss'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { BACKEND_URL } from '../../constants/backendUrl'

let cx = className.bind(styles)

export default function TabsEditor({ tabsEditor, luxuryTravelClass }) {
  const [activeTab, setActiveTab] = useState('tab1')
  const [transformedContent1, setTransformedContent1] = useState('')
  const [transformedContent2, setTransformedContent2] = useState('')
  const topButtonRef = useRef(null)

  // Remove empty spaces in HTML
  const cleanHtml = (html) => {
    return html.replace(
      /<p>(\s|&nbsp;|<span[^>]*>(\s|&nbsp;)*<\/span>)*<\/p>/gi,
      '',
    )
  }

  const handleClick = (tab) => {
    setActiveTab(tab)
    setTimeout(() => {
      if (topButtonRef.current) {
        const offset = -110
        const top =
          topButtonRef.current.getBoundingClientRect().top +
          window.scrollY +
          offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 100)
  }

  useEffect(() => {
    const extractImageData = (htmlContent) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')

      const imageElements = doc.querySelectorAll(`img[src*="${BACKEND_URL}"]`)

      imageElements.forEach((img) => {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt') || ''
        const width = img.getAttribute('width') || '500'
        const height = img.getAttribute('height') || '500'

        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={parseInt(width, 10)}
            height={parseInt(height, 10)}
            // width={width}
            // height={height}
            style={{ objectFit: 'contain' }}
            priority
          />
        )

        const imageHtmlString = renderToStaticMarkup(imageComponent)
        img.outerHTML = imageHtmlString
      })

      return doc.body.innerHTML
    }

    // Transform content for both tabs
    if (tabsEditor) {
      const transformedTab1 = extractImageData(tabsEditor.tab1 || '')
      setTransformedContent1(transformedTab1)

      const transformedTab2 = extractImageData(tabsEditor.tab2 || '')
      setTransformedContent2(transformedTab2)
    }
  }, [tabsEditor])

  return (
    <div className={cx('component')}>
      <div
        className={
          luxuryTravelClass === 'luxuryTravelClass'
            ? 'tabs-container mx-auto max-w-[700px] p-0 sm:mx-0 sm:pl-[30px]'
            : 'tabs-container mx-auto max-w-[700px] p-0'
        }
      >
        <div className="my-4 flex border-2 border-black p-0" ref={topButtonRef}>
          <button
            onClick={() => setActiveTab('tab1')}
            className={`flex-1 border px-4 py-2 ${
              activeTab === 'tab1'
                ? 'bg-[#000000] text-[#ffffff]'
                : 'bg-[#f5f5f5] text-[#000000]'
            } rounded-l text-center`}
          >
            {tabsEditor?.tabTitle1}
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className={`flex-1 border px-4 py-2 ${
              activeTab === 'tab2'
                ? 'bg-[#000000] text-[#ffffff]'
                : 'bg-[#f5f5f5] text-[#000000]'
            } rounded-r text-center`}
          >
            {tabsEditor?.tabTitle2}
          </button>
        </div>
        <div className="p-0 text-left sm:px-0">
          {activeTab === 'tab1' && (
            <div
              className={cx('tabs-content-wrapper')}
              dangerouslySetInnerHTML={{
                __html: cleanHtml(transformedContent1) ?? '',
              }}
            />
          )}
          {activeTab === 'tab2' && (
            <div
              className={cx('tabs-content-wrapper')}
              dangerouslySetInnerHTML={{
                __html: cleanHtml(transformedContent2) ?? '',
              }}
            />
          )}
        </div>
        <div className="mb-4 flex border-2 border-black p-0">
          <button
            // onClick={() => setActiveTab('tab1')}
            onClick={() => handleClick('tab1')}
            className={`flex-1 border px-4 py-2 ${
              activeTab === 'tab1'
                ? 'bg-[#000000] text-[#ffffff]'
                : 'bg-[#f5f5f5] text-[#000000]'
            } rounded-l text-center`}
          >
            {tabsEditor?.tabTitle1}
          </button>
          <button
            // onClick={() => setActiveTab('tab2')}
            onClick={() => handleClick('tab2')}
            className={`flex-1 border px-4 py-2 ${
              activeTab === 'tab2'
                ? 'bg-[#000000] text-[#ffffff]'
                : 'bg-[#f5f5f5] text-[#000000]'
            } rounded-r text-center`}
          >
            {tabsEditor?.tabTitle2}
          </button>
        </div>
      </div>
    </div>
  )
}
