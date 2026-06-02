import classNames from 'classnames/bind'
import Link from 'next/link'
import styles from './Header.module.scss'
import Image from 'next/image'
import { HEADER_LOGOS } from '@/constants/headerConfig'

let cx = classNames.bind(styles)

export default function Header({
  isScrolled,
  isBurgerNavShown,
  setIsBurgerNavShown,
  isSearchBarShown,
  setIsSearchBarShown,
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  isCustomNavShown,
  setIsCustomNavShown,
  isHCNavShown,
  setIsHCNavShown,
  setSearchQuery,
  burgerButtonRef,
  customClassName,
}) {
  const logo = HEADER_LOGOS.sticky
  return (
    <header
      className={cx('component', { sticky: isScrolled }, customClassName)}
    >
      <div className={cx('navbar')}>
        {/* DA logo */}
        <Link href="/" className={cx('title')}>
          <div className={cx('brand')}>
            <Image
              src={logo}
              alt="Destinasian Logo"
              fill
              sizes="100%"
              priority
              quality={100}
            />
          </div>
        </Link>
        {/* Burger Button */}
        <button
          ref={burgerButtonRef}
          type="button"
          className={cx(
            'burger-menu-button',
            isBurgerNavShown ? 'active' : '',
            isBurgerNavShown && !isScrolled && 'active-not-scrolled',
          )}
          onClick={() => {
            setIsBurgerNavShown(!isBurgerNavShown)
            isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
            isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
            isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
            isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
            isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
            setSearchQuery('')
          }}
          aria-controls={cx('burger-bar-wrapper')}
          aria-expanded={!isCustomNavShown}
        >
          <div className={cx('burger-icon')}>
            <svg
              width="28"
              height="23"
              viewBox="0 0 28 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="5" fill="#000000" />
              <rect y="9" width="28" height="5" fill="#000000" />
              <rect y="18" width="28" height="5" fill="#000000" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  )
}
