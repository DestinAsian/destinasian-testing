import className from 'classnames/bind'
import styles from './TabsEditor.module.scss'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import { LayoutGroup } from 'framer-motion'
// src/components/TabDays/TabDays.js
import React, { useState, useEffect } from 'react'
let cx = className.bind(styles)

export default function TabsEditor({ tabsEditor }) {
  const [activeTab, setActiveTab] = useState('tab1')

  const [transformedContent1, setTransformedContent1] = useState('')

  const [transformedContent2, setTransformedContent2] = useState('')

  useEffect(() => {
    const extractImageData = (htmlContent) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')

      const imageElements = doc.querySelectorAll(
        'img[src*="testing.destinasian.com"]',
      )

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

  const tabContent = {
    tab1: tabsEditor?.tab1 || 'No content available for Tab 1.',
    tab2: tabsEditor?.tab2 || 'No content available for Tab 2.',
  }

  return (
    <div className="tabs-container mx-auto max-w-2xl pt-20">
      <div className="mb-4 flex border-2 border-black">
        <button
          onClick={() => setActiveTab('tab1')}
          className={`flex-1 border px-4 py-2 ${
            activeTab === 'tab1' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          } rounded-l text-center`}
        >
          {tabsEditor?.tabTittle1 || 'DAY ONE'}
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={`flex-1 border px-4 py-2 ${
            activeTab === 'tab2' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          } rounded-r text-center`}
        >
          {tabsEditor?.tabTittle2 || 'DAY TWO'}
        </button>
      </div>
      <div className="p-4 text-left">
        {activeTab === 'tab1' && (
          <div
            className={cx('')}
            dangerouslySetInnerHTML={{ __html: transformedContent1 ?? '' }}
          />
        )}
        {activeTab === 'tab2' && (
          <div
            className={cx('')}
            dangerouslySetInnerHTML={{ __html: transformedContent2 ?? '' }}
          />
        )}
      </div>
      <div className="mb-4 flex border-2 border-black">
        <button
          onClick={() => setActiveTab('tab1')}
          className={`flex-1 border px-4 py-2 ${
            activeTab === 'tab1' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          } rounded-l text-center`}
        >
          {tabsEditor?.tabTittle1 || 'DAY ONE'}
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={`flex-1 border px-4 py-2 ${
            activeTab === 'tab2' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          } rounded-r text-center`}
        >
          {tabsEditor?.tabTittle2 || 'DAY TWO'}
        </button>
      </div>
    </div>
  )
}
