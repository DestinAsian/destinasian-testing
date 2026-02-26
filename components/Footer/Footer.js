import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
// DAMG Logo
import daiLogo from '@/public/logo/DAI_logo.png'
import damanLogo from '@/public/logo/DAMAN_logo.png'
import prsLogo from '@/public/logo/Prestige_logo.png'
import scop3Logo from '@/public/logo/Scop3_logo.png'
import NewsletterForm from '../../components/NewsletterMailerLite/NewsletterForm'

let cx = classNames.bind(styles)

export default function Footer() {
  // Static Pages Uri
  const aboutUri = '/about'
  const contactUri = '/contact'
  const newsletterUri = '/newsletter'
  const privacyUri = '/privacy-policy'

  const year = new Date().getFullYear()

  return (
    <footer className={cx('component')}>
      <div className={cx('container-wrapper')}>
        <div className={cx('first-wrapper')}>
          {/* newsletter */}
          <div className={`${styles.newsletterWrapper} mb-12`}>
            <NewsletterForm />
          </div>
        </div>
        <div className={cx('border-divider')}></div>
        <>
          <div className={cx('upper-menu-wrapper')}>
            <div className={cx('upper-left-menu-wrapper')}>
              {aboutUri && (
                <Link href={aboutUri}>
                  <h2>{'About'}</h2>
                </Link>
              )}
              {contactUri && (
                <Link href={contactUri}>
                  <h2>{'Contact'}</h2>
                </Link>
              )}
              {newsletterUri && (
                <Link href={newsletterUri}>
                  <h2>{'Newsletter'}</h2>
                </Link>
              )}
            </div>
          </div>
          <div className={cx('bottom-menu-wrapper')}>
            <div className={cx('left-menu-wrapper')}>
              {privacyUri && (
                <Link href={privacyUri}>
                  <h5 className={cx('privacy-policy')}>{'Privacy Policy'}</h5>
                </Link>
              )}
              <div className={cx('copyright-wrapper')}>
                <h5>
                  {'Copyright '}&copy; {year}
                </h5>
              </div>
            </div>
            <div className={cx('right-menu-wrapper')}>
              <div className={cx('logo-wrapper')}>
                <Link href={'https://destinasian.co.id/'}>
                  <Image
                    src={daiLogo.src}
                    alt="Destinasian Indonesia Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </Link>
              </div>
              <div className={cx('logo-wrapper')}>
                <Link href={'https://daman.co.id/'}>
                  <Image
                    src={damanLogo.src}
                    alt="DaMan Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </Link>
              </div>
              <div className={cx('logo-wrapper')}>
                <Link href={'https://www.prestigeonline.com/id/'}>
                  <Image
                    src={prsLogo.src}
                    alt="Prestige Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </Link>
              </div>
              <div className={cx('logo-wrapper')}>
                <Link href={'https://scop3group.com/'}>
                  <Image
                    src={scop3Logo.src}
                    alt="Scop3Group Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </footer>
  )
}
