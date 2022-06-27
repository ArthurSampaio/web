import type { Resource } from "./ResourceApi"
import type { Person } from "./type"
import { useState } from "react"

type ListProps = Resource<Person[], "list">

type SortingType = "default" | "ascending" | "descending"

type FocusedHead = {
  header: string
  sorting: SortingType
}

export const List = ({ resource }: { resource: ListProps }) => {
  const result = resource.list.read()
  const [focusedHead, setFocusedHead] = useState({
    sorting: "default",
    header: "",
  })

  const persons = result.map(({ location, name: { title, first, last } }) => ({
    name: `${title} ${first} ${last}`,
    location: {
      street: `${location.street.name}, ${location.street.number}`,
      city: location.city,
      country: location.country,
    },
  }))
  type PersonOnTable = typeof personTable[0]
  type Header = keyof PersonOnTable

  const personTable = persons
    .map((person) => ({
      name: person.name,
      streetName: person.location.street,
      city: person.location.city,
      country: person.location.country,
    }))
    .sort((a: PersonOnTable, b: PersonOnTable) => {
      const { sorting } = focusedHead as FocusedHead
      const header = focusedHead.header as Header
      if (!header) return 0
      switch (sorting) {
        case "descending":
          if (a[header] < b[header]) {
            return 1
          }
          if (a[header] > b[header]) {
            return -1
          }
          return 0
        case "ascending":
          if (a[header] < b[header]) {
            return -1
          }
          if (a[header] > b[header]) {
            return 1
          }
          return 0
        default:
          return 0
      }
    })

  const calcNextHeader = (header: Header): FocusedHead => {
    if (header === focusedHead.header) {
      switch (focusedHead.sorting) {
        case "default":
          return {
            sorting: "ascending",
            header,
          }
        case "ascending":
          return {
            sorting: "descending",
            header,
          }
        default:
          return {
            sorting: "default",
            header,
          }
      }
    } else {
      return {
        header,
        sorting: "default",
      }
    }
  }

  const headers = Object.keys(personTable[0]) as Header[]
  console.log({ focusedHead })

  const getHeader = (header: Header) => {
    if (focusedHead.header === header) {
      switch (focusedHead.sorting) {
        case "default":
          return <span className="underline underline-offset-4">{header}</span>
        case "ascending":
          return <span className="bg-green-700 text-white">{header}</span>
        default:
          return <span className="bg-fuchsia-800 text-white	">{header}</span>
      }
    }
    return header
  }

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              onClick={() => {
                console.log({ h })
                setFocusedHead(calcNextHeader(h))
              }}
            >
              {getHeader(h)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {personTable.map((person) => {
          return (
            <tr key={person.name}>
              {headers.map((h: string) => {
                return <td key={h}>{person[h as keyof typeof person]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
