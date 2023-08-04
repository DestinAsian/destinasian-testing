import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import '../components/SingleSlider/SingleSlider.css';
import '../components/SingleEditorialSlider/SingleEditorialSlider.css';
import '../components/SingleAdvertorialSlider/SingleAdvertorialSlider.css';
import '../components/SingleHCSlider/SingleHCSlider.css';
import '../components/Footer/Footer.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <Component {...pageProps} key={router.asPath} />
    </FaustProvider>
  );
}
