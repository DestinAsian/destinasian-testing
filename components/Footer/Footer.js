import classNames from 'classnames/bind'
import { Container } from '..'
import styles from './Footer.module.scss'

// DAMG Logo
import daiLogo from '../../assets/logo/DAI_logo.png'
import damanLogo from '../../assets/logo/DAMAN_logo.png'
import prsLogo from '../../assets/logo/Prestige_logo.png'
import scop3Logo from '../../assets/logo/Scop3_logo.png'
import Image from "next/image"

let cx = classNames.bind(styles)

export default function Footer() {
  const aboutUri = '/about'
  const privacyUri = '/privacy-policy'
  const contactUri = '/contact'
  const socialUri = '/socials'

  return (
    <footer className={cx('component')}>
      <Container>
        <div
          className={cx('footer-wrapper')}
          dangerouslySetInnerHTML={{
            __html: `<div id="mc_embed_shell">
            <div id="mc_embed_signup">
              <form
              action="https://destinasian.us5.list-manage.com/subscribe/post?u=ee44e7f13f448e90776db3877&amp;id=d4a22bd002&amp;f_id=00d7c2e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <h2>Stay inspired with our newsletters</h2>
                  <div class="border-divider"></div>
                  <div class="content-wrapper">
                    <div class="mc-field-wrapper mc-field-group input-group">
                      <ul>
                        <li>
                          <div class="container-check">
                            <input
                              type="checkbox"
                              name="group[7601][4]"
                              id="mce-group[7601]-7601-2"
                              value=""
                              class="checkbox-button"
                              checked="checked"
                            /><label for="mce-group[7601]-7601-2">Travel News</label>
                          </div>
                        </li>
                        <li>
                          <div class="container-check">
                            <input
                              type="checkbox"
                              name="group[7601][1]"
                              id="mce-group[7601]-7601-0"
                              value=""
                              class="checkbox-button"
                            /><label for="mce-group[7601]-7601-0">Airline News</label>
                          </div>
                        </li>
                        <li>
                          <div class="container-check">
                            <input
                              type="checkbox"
                              name="group[7601][2]"
                              id="mce-group[7601]-7601-1"
                              value=""
                              class="checkbox-button"
                            /><label for="mce-group[7601]-7601-1">Contests/Partner Offers</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="mc-field-wrapper mc-field-group-two-column">
                      <div class="mc-field-group mc-field-email">
                        <input
                          type="email"
                          name="EMAIL"
                          class="required text-form email"
                          id="mce-EMAIL"
                          required=""
                          value=""
                          placeholder="Email address"
                        />
                        
                      </div>
                      <div class="clear">
                        <input
                          type="submit"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          class="submit-button"
                          value="Subscribe"
                        />
                      </div>
                    </div>
                    <div id="mce-responses" class="clearfalse">
                      <div
                        class="response"
                        id="mce-error-response"
                        style="display: none"
                      ></div>
                      <div
                        class="response"
                        id="mce-success-response"
                        style="display: none"
                      ></div>
                    </div>
                    <div aria-hidden="true" style="position: absolute; left: -5000px">
                      <input
                        type="text"
                        name="b_ee44e7f13f448e90776db3877_d4a22bd002"
                        tabindex="-1"
                        value=""
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          `,
          }}
        />
      </Container>
      <div className={cx('menu-wrapper')}>
        <a href={aboutUri}>
          <h2>{'About'}</h2>
        </a>
        <a href={privacyUri}>
          <h2>{'Privacy Policy'}</h2>
        </a>
        <a href={contactUri}>
          <h2>{'Contact'}</h2>
        </a>
        <a href={socialUri}>
          <h2>{'Socials'}</h2>
        </a>
      </div>
      <div className={cx('menu-wrapper')}>
        <div className={cx('copyright-wrapper')}>
          <h5>
            {'Copyright '}&copy;{' 2023'}
          </h5>
        </div>
        <div className={cx('logo-wrapper')}>
          <a href={'https://destinasian.co.id/'}>
            <Image src={daiLogo.src} alt="Destinasian Indonesia Logo" fill sizes="100vw" />
          </a>
        </div>
        <div className={cx('logo-wrapper')}>
          <a href={'https://daman.co.id/'}>
            <Image src={damanLogo.src} alt="DaMan Logo" fill sizes="100vw" />
          </a>
        </div>
        <div className={cx('logo-wrapper')}>
          <a href={'https://www.prestigeonline.com/id/'}>
            <Image src={prsLogo.src} alt="Prestige Logo" fill sizes="100vw" />
          </a>
        </div>
        <div className={cx('logo-wrapper')}>
          <a href={'https://scop3group.com/'}>
            <Image src={scop3Logo.src} alt="Scop3Group Logo" fill sizes="100vw" />
          </a>
        </div>
      </div>
    </footer>
  );
}
