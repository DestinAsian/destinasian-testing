import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogo from '@/public/logo/destinasian-logo.png'
import styles from './Header.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function Header({ isScrolled, customClassName }) {
  return (
    <header
      className={cx('component', { sticky: isScrolled }, customClassName)}
    >
      <div className={cx('navbar')}>
        {/* DA logo */}
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            <Image
              src={destinasianLogo.src}
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
