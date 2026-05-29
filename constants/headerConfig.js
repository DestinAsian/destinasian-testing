import destinasianLogoBlk from '@/public/logo/destinasian-logo.png'
import destinasianLogoWht from '@/public/logo/destinasianLogoWht.png'

export const HEADER_LOGOS = {
  default: destinasianLogoWht,
  sticky: destinasianLogoBlk,
}

export const HEADER_NAV_INITIAL_STATE = {
  isSearchBarShown: false,
  isMagNavShown: false,
  isGuidesNavShown: false,
  isHCNavShown: false,
  isCustomNavShown: false,
  isBurgerNavShown: false,
}

export const HEADER_REF_KEYS = {
  SEARCH: 'searchRef',
  GUIDES: 'guidesRef',
  MAGAZINE: 'magazineRef',
  CUSTOM: 'customRef',
  HC: 'hcRef',
  BURGER: 'burgerRef',
  MENU: 'menuRef',
}