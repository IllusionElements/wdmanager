import { DragonResolver } from "./DragonResolver"
export const defaultIconFileName: DragonResolver<string> = ({
  defaultIconFilename
}) => `${process.env.CDN}${defaultIconFilename}`
