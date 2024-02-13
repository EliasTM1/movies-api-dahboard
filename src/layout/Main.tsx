import { Box, BoxProps } from "@chakra-ui/react"

type mainProps = BoxProps & {
  temp?: string 
}

export const Main = ({children, ...props}: mainProps) => {
  return (
    <Box {...props}>{children}</Box>
  )
}
