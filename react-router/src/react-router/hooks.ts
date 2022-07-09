import React, { useContext } from "react"
import { RouterContext } from "./context"

export const useLocation = () => {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error("useLocation must be used within an <RouterProvider />")
  }

  return context.location
}
