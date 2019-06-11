import { useEffect, DOMElement } from "react"

export default (title: string) => {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title
    }
  }, [title])
}
