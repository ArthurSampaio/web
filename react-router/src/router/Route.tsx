import React, { useEffect, useState } from "react"

type RenderProos = {
  match: Match
}

type RouteProps = {
  exact?: boolean
  component: (args: any) => JSX.Element
  path?: string
  render?: (renderProps: RenderProos) => JSX.Element
}

type Match = {
  url: string
  path: string | null
}

type MathOptions = Pick<RouteProps, "path" | "exact">

const matchPath = (pathName: string, options: MathOptions) => {
  const { exact = false, path } = options

  if (!path) {
    return {
      path: null,
      url: pathName,
      isExact: true,
    }
  }
  const match = new RegExp(`^${path}`).exec(pathName)
  if (!match) {
    return null
  }
  console.log({ match })
  const url = match[0]
  const isExact = pathName === url

  if (exact && !isExact) {
    return null
  }

  return {
    path,
    url,
    isExact,
  }
}

export const Route = ({ exact, component, path, render }: RouteProps) => {
  const match = matchPath(window.location.pathname, { exact, path })

  if (!match) return null

  if (component) {
    console.log({ component })
    return React.createElement(component, { match })
  }

  if (render) {
    return render({ match })
  }
  return null
}
