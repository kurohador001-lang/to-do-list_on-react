import { useRef } from "react"

const useIncompleteTaskScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => isDone === false)?.id

  return {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  }
}

export default useIncompleteTaskScroll