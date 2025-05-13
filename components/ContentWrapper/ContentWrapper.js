
import className from 'classnames/bind'
import styles from './ContentWrapper.module.scss'
import { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import { GallerySlider } from '../../components'
import { BACKEND_URL } from '../../constants/backendUrl'

let cx = className.bind(styles)

export default function ContentWrapper({ content, children }) {
  const [processedContent, setProcessedContent] = useState([])

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const finalElements = []

    const processNode = (node, index) => {
      // Instagram blockquote
      if (
        node.nodeType === 1 &&
        node.tagName === 'BLOCKQUOTE' &&
        node.getAttribute('data-instgrm-permalink')
      ) {
        const url = node.getAttribute('data-instgrm-permalink')
        const captioned = node.hasAttribute('data-instgrm-captioned')

        finalElements.push(
          <div
            key={`ig-${index}`}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <InstagramEmbed url={url} width={500} captioned={captioned} />
          </div>,
        )
        return
      }

      // Galeri (div id="gallery-...")
      if (
        node.nodeType === 1 &&
        node.tagName === 'DIV' &&
        node.id?.startsWith('gallery-')
      ) {
        finalElements.push(
          <GallerySlider key={`gallery-${index}`} gallerySlider={node} />,
        )
        return
      }

      // Gallery Slider
      if (node.nodeType === 1 && node.tagName === 'IMG') {
        const src = node.getAttribute('src')
        const alt = node.getAttribute('alt') || 'Image'
        const width = node.getAttribute('width') || 500
        const height = node.getAttribute('height') || 500

        finalElements.push(
          <Image
            key={`img-${index}`}
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ objectFit: 'contain' }}
          />,
        )
        return
      }

      // Node lain: render langsung sebagai HTML
      if (node.nodeType === 1) {
        finalElements.push(
          <div
            key={`html-${index}`}
            dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          />,
        )
      }

      // Node teks biasa
      if (node.nodeType === 3 && node.textContent.trim() !== '') {
        finalElements.push(<p key={`text-${index}`}>{node.textContent}</p>)
      }
    }

    Array.from(doc.body.childNodes).forEach((node, i) => processNode(node, i))
    setProcessedContent(finalElements)
  }, [content])

  return (
    <article className={cx('component')}>
      <div className={cx('content-wrapper')}>{processedContent}</div>
      {children}
    </article>
  )
}



// import className from 'classnames/bind'
// import styles from './ContentWrapper.module.scss'
// import { useEffect, useState } from 'react'
// import { renderToStaticMarkup } from 'react-dom/server'
// import Image from 'next/image'
// import { GallerySlider } from '../../components'
// import { BACKEND_URL } from '../../constants/backendUrl'

// let cx = className.bind(styles)

// export default function ContentWrapper({ content, children }) {
//   const [processedContent, setProcessedContent] = useState([])

//   // useEffect(() => {
//   //   const parser = new DOMParser()
//   //   const doc = parser.parseFromString(content, 'text/html')
//   //   const bodyChildren = Array.from(doc.body.childNodes)

//   //   const finalElements = []

//   //   bodyChildren.forEach((node, index) => {
//   //     // Tangani elemen galeri
//   //     if (node.nodeType === 1 && node.tagName === 'DIV' && node.id?.includes('gallery-')) {
//   //       const galleryImages = Array.from(node.querySelectorAll('img')).map((img) => {
//   //         const src = img.getAttribute('src')
//   //         const alt = img.getAttribute('alt') || ''

//   //         // Membuat caption untuk gambar
//   //         const caption = alt ? <figcaption>{alt}</figcaption> : null

//   //         return {
//   //           src,
//   //           alt,
//   //           caption: alt,
//   //         }
//   //       })

//   //       finalElements.push(
//   //         <GallerySlider key={`gallery-${index}`} gallerySlider={galleryImages} backIssue={backIssue} />
//   //       )
//   //       return
//   //     }

//   //     // Tangani gambar biasa
//   //     if (node.nodeType === 1 && node.tagName === 'IMG') {
//   //       const src = node.getAttribute('src')
//   //       const alt = node.getAttribute('alt') || 'Image'
//   //       const width = parseInt(node.getAttribute('width')) || 600
//   //       const height = parseInt(node.getAttribute('height')) || 400

//   //       finalElements.push(
//   //         <Image
//   //           key={`img-${index}`}
//   //           src={src}
//   //           alt={alt}
//   //           width={width}
//   //           height={height}
//   //           style={{ objectFit: 'contain' }}
//   //         />
//   //       )
//   //       return
//   //     }

//   //     // Tangani elemen lain sebagai HTML biasa
//   //     if (node.nodeType === 1) {
//   //       finalElements.push(
//   //         <div key={`html-${index}`} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
//   //       )
//   //     }

//   //     // Tangani node teks langsung
//   //     if (node.nodeType === 3) {
//   //       finalElements.push(
//   //         <p key={`text-${index}`}>{node.textContent}</p>
//   //       )
//   //     }
//   //   })

//   //   setProcessedContent(finalElements)
//   // }, [content])

//   useEffect(() => {
//     const extractHTMLData = () => {
//       const parser = new DOMParser()
//       const doc = parser.parseFromString(content, 'text/html')

//       // Function to handle images, checking inside all elements recursively
//       const replaceImagesRecursively = (node) => {
//         // If it's an <img> tag and contains src matching the condition
//         if (
//           node.nodeType === 1 &&
//           node.tagName === 'IMG' &&
//           node.src?.includes(BACKEND_URL)
//         ) {
//           const src = node.getAttribute('src')
//           const alt = node.getAttribute('alt') || 'Image'
//           const width = node.getAttribute('width') || 500
//           const height = node.getAttribute('height') || 500

//           const imageComponent = (
//             <Image
//               src={src}
//               alt={alt}
//               width={width}
//               height={height}
//               style={{ objectFit: 'contain' }}
//               priority
//             />
//           )

//           // Replace the <img> node with the rendered image component
//           const imageHtmlString = renderToStaticMarkup(imageComponent)
//           node.outerHTML = imageHtmlString
//         } else {
//           // If it's not an image, check its children recursively
//           Array.from(node.childNodes).forEach(replaceImagesRecursively)
//         }
//       }

//       // Process the content's root element to find all <img> nodes and replace them
//       Array.from(doc.body.childNodes).forEach(replaceImagesRecursively)

//       // Handle Instagram blockquote
//       const elements = Array.from(doc.body.childNodes).map((node, index) => {
//         // Instagram Post Embed
//         if (
//           node.nodeType === 1 &&
//           node.matches('blockquote[data-instgrm-permalink*="instagram.com"]')
//         ) {
//           const url = node.getAttribute('data-instgrm-permalink')
//           const captioned = node.hasAttribute('data-instgrm-captioned')

//           return (
//             <div
//               key={index}
//               style={{ display: 'flex', justifyContent: 'center' }}
//             >
//               <InstagramEmbed url={url} width={500} captioned={captioned} />
//             </div>
//           )
//         }

//         // Gallery Slider
//         if (
//           node.nodeType === 1 &&
//           node.tagName === 'DIV' &&
//           node.id?.includes('gallery-')
//         ) {
//           const gallerySlider = node

//           return <GallerySlider gallerySlider={gallerySlider} />
//         }

//         return (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: node.outerHTML }}
//           />
//         )
//       })

//       setProcessedContent(elements)
//     }

//     extractHTMLData()
//   }, [content])

//   return (
//     <article className={cx('component')}>
//       <div className={cx('content-wrapper')}>{processedContent}</div>
//       {children}
//     </article>
//   )
// }
