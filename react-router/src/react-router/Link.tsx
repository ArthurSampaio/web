import React, { FC } from "react"

type LinkProps = {
  to: string
  replace?: boolean
  children: React.ReactNode
}
const event = new Event("urlchanged")

const historyPush = (path: string) => {
  window.history.pushState({}, "", path)
}

const historyReplace = (path: string) => {
  window.history.replaceState({}, "", path)
}

export const Link: FC<LinkProps> = ({ to, replace, children }) => {
  const handleClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    ev.preventDefault()
    console.log("Chiclou em ", to)
    window.dispatchEvent(event)

    replace ? historyReplace(to) : historyPush(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
