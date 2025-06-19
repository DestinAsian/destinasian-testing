import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoOrange from '@/assets/logo/destinasian-logo-orange.png'
import styles from './LLHeader.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function LLHeader({ isScrolled }) {
  return (
    <header className={cx('component', { sticky: isScrolled })}>
      <div className={cx('navbar')}>
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            <Image
              src={destinasianLogoOrange.src}
              alt="Destinasian Logo"
              fill
              sizes="100%"
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  )
}
