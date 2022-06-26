import React, { Suspense } from "react"
import { ListResource } from "./ResourceApi"
import "./App.css"

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
          <List resource={listResource} />
        </Suspense>
      </main>
    </div>
  )
}

const List = ({ resource }: any) => {
  const result = resource.list.read()
  console.log({ result })
  if (!result) {
    return null
  }
  return <span>{result.length}</span>
}

export default App
