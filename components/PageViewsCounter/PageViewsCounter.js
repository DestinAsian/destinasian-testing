import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function PageViewsCounter() {
  const [isLocalhost, setIsLocalhost] = useState(true)

  useEffect(() => {
    setIsLocalhost(window.location.hostname === 'localhost')
  }, [])

  return (
    <>
      {!isLocalhost && (
        <>
          {/* StatCounter Code */}
          <Script strategy="afterInteractive" id="statcounter-setup">
            {`
              var sc_project=13013151; 
              var sc_invisible=1; 
              var sc_security="384de620"; 
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            src="https://www.statcounter.com/counter/counter.js"
            async
          />
          <noscript>
            <div className="statcounter">
              <a
                title="Web Analytics"
                href="http://statcounter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="statcounter"
                  src="//c.statcounter.com/13013151/0/384de620/0"
                  alt="Web Analytics"
                />
              </a>
            </div>
          </noscript>
          {/* End StatCounter Code */}
        </>
      )}
    </>
  )
}
