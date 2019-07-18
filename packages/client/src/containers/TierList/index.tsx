import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import { Query, QueryResult, OperationVariables } from "react-apollo"
import { Link, Route, RouteProps } from "react-router-dom"
import { Image as Img } from "cloudinary-react"
import { tierList as Tier } from "./__generated__/tierList"
import GET_TIER from "./dragonInfo"
import useCloudinary from "../../hooks/useCloudinary"
import ElementMap from "../Query/elements"
import withRoute from "../withRoute"
import { RouteChildrenProps } from "react-router"
const Image = Img as any
const ids: string[] = []
const Dragon = ({
  icon,
  identifier,
  drag
}: {
  icon: string
  identifier: string
  drag: string
}): JSX.Element => {
  const cloudName = useCloudinary()
  return (
    <Grid xs={2}>
      <Chip
        avatar={
          <Avatar>
            <Image cloudName={cloudName} publicId={icon} />
          </Avatar>
        }
        label={<Link to={`/${identifier}`}>{drag}</Link>}
      />
      <br />
    </Grid>
  )
}
const els = ["fire", "wind", "earth", "dark", "ice"]
const DragonName: React.FC<{ displayName: string }> = ({
  displayName: name
}) => (
  <Typography variant="h3">
    {name.substr(0, 1).toUpperCase()}
    {name.substr(1).toLowerCase()} Dragons
  </Typography>
)
const renderDragonItem = ({
  dragons
}: Pick<Unpack<Tier["tiers"]>, "dragons">) =>
  dragons.map(({ _id: id, name: drag, identifier, element }) => {
    const { icon } = ElementMap.get(
      (element as any) ||
        els[(Math.random() * els.length) | 0] + "Element" ||
        "iceElement"
    )

    return <Dragon key={id} icon={icon} identifier={identifier} drag={drag} />
  })

const renderTierItem = ({ tiers }: Pick<Tier, "tiers">): React.ReactNode =>
  tiers.map(tier => {
    const { _id, name, dragons: dragonList } = tier
    const dragons = dragonList.filter(({ isAttainable }) => isAttainable)
    if (!dragonList.length) return null

    ids.push(_id)
    return (
      <Container key={_id} maxWidth="md" fixed>
        <DragonName displayName={name} />
        {renderDragonItem({ dragons })}
      </Container>
    )
  })

const renderTierList = ({
  error,
  data,
  loading
}: QueryResult<Tier, OperationVariables>): React.ReactNode => {
  if (loading) {
    return <CircularProgress />
  } else if (error) {
    console.error(error)
    return null
  } else if (!data || data === null || data.tiers === null) {
    return null
  }
  return renderTierItem(data)
}
const TierList: React.FC<{ path?: string }> = props => (
  <>
    <Query<Tier> query={GET_TIER}>{renderTierList}</Query>
    {props.children}
  </>
)

const DragonGrid = React.lazy(() => import("../Dragon"))

interface DragonRouteProps
  extends Omit<React.PropsType<typeof DragonGrid>, "path"> {}
function renderDragon({ match }: RouteChildrenProps<{ id: string }>) {
  if (match === null) return match
  const {
    path,
    params: { id }
  } = match

  return <DragonGrid dragon={id} path={path} />
}

export default () => {
  return (
    <TierList>
      <Route path="/dragons/:id">{renderDragon}</Route>
    </TierList>
  )
}
