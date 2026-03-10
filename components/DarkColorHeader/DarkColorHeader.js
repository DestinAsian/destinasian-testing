import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoWht from '@/public/logo/destinasianLogoWht.png'
import styles from './DarkColorHeader.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function DarkColorHeader({ isScrolled }) {
  return (
    <header className={cx('component', { sticky: isScrolled })}>
      <div className={cx('navbar')}>
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            <Image
              src={destinasianLogoWht.src}
              alt="Destinasian Logo"
              fill
              sizes="100%"
              priority
              quality={100}
            />
          </div>
        </Link>
      </div>
    </header>
  )
}
