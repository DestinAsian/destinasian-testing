import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoBlk from '@/assets/logo/destinasian-logo.png'
// import destinasianLogoWht from '../../assets/logo/destinasianLogoWht.png'
import destinasianLogoOrange from '@/assets/logo/destinasian-logo-orange.png'
import styles from './HomepageHeader.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function HomepageHeader({ isScrolled }) {
  return (
    <header className={cx('component')}>
      <div className={cx('navbar', { sticky: isScrolled })}>
        {/* DA logo */}
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            {isScrolled ? (
              <Image
                src={destinasianLogoOrange.src}
                alt="Destinasian Logo"
                fill
                sizes="100%"
                priority
              />
            ) : (
              <Image
                src={destinasianLogoOrange.src}
                alt="Destinasian Logo"
                fill
                sizes="100%"
                priority
              />
            )}
          </div>
        </Link>
      </div>
    </header>
  )
}
