import React, { Suspense, useState, useEffect } from "react"
import { ListResource } from "./ResourceApi"
import { List } from "./List"
import { ErrorBoundary } from "../ErrorBoundary"
import logo from "../../logo.svg"

// const initialListResource = ListResource()

export function Dashboard() {
  const [listResource, setListResource] = useState<any>({
    list: {
      read() {
        return []
      },
    },
  })

  useEffect(() => {
    setListResource(ListResource())
  }, [])

  const [errorKey, setErrorKey] = useState(0)

  return (
    <div className="text-center">
      <header>
        <p>Render as You fetch</p>
      </header>
      <main>
        <p>Main</p>
        <button
          className="bg-gray-500 text-white"
          onClick={() => {
            setListResource(ListResource())
            setErrorKey((errorKey) => errorKey + 1)
          }}
        >
          Click me to reload
        </button>{" "}
        <ErrorBoundary key={errorKey}>
          <Suspense
            fallback={
              <div className="flex mt-14 justify-center items-center flex-col">
                <strong>Loading</strong>
                <img
                  src={logo}
                  width="100"
                  height="100"
                  className="App-logo"
                  alt="logo"
                />
              </div>
            }
          >
            <div className="w-full min-w2-[90%] flex items-center justify-center mt-7">
              <List resource={listResource} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}
