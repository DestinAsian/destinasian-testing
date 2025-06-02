import {
  Bodoni_Moda,
  EB_Garamond,
  Poppins,
  Rubik,
  Rubik_Mono_One,
} from 'next/font/google'

export const bodoni_moda = Bodoni_Moda({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--bodoni--moda',
})

export const eb_garamond = EB_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--eb--garamond',
})

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--poppins',
})

export const rubik = Rubik({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--rubik',
})

export const rubik_mono_one = Rubik_Mono_One({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font--rubik--mono--one',
})
