import React, { useEffect, useState, Fragment } from "react"

type RouteContextType = {}

const RouteContext = React.createContext<RouteContextType | undefined>(
  undefined
)

type RouteProviderProps = {
  children: React.ReactNode
}

export const RouteProvider = ({ children }: RouteProviderProps) => {
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
    <RouteContext.Provider value={undefined}>
      <Fragment key={key}>{children}</Fragment>
    </RouteContext.Provider>
  )
}
