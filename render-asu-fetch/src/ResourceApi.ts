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
    read() {
      console.log(status)
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      }

      return result
    },
  }
}
