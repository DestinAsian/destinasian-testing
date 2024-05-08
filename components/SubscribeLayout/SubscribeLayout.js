import className from 'classnames/bind'
import styles from './SubscribeLayout.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { GetLatestIssue } from '../../queries/GetLatestIssue'
import { useQuery } from '@apollo/client'
import { ContentWrapperSubscribe } from '../../components'
import { magazine } from './magazine'
import { shipping } from './shipping'

// DA Digital Platform Logo
import pressreaderLogo from '../../assets/logo/da-digital-platform/pressreader-logo.png'
import zinioLogo from '../../assets/logo/da-digital-platform/zinio-logo.png'
import magzterLogo from '../../assets/logo/da-digital-platform/magzter-logo.png'
import tokopediaLogo from '../../assets/logo/da-digital-platform/tokopedia-logo.png'
import gramediaLogo from '../../assets/logo/da-digital-platform/gramedia-logo.png'
import mediaCarrierLogo from '../../assets/logo/da-digital-platform/media-carrier-logo.jpg'
import nookNewstandLogo from '../../assets/logo/da-digital-platform/nook-newstand-logo.png'
import untitledLogo from '../../assets/logo/da-digital-platform/untitled-logo.png'

// Test Image
import testImage from '../../assets/images/example-image.png'

let cx = className.bind(styles)

export default function SubscribeLayout({ databaseId, content }) {
  // Get Latest Issue Images
  const { data, error } = useQuery(GetLatestIssue, {
    variables: {
      id: databaseId,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  const latestIssueImage = data?.page?.subscribeImages?.latestIssue
  const bundleIssueImage = data?.page?.subscribeImages?.bundleIssue

  return (
    <div className={cx('component')}>
      <div className={cx('first-wrapper')}>
        {latestIssueImage && (
          <div className={cx('image-wrapper')}>
            <Image
              src={latestIssueImage?.sourceUrl}
              alt={latestIssueImage?.altText}
              width={latestIssueImage?.mediaDetails?.width}
              height={latestIssueImage?.mediaDetails?.height}
              sizes="100%"
              priority
            />
          </div>
        )}
        {content && (
          <div className={cx('content-wrapper')}>
            <ContentWrapperSubscribe content={content} />
          </div>
        )}
      </div>
      <div className={cx('border-bottom')}></div>
      <div className={cx('second-wrapper')}>
        <div className={cx('title-wrapper')}>
          {'Explore the World with DestinAsian'}
        </div>
        {bundleIssueImage && (
          <div className={cx('image-wrapper')}>
            <Image
              src={bundleIssueImage?.sourceUrl}
              alt={bundleIssueImage?.altText}
              width={bundleIssueImage?.mediaDetails?.width}
              height={bundleIssueImage?.mediaDetails?.height}
              sizes="100%"
              priority
            />
          </div>
        )}
        <form className={cx('subscribe-form')}>
          <label>{'Select your plan'}</label>
          <select defaultValue={'1-year'} required>
            <option value="" disabled selected>
              {'Select Your Subscription Plan'}
            </option>
            {magazine.map((magazine) => (
              <option key={magazine.value} value={magazine.value}>
                {magazine.label}
              </option>
            ))}
          </select>
          <select required>
            <option value="" disabled selected>
              {'Select Your Shipping Country'}
            </option>
            {shipping.map((shipping) => (
              <option key={shipping.value} value={shipping.value}>
                {shipping.label}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className={cx('border-bottom')}></div>
      <div className={cx('third-wrapper')}>
        <div className={cx('title-wrapper')}>
          {'Get your digital downloads here'}
        </div>
        <div className={cx('digital-platform-wrapper')}>
          <div className={cx('logo-wrapper')}>
            <Link href={'https://www.pressreader.com/china/destinasian/'}>
              <Image
                src={pressreaderLogo.src}
                alt="Pressreader Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'https://www.zinio.com/sg/destinasian-m5499/'}>
              <Image
                src={zinioLogo.src}
                alt="Zinio Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link
              href={
                'https://www.magzter.com/ID/DestinAsian-Media-Group/DestinAsian/Travel/'
              }
            >
              <Image
                src={magzterLogo.src}
                alt="Magzter Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'https://www.tokopedia.com/destinasian-magazine/'}>
              <Image
                src={tokopediaLogo.src}
                alt="Tokopedia Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'https://ebooks.gramedia.com/id/majalah/destinasian/'}>
              <Image
                src={gramediaLogo.src}
                alt="Gramedia Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'https://box.media-carrier.de/?b=222084&l=en/'}>
              <Image
                src={mediaCarrierLogo.src}
                alt="Media Carrier Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'#'} className="pointer-events-none">
              <Image
                src={nookNewstandLogo.src}
                alt="Nook Newstand Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
          <div className={cx('logo-wrapper')}>
            <Link href={'#'} className="pointer-events-none">
              <Image
                src={untitledLogo.src}
                alt="Untitled Logo"
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('border-bottom')}></div>
      <div className={cx('fourth-wrapper')}>
        <div className={cx('title-wrapper')}>{'Payment'}</div>
        <div className={cx('image-wrapper')}>
          <Image
            src={testImage.src}
            alt="Test Image"
            fill
            sizes="100%"
            priority
          />
        </div>
      </div>
      <div className={cx('border-bottom')}></div>
      <div className={cx('fifth-wrapper')}>
        <div className={cx('title-wrapper')}>{'Review and Submit'}</div>
        <div className={cx('image-wrapper')}>
          <Image
            src={testImage.src}
            alt="Test Image"
            fill
            sizes="100%"
            priority
          />
        </div>
        <form className={cx('subscribe-form')}>
          <button type="submit">{'Subscribe'}</button>
        </form>
      </div>
      {/* {children} */}
    </div>
  )
}
