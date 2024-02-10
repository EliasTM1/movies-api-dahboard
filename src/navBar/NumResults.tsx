import { Box } from "@chakra-ui/react"
import { Movie } from "../MockData"

type NumResultsProps = {
  movies: Movie[]
}

export const NumResults = ({movies}: NumResultsProps) => {
  return (
    <Box as="span">
      {movies.length} results
    </Box>
  )
}
