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
  console.log("List", { result })
  const [focusedHead, setFocusedHead] = useState({
    sorting: "default",
    header: "",
  })
  const [term, setTerm] = useState("")

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

  const filterPersonTableByTerm = (personTable: PersonOnTable[]) => {
    const filteredData = personTable.filter((p) => {
      if (term) {
        return Object.values(p).some((str) =>
          str.toLocaleLowerCase().includes(term)
        )
      }
      return true
    })
    return filteredData
  }

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

  const getHeader = (header: Header) => {
    if (focusedHead.header === header) {
      switch (focusedHead.sorting) {
        case "default":
          return (
            <span className="underline underline-offset-4 px-3 min-w-[10rem] ">
              {header}
            </span>
          )
        case "ascending":
          return (
            <span className="bg-green-700 text-white px-3 min-w-[10rem]">
              {header}
            </span>
          )
        default:
          return (
            <span className="bg-fuchsia-800 text-white px-3	min-w-[10rem]">
              {header}
            </span>
          )
      }
    }
    return <span className="min-w-[10rem] px-3">{header}</span>
  }

  console.log("here")
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4">
        {term}
        <input
          className="border "
          onChange={(ev) => setTerm(ev.target.value)}
        />
      </div>
      <table className="table-fixed min-w-[80%] w-[80%]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                onClick={() => {
                  setFocusedHead(calcNextHeader(h))
                }}
              >
                {getHeader(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterPersonTableByTerm(personTable).map((person) => {
            return (
              <tr key={person.name}>
                {headers.map((h: string) => {
                  return (
                    <td className="min-w-[10rem]" key={h}>
                      {person[h as keyof typeof person]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
