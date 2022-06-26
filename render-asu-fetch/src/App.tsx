import React, { Suspense } from "react"
import { ListResource } from "./ResourceApi"
import "./App.css"
import { List } from "./List"

const listResource = ListResource()

function App() {
  return (
    <div className="text-center">
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <main>
        <p>Main</p>
        <Suspense fallback={<h4>loading</h4>}>
          <div className="w-full min-w2-[90%] flex items-center justify-center mt-7">
            <List resource={listResource} />
          </div>
        </Suspense>
      </main>
    </div>
  )
}

export default App
