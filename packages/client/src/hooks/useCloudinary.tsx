import React from "react"
const Context = React.createContext<string>("")

export const CloudinaryProvider: React.FC<{ cloudName: string }> = ({
  cloudName,
  children
}) => {
  return <Context.Provider value={cloudName}>{children}</Context.Provider>
}
export default function useCloudinary() {
  return React.useContext(Context)
}
