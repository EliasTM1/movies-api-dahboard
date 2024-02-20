import { Box } from "@chakra-ui/react"
import { Movie } from "../MockData"

type NumResultsProps = {
  movies: Movie[]
}

export const NumResults = ({movies}: NumResultsProps) => {
  return (
    <Box as="span" color="white">
      {movies.length} results
    </Box>
  )
}
