import type { Person } from "./type"

const apiResults = (quantity: number) =>
  `https://randomuser.me/api/?results=${quantity}`

export const fetchResult = (quantity = 20): Promise<Person[]> => {
  return fetch(apiResults(quantity))
    .then((res) => res.json())
    .then((data) => data.results)
}

export const ListResource = () => ({
  list: fetchPromise<Person[]>(fetchResult()),
})

export type Resource<T, Key extends PropertyKey> = Key extends string
  ? Record<Key, { read: () => T }>
  : never

const fetchPromise = <T>(promise: Promise<T>) => {
  let result: T | null = null
  let status = "pending"

  let suspender = promise
    .then((data) => {
      console.log(data)
      status = "resolved"

      result = data
    })
    .catch((error) => {
      result = error
      status = "error"
    })

  return {
    read(): T {
      console.log("READ", { status })
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      }

      return result as T
    },
  }
}
