import { BoxProps } from "@chakra-ui/react"

type mainProps = BoxProps & {
  temp?: string 
}

export const Main = ({children}: mainProps) => {
  return (
    <div>{children}</div>
  )
}
