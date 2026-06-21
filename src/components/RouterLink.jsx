const RouterLink = (props) => {
  const {
    to,
    children,
    ...rest
  } = props

  const onCLick = (event) => {
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a href={to} onClick={onCLick} {...rest}>
      {children}
    </a>
  )
}

export default RouterLink