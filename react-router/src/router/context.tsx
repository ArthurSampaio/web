import React, { useEffect, useState, Fragment } from "react"

type RouterContextType = {}

const RouterContext = React.createContext<RouterContextType | undefined>(
  undefined
)

type RouteProviderProps = {
  children: React.ReactNode
}

export const RouterProvider = ({ children }: RouteProviderProps) => {
  const [key, setKey] = useState(0)
  const urlChanged = () => {
    setKey((k) => k + 1)
  }

  useEffect(() => {
    window.addEventListener("popstate", urlChanged)
    window.addEventListener("urlchanged", urlChanged)
    return () => {
      window.removeEventListener("popstate", urlChanged)
      window.removeEventListener("urlchanged", urlChanged)
    }
  }, [])

  return (
    <RouterContext.Provider value={undefined}>
      <Fragment key={key}>{children}</Fragment>
    </RouterContext.Provider>
  )
}
