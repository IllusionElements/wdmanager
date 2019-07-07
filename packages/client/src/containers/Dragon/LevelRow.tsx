import React from "react"
import { numberParser } from "./numberParser"
export const LevelRow: React.FC<any> = ({
  level: { level, attack, reqLevel, xp, health },
  costType,
  amount
}: any) => (
  <>
    <td style={{ textAlign: "center" }}>{level}</td>
    <td style={{ textAlign: "center" }}>{reqLevel}</td>

    <td style={{ textAlign: "center" }}>{numberParser.format(attack)}</td>
    <td style={{ textAlign: "center" }}>{numberParser.format(health)}</td>
    <td style={{ textAlign: "center" }}>{numberParser.format(xp)}</td>
    <td style={{ textAlign: "center" }}>
      {numberParser.format(amount)} {costType}
    </td>
  </>
)

export default LevelRow
