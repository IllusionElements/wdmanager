import React from "react"
import gql from "graphql-tag.macro"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography, { TypographyProps } from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import styled, { StyledComponent } from "styled-components"
import { Query, QueryResult } from "react-apollo"
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
      element
      frags
      incubatorLevel
      incubatingTime
    }
  }
`
const LevelRow = React.lazy(() => import("./LevelRow"))
interface TextProps extends TypographyProps {
  textColor?: string
}
const CenteredTypography: StyledComponent<
  React.ComponentType<TextProps>,
  any,
  {},
  never
> = styled(Typography)`
  text-align: center;
  color: ${(props: TextProps) => props.textColor};
`

const Header: React.FC<{
  content?: string
  color?: string
  variant?: TypographyProps["variant"]
}> = props => (
  <Grid xs={12} item>
    <CenteredTypography variant={props.variant || "h2"} textColor={props.color}>
      {props.content || props.children}
    </CenteredTypography>
  </Grid>
)
const CenterHeader = styled.th`
  text-align: center;
`
const TableHead: React.FC = props => (
  <thead>
    <tr>{props.children}</tr>
  </thead>
)
const Headings: React.FC = () => (
  <TableHead>
    <CenterHeader>Level</CenterHeader>
    <CenterHeader>Player Level</CenterHeader>
    <CenterHeader>Attack</CenterHeader>
    <CenterHeader>HealCenterHeader</CenterHeader>
    <CenterHeader>XP</CenterHeader>
    <CenterHeader>RSS To Level</CenterHeader>
  </TableHead>
)
const DragonLevelRow: React.FC<any> = ({ costType, amount, level }) => (
  <tr>
    <LevelRow level={level} costType={costType} amount={amount} />
  </tr>
)
const TBody: React.FC<{ levels: any[] }> = ({ levels }) => (
  <tbody>
    <React.Suspense fallback={<CircularProgress />}>
      {levels.map(({ _id, cost: [{ type, amount }], ...levelData }: any) => (
        <DragonLevelRow
          key={_id}
          level={levelData}
          costType={type}
          amount={amount}
        />
      ))}
    </React.Suspense>
  </tbody>
)
// const renderDragonDataTable => (dragon: any) => (

// )
const renderDragonDataTable = ({
  loading,
  error,
  data
}: QueryResult<
  any,
  {
    id: string
  }
>) => {
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
          const dragonInfo = [
            `${frags} fragments`,
            `level ${incubatorLevel} incubator to hatch`,
            `${numberParser.format(incubatingTime)} seconds to hatch`
          ].map(content => (
            <Header
              variant="h6"
              color="#eeffff"
              content={content}
              key={content}
            />
          ))
          return (
            <Grid key={_id} alignItems="center" container>
              <Header content={name} color="#eeffff" />
              <Header variant="h3" color="#eeffff" content={description} />
              {dragonInfo}
              <Grid xs={12} item>
                <Table>
                  <Headings />
                  <TBody levels={levels} />
                </Table>
              </Grid>
            </Grid>
          )
        }
      )}
    </Container>
  )
}
const Dragon: React.FC<{ dragon?: string; path?: string }> = ({ dragon }) => (
  <Query<any, { id: string }> query={FIND_DRAGON} variables={{ id: dragon! }}>
    {renderDragonDataTable}
  </Query>
)

export default Dragon
