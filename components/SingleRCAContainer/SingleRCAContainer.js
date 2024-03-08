import Image from 'next/image'
import styles from './SingleRCAContainer.module.scss'

export default function SingleRCAContainer({ children, parent, image }) {
  const isParent = parent == null

  return (
    <>
      {isParent ? (
        <div className={styles.component}>
          <Image src={image} alt={'RCA Image'} fill sizes="100%" priority />
          {children}
        </div>
      ) : (
        <div className={styles.component}>{children}</div>
      )}
    </>
  )
}
