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
          <div className="w-full">
            <List resource={listResource} />
          </div>
        </Suspense>
      </main>
    </div>
  )
}

const List = ({ resource }: { resource: typeof listResource }) => {
  const result = resource.list.read()
  console.log({ result })

  const persons = result.map(({ location, name: { title, first, last } }) => ({
    name: `${title} ${first} ${last}`,
    location: {
      street: `${location.street.name}, ${location.street.number}`,
      city: location.city,
      country: location.country,
    },
  }))

  const personTable = persons.map((person) => ({
    name: person.name,
    streetName: person.location.street,
    city: person.location.city,
    country: person.location.country,
  }))

  const headers = Object.keys(personTable[0])
  console.log({ headers })

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {personTable.map((person) => {
          return (
            <tr>
              {headers.map((h: string) => {
                return <td>{person[h as keyof typeof person]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default App
