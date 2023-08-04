import React, { useEffect, useState } from 'react'
import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import { useMediaQuery } from 'react-responsive'

let cx = className.bind(styles)

export default function FeatureWell({
  type,
  videoSrc,
  desktopSrc,
  mobileSrc,
  url,
  caption,
}) {
  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const [IsMaximized, setIsMaximized] = useState(false)

  // Maximized chevron when page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMaximized(true)
    }, 2000) // Change the timeframe (in milliseconds) as per your requirement

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <div className={cx('component')}>
        {type === 'image' && (
          <a href={url}>
            {isDesktop && <img src={desktopSrc} />}
            {isMobile && <img src={mobileSrc} />}
          </a>
        )}
        {type === 'video' && (
          <a href={url}>
            <div className={cx('video-wrapper')}>
              <video
                src={videoSrc}
                className="video-content"
                loop
                autoPlay
                playsInline
                muted
              />

              <div className={cx('caption-wrapper')}>{caption}</div>

              <div
                className={cx('chevron-wrapper', { maximized: IsMaximized })}
              >
                <a href="#snapStart">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#ffffff"
                      stroke="none"
                    >
                      <path
                        d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </a>
        )}
      </div>
    </>
  )
}
