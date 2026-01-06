import classNames from 'classnames/bind'
import styles from './BurgerFullMenu.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const NavigationMenu = dynamic(() =>
  import('@/components/NavigationMenu/NavigationMenu'),
)

let cx = classNames.bind(styles)

export default function BurgerFullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  menusLoading,
  latestLoading,
  latestPartnerContent,
  latestPartnerContentLoading,
  isSearchResultsVisible,
  customClassName,
  burgerRef,
}) {
  // LatestStories content
  const [visiblePosts] = useState(5)

  // Socmed Uri
  const videoUri = '/videos'
  const linkedInUri = 'https://www.linkedin.com/company/destinasian-media'
  const facebookUri = 'https://www.facebook.com/DestinAsian.Mag'
  const instagramUri = 'https://www.instagram.com/destinasianmagazine'
  const twitterUri = 'https://x.com/DestinAsian_Mag'

  // Loading Menu
  if (menusLoading || latestLoading || latestPartnerContentLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div
        className={cx(
          'full-menu-content',
          {
            searchVisible: isSearchResultsVisible,
          },
          customClassName,
        )}
      >
        <div ref={burgerRef} className={cx('menu-wrapper')}>
          <div className={cx('first-wrapper')}>
            {/* Feature Menu */}
            <NavigationMenu
              className={cx('feature-navigation')}
              menuItems={featureMenuItems}
            />
          </div>
          <div className={cx('second-wrapper')}>
            {/* Latest Travel Stories */}
            {latestStories?.length !== 0 && (
              <nav className={cx('latest-stories')}>
                <ul className="menu-name">{'Travel Stories'}</ul>
                <ul className={cx('menu-content')}>
                  {latestStories.slice(0, visiblePosts).map((post) => (
                    <li key={post?.id}>
                      {post?.uri && (
                        <Link href={post?.uri} className={cx('menu-item')}>
                          {post?.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          <div className={cx('third-wrapper')}>
            <span className={cx('menu-name')}>{'Partner Content Stories'}</span>
            <div className={cx('column-wrapper')}>
              <div className={cx('left-column')}>
                {/* Latest Partner Content */}
                {latestPartnerContent?.length !== 0 && (
                  <nav className={cx('latest-stories')}>
                    <ul className={cx('menu-content')}>
                      {latestPartnerContent
                        .slice(0, visiblePosts)
                        .map((post) => (
                          <li key={post?.id}>
                            {post?.uri && (
                              <Link
                                href={post?.uri}
                                className={cx('menu-item')}
                              >
                                {post?.title}
                              </Link>
                            )}
                          </li>
                        ))}
                    </ul>
                  </nav>
                )}
              </div>
              <div className={cx('right-column')}>
                {/* Secondary Menu {Special Sections Menu} */}
                <NavigationMenu
                  className={cx('secondary-navigation')}
                  menuItems={secondaryMenuItems}
                />
              </div>
            </div>
          </div>
          <div className={cx('fourth-wrapper')}>
            {/* Destinations Menu */}
            <NavigationMenu
              className={cx('primary-navigation')}
              menuItems={primaryMenuItems}
            />
          </div>
          <div className={cx('fifth-wrapper')}>
            {/* Third Menu {Luxe List Menu} */}
            <NavigationMenu
              className={cx(['third-navigation'])}
              menuItems={thirdMenuItems}
            />
            {/* Readers' Choice Awards Menu */}
            <NavigationMenu
              className={cx('fourth-navigation')}
              menuItems={fourthMenuItems}
            />
          </div>
          <div className={cx('sixth-wrapper')}>
            <div className={cx('socmed-wrapper')}>
              {linkedInUri && (
                <Link href={linkedInUri} target="_blank">
                  <div className={cx('socmed-icon')}>
                    {/* Linkedin Icon */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM11.5216 19.8778H16.9605V36.2196H11.5216V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM30.3131 19.4941C33.8922 19.4941 36.5754 21.8303 36.5754 26.8497L36.5752 36.2196H31.1365V27.4767C31.1365 25.2807 30.3494 23.7822 28.3805 23.7822C26.8779 23.7822 25.9829 24.7924 25.5898 25.7682C25.446 26.1178 25.4107 26.605 25.4107 27.0934V36.22H19.9711C19.9711 36.22 20.0428 21.4117 19.9711 19.8783H25.4107V22.1929C26.1325 21.0802 27.4254 19.4941 30.3131 19.4941Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </Link>
              )}
              {facebookUri && (
                <Link href={facebookUri} target="_blank">
                  <div className={cx('socmed-icon')}>
                    {/* FB Icon */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM26.5016 25.0542V38.1115H21.0991V25.0547H18.4V20.5551H21.0991V17.8536C21.0991 14.1828 22.6231 12 26.9532 12H30.5581V16.5001H28.3048C26.6192 16.5001 26.5077 17.1289 26.5077 18.3025L26.5016 20.5546H30.5836L30.1059 25.0542H26.5016Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </Link>
              )}
              {instagramUri && (
                <Link href={instagramUri} target="_blank">
                  <div className={cx('socmed-icon')}>
                    {/* IG Icon */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM18.7233 11.2773C20.0886 11.2152 20.5249 11.2 24.0012 11.2H23.9972C27.4746 11.2 27.9092 11.2152 29.2746 11.2773C30.6373 11.3397 31.5679 11.5555 32.384 11.872C33.2266 12.1987 33.9386 12.636 34.6506 13.348C35.3627 14.0595 35.8 14.7736 36.128 15.6155C36.4427 16.4294 36.6587 17.3595 36.7227 18.7222C36.784 20.0876 36.8 20.5238 36.8 24.0001C36.8 27.4764 36.784 27.9116 36.7227 29.277C36.6587 30.6391 36.4427 31.5695 36.128 32.3837C35.8 33.2253 35.3627 33.9394 34.6506 34.6509C33.9394 35.3629 33.2264 35.8013 32.3848 36.1283C31.5703 36.4448 30.6391 36.6605 29.2765 36.7229C27.9111 36.7851 27.4762 36.8003 23.9996 36.8003C20.5236 36.8003 20.0876 36.7851 18.7222 36.7229C17.3598 36.6605 16.4294 36.4448 15.615 36.1283C14.7736 35.8013 14.0595 35.3629 13.3483 34.6509C12.6365 33.9394 12.1992 33.2253 11.872 32.3834C11.5557 31.5695 11.34 30.6394 11.2773 29.2767C11.2155 27.9114 11.2 27.4764 11.2 24.0001C11.2 20.5238 11.216 20.0873 11.2771 18.7219C11.3384 17.3598 11.5544 16.4294 11.8717 15.6152C12.1997 14.7736 12.6371 14.0595 13.3491 13.348C14.0606 12.6363 14.7747 12.1989 15.6166 11.872C16.4305 11.5555 17.3606 11.3397 18.7233 11.2773Z"
                        fill="black"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.853 13.5067C23.0759 13.5064 23.3158 13.5065 23.5746 13.5066L24.0013 13.5067C27.4189 13.5067 27.824 13.519 29.1736 13.5803C30.4216 13.6374 31.0989 13.8459 31.5501 14.0211C32.1475 14.2531 32.5733 14.5305 33.0211 14.9785C33.4691 15.4265 33.7464 15.8532 33.979 16.4505C34.1542 16.9012 34.363 17.5785 34.4198 18.8265C34.4811 20.1759 34.4944 20.5812 34.4944 23.9972C34.4944 27.4133 34.4811 27.8186 34.4198 29.168C34.3627 30.416 34.1542 31.0933 33.979 31.544C33.747 32.1413 33.4691 32.5667 33.0211 33.0144C32.5731 33.4624 32.1477 33.7398 31.5501 33.9718C31.0995 34.1478 30.4216 34.3558 29.1736 34.4128C27.8242 34.4742 27.4189 34.4875 24.0013 34.4875C20.5834 34.4875 20.1783 34.4742 18.8289 34.4128C17.5809 34.3552 16.9036 34.1467 16.4521 33.9715C15.8548 33.7395 15.4281 33.4621 14.9801 33.0141C14.5321 32.5661 14.2548 32.1405 14.0222 31.5429C13.847 31.0923 13.6382 30.4149 13.5814 29.1669C13.5201 27.8176 13.5078 27.4122 13.5078 23.994C13.5078 20.5759 13.5201 20.1727 13.5814 18.8233C13.6385 17.5753 13.847 16.898 14.0222 16.4468C14.2542 15.8494 14.5321 15.4228 14.9801 14.9748C15.4281 14.5268 15.8548 14.2494 16.4521 14.0169C16.9033 13.8409 17.5809 13.6329 18.8289 13.5755C20.0097 13.5222 20.4674 13.5062 22.853 13.5035V13.5067ZM30.8339 15.6321C29.9859 15.6321 29.2978 16.3193 29.2978 17.1676C29.2978 18.0156 29.9859 18.7036 30.8339 18.7036C31.6819 18.7036 32.3699 18.0156 32.3699 17.1676C32.3699 16.3196 31.6819 15.6316 30.8339 15.6316V15.6321ZM17.4279 24.0002C17.4279 20.3701 20.3709 17.4269 24.001 17.4268C27.6312 17.4268 30.5736 20.37 30.5736 24.0002C30.5736 27.6304 27.6314 30.5723 24.0013 30.5723C20.3711 30.5723 17.4279 27.6304 17.4279 24.0002Z"
                        fill="black"
                      ></path>
                      <path
                        d="M24.0012 19.7334C26.3575 19.7334 28.2679 21.6436 28.2679 24.0001C28.2679 26.3564 26.3575 28.2668 24.0012 28.2668C21.6447 28.2668 19.7345 26.3564 19.7345 24.0001C19.7345 21.6436 21.6447 19.7334 24.0012 19.7334Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </Link>
              )}
              {twitterUri && (
                <Link href={twitterUri} target="_blank">
                  <div className={cx('socmed-icon')}>
                    {/* X Icon with Transparent Cutout */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="black"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="
      M256 0
      C397.385 0 512 114.615 512 256
      C512 397.385 397.385 512 256 512
      C114.615 512 0 397.385 0 256
      C0 114.615 114.615 0 256 0Z

      M318.64 157.549H352.041L279.068 240.956L364.918 354.451H297.696L245.049 285.615L184.807 354.451H151.384L229.436 265.239L147.082 157.549H216.006L263.596 220.466L318.64 157.549ZM306.916 334.457H325.426L205.95 176.493H186.09L306.916 334.457Z
    "
                      />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className={cx('seventh-wrapper')}>
            {/* Fifth Menu {Others Menu} */}
            <NavigationMenu
              className={cx(['fifth-navigation'])}
              menuItems={fifthMenuItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
