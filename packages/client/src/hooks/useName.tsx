import React from "react"

const Context = React.createContext({
  name: ""
})

export const NameProvider: React.FC<{ name: string }> = ({
  children,
  ...props
}) => <Context.Provider value={props}>{children}</Context.Provider>

export const useName = () => {
  const context = React.useContext(Context)
  return context.name
}
