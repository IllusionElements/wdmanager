import React from "react"
import gql from "graphql-tag.macro"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"

import { Query } from "react-apollo"
import { numberParser } from "./numberParser"
const FIND_DRAGON = gql`
  query findDragon($id: String!) {
    dragon(name: $id) {
      _id
      name: displayName
      description: displayDescription
      levels {
        _id
        level
        attack: attackPower
        health: HP
        reqLevel: requiredStableLevel
        xp
        cost: upgradeCost {
          type
          amount
        }
      }
      frags
      incubatorLevel
      incubatingTime
    }
  }
`
const LevelRow = React.lazy(() => import("./LevelRow"))
const Dragon: React.FC<{ dragon?: string; path?: string }> = ({ dragon }) => (
  <Query<any> query={FIND_DRAGON} variables={{ id: dragon! }}>
    {({ loading, error, data }) => {
      if (loading) return <CircularProgress />
      if (error) throw error
      return (
        <Container>
          {data.dragon.map(
            ({
              name,
              _id,
              levels,
              frags,
              incubatorLevel,
              description,
              incubatingTime
            }: any) => {
              return (
                <Grid key={_id} alignItems="center" container>
                  <Grid xs={12} item>
                    <Typography variant="h2" style={{ textAlign: "center" }}>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid xs={12} item>
                    <Typography
                      variant="h3"
                      style={{ textAlign: "center", color: "purple" }}
                    >
                      {description}
                    </Typography>
                  </Grid>
                  <Grid xs={12} item>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      {frags} fragments
                    </Typography>
                  </Grid>
                  <Grid xs={12} item>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      level {incubatorLevel} incubator to hatch
                    </Typography>
                  </Grid>
                  <Grid xs={12} item>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      {numberParser.format(incubatingTime)} seconds to hatch
                    </Typography>
                  </Grid>
                  <Grid xs={12} item>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Level</th>
                          <th style={{ textAlign: "center" }}>Player Level</th>
                          <th style={{ textAlign: "center" }}>Attack</th>
                          <th style={{ textAlign: "center" }}>Health</th>
                          <th style={{ textAlign: "center" }}>XP</th>
                          <th style={{ textAlign: "center" }}>RSS To Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        <React.Suspense fallback={<CircularProgress />}>
                          {levels.map(
                            ({
                              _id,
                              cost: [{ type, amount }],
                              ...levelData
                            }: any) => (
                              <tr key={_id}>
                                <LevelRow
                                  level={levelData}
                                  costType={type}
                                  amount={amount}
                                />
                              </tr>
                            )
                          )}
                        </React.Suspense>
                      </tbody>
                    </Table>
                  </Grid>
                </Grid>
              )
            }
          )}
        </Container>
      )
    }}
  </Query>
)

export default Dragon
