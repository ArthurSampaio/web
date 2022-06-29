import React, { Suspense, useState } from "react"
import { ListResource } from "./ResourceApi"
import "./App.css"
import { List } from "./List"
import { ErrorBoundary } from "./ErrorBoundary"
import logo from "./logo.svg"

const initialListResource = ListResource()

function App() {
  const [listResource, setListResource] = useState(initialListResource)
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

export default App
