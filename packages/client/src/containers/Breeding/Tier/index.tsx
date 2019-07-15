import React, { useMemo } from "react"
import { CircularProgress, Select, MenuItem } from "@material-ui/core"
import { useTierQuery } from "./useTierQuery"

export default function TierOptions(props: { setTier: (t: number) => void }) {
  const {
    updateTier,
    data: { currentTier, tiers },
    loading
  } = useTierQuery()

  const tierList = useMemo(
    () =>
      tiers.map(({ _id, name: tierName }) => (
        <MenuItem value={_id} key={_id}>
          {tierName}
        </MenuItem>
      )),
    [tiers]
  )

  const onTierChange = React.useCallback(
    (
      e: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) =>
      typeof e.currentTarget.value === "number" &&
      updateTier(e.currentTarget.value) &&
      props.setTier(Number.parseInt(e.target.name!, 10)),
    [updateTier, props]
  )
  if (loading) {
    return <CircularProgress />
  }
  return (
    <>
      {currentTier}
      <Select onChange={onTierChange}>{tierList}</Select>
    </>
  )
}
