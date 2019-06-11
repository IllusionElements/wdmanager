import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import { Query } from "react-apollo"
import { Link } from "@reach/router"
import { Image as Img } from "cloudinary-react"
import { tierList as Tier } from "./__generated__/tierList"
import GET_TIER from "./dragonInfo"
import useCloudinary from "../../hooks/useCloudinary"
import ElementMap from "../elements"
const Image = Img as any
const ids: string[] = []
const Dragon = ({
  cloudName,
  icon,
  identifier,
  drag
}: {
  cloudName: string
  icon: string
  identifier: string
  drag: string
}): JSX.Element => (
  <Grid xs={2}>
    <Chip
      avatar={
        <Avatar>
          <Image cloudName={cloudName} publicId={icon} />
        </Avatar>
      }
      label={
        <Link to={`${window.location.pathname}/${identifier}`}>{drag}</Link>
      }
    />
    <br />
  </Grid>
)
const els = ["fire", "wind", "earth", "dark", "ice"]
const TierList: React.FC<{ path?: string }> = () => {
  const cloudName = useCloudinary()
  return (
    <Query<Tier> query={GET_TIER}>
      {data => {
        const { error, data: tierData, loading } = data
        if (loading) {
          return <CircularProgress />
        } else if (error) {
          return <p>{JSON.stringify(error)}</p>
        } else if (!tierData) {
          return null
        }
        return (
          <>
            {tierData.tiers.map(tier => {
              const { _id, name, dragons: dragonList } = tier
              const dragons = dragonList.filter(
                ({ isAttainable }) => isAttainable
              )
              if (!dragonList.length) return null

              ids.push(_id)
              return (
                <Container key={_id} maxWidth="md" fixed>
                  <Typography variant="h3">
                    {name.substr(0, 1).toUpperCase()}
                    {name.substr(1).toLowerCase()} Dragons
                  </Typography>
                  {dragons.map(
                    ({ _id: id, name: drag, identifier, element }) => {
                      const { icon } = ElementMap.get(
                        (element as any) ||
                          els[(Math.random() * els.length) | 0] + "Element" ||
                          "iceElement"
                      )

                      return (
                        <Dragon
                          key={id}
                          cloudName={cloudName}
                          icon={icon}
                          identifier={identifier}
                          drag={drag}
                        />
                      )
                    }
                  )}
                </Container>
              )
            })}
          </>
        )
      }}
    </Query>
  )
}
export default TierList
