import React, { useState, FC, useCallback } from "react"
import Downshift from "downshift"
import debounce from "lodash.debounce"
declare const useBreed: () => Record<"updateQuery", (e: string) => void>
const Menu: FC = () => {
  const { updateQuery } = useBreed()
  const [identifer, setIdentifer] = useState("" as any)
  const update = useCallback(debounce(updateQuery, 500), [updateQuery])
  return (
    <Downshift
      onInputValueChange={setIdentifer}
      onChange={update}
      initialSelectedItem={identifer}
    />
  )
}

export default Menu
