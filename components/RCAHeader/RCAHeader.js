import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoWht from '../../assets/logo/destinasianLogoWht.png'
import styles from './RCAHeader.module.scss'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function RCAHeader({ isNavShown, isRCANavShown, isScrolled }) {
  // const isParent = parent == null
  const navShown = isNavShown && !isRCANavShown
  const rcaNavShown = isRCANavShown && !isNavShown
  const twoNavShown = isNavShown && isRCANavShown

  return (
    <header
      className={cx('component', {
        sticky: isScrolled,
        // parentColor: isParent,
        navShown: navShown,
        rcaNavShown: rcaNavShown,
        twoNavShown: twoNavShown,
      })}
    >
      <div className={cx('navbar')}>
        {/* DA logo */}
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            <Image
              src={destinasianLogoWht.src}
              alt="Destinasian Logo"
              fill
              sizes="100%"
              priority
              className={cx('white-logo')}
            />
          </div>
        </Link>
      </div>
    </header>
  )
}
