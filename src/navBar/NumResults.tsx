import { Box } from "@chakra-ui/react"
import { Movie } from "../MockData"

type NumResultsProps = {
  movies: Movie[]
}

export const NumResults = ({movies}: NumResultsProps) => {
  return (
    <Box as="span">
      Found {movies.length} results
    </Box>
  )
}
