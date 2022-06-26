import type { Resource } from "./ResourceApi"
import type { Person } from "./type"

type ListProps = Resource<Person[], "list">

export const List = ({ resource }: { resource: ListProps }) => {
  const result = resource.list.read()

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

  return (
    <table className="table-fixed">
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
