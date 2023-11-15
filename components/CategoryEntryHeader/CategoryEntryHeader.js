import className from 'classnames/bind'
import { Heading, Container } from '..'
import styles from './CategoryEntryHeader.module.scss'
import Image from "next/image"

let cx = className.bind(styles)

// Adjust the maximum length as needed
// const MAX_DESCRIPTION_LENGTH = 300

export default function CategoryEntryHeader({
  parent,
  title,
  image,
  description,
  className,
  children,
}) {
  const hasText = title
  // cut description string
  // let trimmedDescription = '';

  // if (children.length !== 0) {
  //   trimmedDescription = description.substring(0, MAX_DESCRIPTION_LENGTH);
  //   const lastSpaceIndex = trimmedDescription.lastIndexOf(' ');

  //   if (lastSpaceIndex !== -1) {
  //     trimmedDescription = trimmedDescription.substring(0, lastSpaceIndex) + '...';
  //   }

  // }

  return (
    <div className={cx(['component', className])}>
      <div className={cx('container-wrapper')}>
        {hasText && (
          <div className={cx('text', { 'has-image': image })}>
            <Container>
              {!!title && (
                <Heading className={cx('title')}>
                  {parent || null} {title}
                </Heading>
              )}
              {image && (
                <figure className={cx('image')}>
                  <Image src={image} alt={title} fill sizes="100vw" />
                </figure>
              )}
              {children.length !== 0 && (
                <p className={cx('description')}>{description}</p>
              )}
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}
