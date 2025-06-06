import useHecklesSeverity from '../apis/use-heckles-severity'
import useUserData from '../apis/use-user-data'
import SpeechBubble from './SpeechBubble'

interface Props {
  userId: number | undefined
  avatarId: number | null | undefined
  urgency: number | undefined
}

export default function OneHeckle(props: Props) {
  const { data: user, isPending, error } = useUserData(props.userId)
  const {
    data: heckles,
    isPending: isHecklesPending,
    error: hecklesError,
  } = useHecklesSeverity(props.urgency)

  if (isPending || isHecklesPending) {
    return <h2>Loading...</h2>
  }
  if (error || hecklesError) {
    return <h2>Error</h2>
  }
  if (!user) {
    return <h2>No user data found</h2>
  }
  if (!heckles) {
    return <h2>No heckles data found</h2>
  }

  const filteredHeckles = heckles.filter(
    (heckle) => heckle.avatarId === props.avatarId,
  )
  let randomHeckle = null

  if (filteredHeckles.length > 0) {
    const randomChoice = Math.floor(Math.random() * filteredHeckles.length)
    randomHeckle = filteredHeckles[randomChoice]
  }

  return <>{randomHeckle && <SpeechBubble message={randomHeckle?.heckle} />}</>
}
