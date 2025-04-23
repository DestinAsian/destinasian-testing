import React from 'react'

export default function NewsletterEmbed() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div id="mc_embed_shell">
          <div id="mc_embed_signup">
            <form action="https://destinasian.us5.list-manage.com/subscribe/post?u=ee44e7f13f448e90776db3877&amp;id=d4a22bd002&amp;f_id=00d7c2e1f0" 
              method="post" target="_blank" class="validate">
              <div id="mc_embed_signup_scroll">
                <h2>Stay inspired with our DestinAsian newsletters</h2>
                <div class="divider"></div>
                <div class="content-wrapper">
                  <div class="mc-field-wrapper mc-field-group input-group">
                    <ul>
                      <li>
                        <div class="container-check">
                          <input type="checkbox" name="group[7601][4]" id="mce-group[7601]-7601-2" class="checkbox-button" checked>
                          <label for="mce-group[7601]-7601-2">Travel News</label>
                        </div>
                      </li>
                      <li>
                        <div class="container-check">
                          <input type="checkbox" name="group[7601][1]" id="mce-group[7601]-7601-0" class="checkbox-button">
                          <label for="mce-group[7601]-7601-0">Airline News</label>
                        </div>
                      </li>
                      <li>
                        <div class="container-check">
                          <input type="checkbox" name="group[7601][2]" id="mce-group[7601]-7601-1" class="checkbox-button">
                          <label for="mce-group[7601]-7601-1">Contests/Partner Offers</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="mc-field-wrapper mc-field-group-two-column">
                    <div class="mc-field-group mc-field-email">
                      <input type="email" name="EMAIL" class="required text-form email" id="mce-EMAIL" required placeholder="Email address">
                    </div>
                    <div class="clear">
                      <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="submit-button" value="Subscribe">
                    </div>
                  </div>
                </div>
                <div id="mce-responses" class="clearfalse">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <div aria-hidden="true" style="position:absolute;left:-5000px">
                  <input type="text" name="b_ee44e7f13f448e90776db3877_d4a22bd002" tabindex="-1" value="">
                </div>
              </div>
            </form>
          </div>
        </div>
        `,
      }}
    />
  )
}
