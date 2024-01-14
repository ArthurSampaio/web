import { parser } from "./"

test("parser", () => {
  expect(parser("test")).toBe("test")
})
