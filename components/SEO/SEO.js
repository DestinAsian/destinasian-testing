import Head from 'next/head'

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url, focuskw }) {
  if (!title && !description && !imageUrl && !url && !focuskw) {
    return null
  }

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={'https://destinasian.com' + url} />
            <meta
              property="twitter:url"
              content={'https://destinasian.com' + url}
            />
          </>
        )}

        {focuskw && <meta name="keywords" content={focuskw} />}

        {/* SEM Keywords */}
        <meta
          name="keywords"
          content="travel magazine, luxury magazine, luxury travel magazine, travel news, travel reviews, luxury travel, hotel and airline booking, hotel reviews, airline news, travel video guides, travel deals, travel contest, travel website, online travel magazine, asia travel, philippines travel, hotel news, best hotels manila, hong kong restaurants, beach holidays, thailand travel, singapore restaurants, luxury train trips, luxury resorts, best hotels beijing, best hotels singapore, luxury holidays asia, japan travel, indonesia travel, southeast asia travel, cultural travel, asia travel magazine, india travel, island getaways, asia cruise, phuket resorts, bali resorts, bangkok restaurants, airline news, adventure travel asia, airline routes, best hotels hong kong, best hotels jakarta, luxe list, luxury travel asia, hong kong travel, bali travel, sri lanka travel, cambodia travel, luxury hotels, best hotels shanghai, vietnam travel, tokyo restaurants, singapore travel, china travel, maldives resorts, luxury cruise, best hotels southeast asia, best hotels tokyo"
        />

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QV16KRW1PT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-QV16KRW1PT');`,
          }}
        ></script>

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5BJVGS');
          `,
          }}
        ></script>
        {/* End Google Tag Manager */}

        {/* <!-- START FOUANALYTICS ON-SITE EMBED CODE --> */}
        <script
          src="https://api.fouanalytics.com/api/init-3102x8pmdtqpcf032cq8.js"
          data-cfasync="false"
          async
        ></script>
        <noscript>
          <img src="https://api.fouanalytics.com/api/noscript-3102x8pmdtqpcf032cq8.gif" />
        </noscript>
        {/* <!-- END FOUANALYTICS ON-SITE EMBED CODE --> */}

        {/* Testing Typography Cloud */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/7429004/6477832/css/fonts.css"
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* EB Garamond */}
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Rubik Mono One */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap"
          rel="stylesheet"
        />

        {/* Frmwrk Tracking Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "j7qzcd7z4a");
          `,
          }}
        ></script>
        {/* End Frmwrk Tracking Code */}
      </Head>
    </>
  )
}
