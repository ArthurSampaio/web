import React, {
  useEffect,
  useState,
  Fragment,
  useMemo,
  useContext,
} from "react"

type RouterContextType = {
  location: typeof window.location
}

export const RouterContext = React.createContext<RouterContextType | undefined>(
  undefined
)

type RouteProviderProps = {
  children: React.ReactNode
}

export const RouterProvider = ({ children }: RouteProviderProps) => {
  const [key, setKey] = useState(0)
  const [location, setLocation] = useState(window.location)
  const urlChanged = () => {
    setKey((k) => k + 1)
    setLocation(window.location)
  }

  useEffect(() => {
    window.addEventListener("popstate", urlChanged)
    window.addEventListener("urlchanged", urlChanged)
    return () => {
      window.removeEventListener("popstate", urlChanged)
      window.removeEventListener("urlchanged", urlChanged)
    }
  }, [])

  const value = useMemo(
    () => ({
      location,
    }),
    [location]
  )

  return (
    <RouterContext.Provider value={value}>
      <Fragment key={key}>{children}</Fragment>
    </RouterContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error("useLocation must be used within an <RouterProvider />")
  }

  return context.location
}
