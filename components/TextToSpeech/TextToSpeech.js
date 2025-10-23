import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import className from 'classnames/bind'
import styles from './TextToSpeech.module.scss'

let cx = className.bind(styles)

export default function TextToSpeech({ content, customClassName }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef(null)
  const router = useRouter()

  // ---- Stop reading when page changes ----
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  // ---- Text-to-Speech Controls ----
  const handleSpeechToggle = () => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech not supported on this browser.')
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    // Extract plain text from HTML for TTS
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const text = doc.body.innerText

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 1
    utterance.pitch = 1
    utteranceRef.current = utterance

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  return (
    <div className={cx('component', customClassName)}>
      {content && (
        <div className={cx('tts-button-wrapper')}>
          <button
            className={cx('tts-button', { speaking: isSpeaking })}
            onClick={handleSpeechToggle}
          >
            {isSpeaking ? '⏸ Pause Reading' : '▶️ Read Aloud'}
          </button>
        </div>
      )}
    </div>
  )
}
