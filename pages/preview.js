import { WordPressTemplate } from '@faustwp/core'
import { useAuth } from '@faustwp/core'
import { Button } from '../components'

export default function Preview(props) {
  const { isAuthenticated, isReady, loginUrl } = useAuth()

  if (!isReady) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  if (isAuthenticated === true) {
    return (
      <>
        <WordPressTemplate {...props} />
        {console.log(props)}
      </>
    )
  }

  return (
    <>
      <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
        You need to login first!
      </div>
      <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
        <Button className="gap-x-4	">
          <a href={loginUrl}>Login</a>
        </Button>
      </div>
    </>
  )
}
