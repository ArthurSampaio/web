import React from "react"

type Props = {
  children: React.ReactElement
}

type State =
  | {
      hasError: true
      error: {
        message: string
      }
    }
  | {
      hasError: false
      error: null
    }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <p>{this.state.error.message}</p>
        </>
      )
    }

    return this.props.children
  }
}
