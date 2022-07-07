import React, { useEffect, useState } from "react"
import { Route, Link } from "./router"
import "./App.css"

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const SeiLa = () => <h2>SeiLa</h2>

function App() {
  const [key, setKey] = useState(0)
  const urlChange = () => {
    setKey((k) => k + 1)
  }
  useEffect(() => {
    window.addEventListener("urlchanged", urlChange)
    return () => {
      window.removeEventListener("popstate", urlChange)
    }
  }, [])

  return (
    <div>
      <header className="sticky top-0 ">
        <nav className=" h-20 bg-slate-600  ">
          <ul className="flex flex-row list-none m-0 p-0 odd:mx-4 items-center float-right h-full overflow-hidden  ">
            <li className="bg-red-500 hover:bg-red-700 rounded text-sm text-white p-3">
              <Link to="/">Home</Link>
            </li>
            <li className="bg-red-500 hover:bg-red-700 rounded text-sm text-white p-3 mx-4">
              <Link to="/sei-la">DashBoard</Link>
            </li>
            <li className="bg-red-500 hover:bg-red-700 rounded text-sm text-white p-3 float-left">
              <Link to="/about">About</Link>
            </li>
          </ul>
          <h2 className="h-full flex items-center p-5 text-white text-xl">
            RRD - React Router for Dummies
          </h2>
        </nav>
      </header>

      <main className="mt-10 ">
        <React.Fragment key={key}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/sei-la" component={SeiLa} />
        </React.Fragment>
      </main>
    </div>
  )
}

export default App
