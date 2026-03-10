import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogo from '@/public/logo/destinasian-logo.png'
import styles from './CategoryHeader.module.scss'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function CategoryHeader({ isScrolled }) {
  const isDesktop = useMediaQuery({ minWidth: 768 })

  return (
    <header className={cx('component', { sticky: isScrolled })}>
      <div className={cx('navbar', { sticky: isScrolled })}>
        {/* DA logo */}
        <div className={cx('brand')}>
          <Link href="/">
            <Image
              src={destinasianLogo.src}
              alt="Destinasian Logo"
              fill
              sizes="100%"
              priority
              quality={100}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
