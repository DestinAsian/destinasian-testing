import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogo from '@/assets/logo/destinasian-logo.png'
import styles from './SingleHeader.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function SingleHeader({ isScrolled }) {
  return (
    <header className={cx('component', { sticky: isScrolled })}>
      <div className={cx('navbar', { sticky: isScrolled })}>
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
