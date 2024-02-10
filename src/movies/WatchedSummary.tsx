import { Box, HStack, Heading } from "@chakra-ui/react"

export const WatchedSummary = () => {
  return (
    <Box borderBottom="1px solid" borderColor="brand.15" padding="1rem">
      <Heading >Your Stats</Heading>
      <HStack>
        <Box>🎬 2 movies</Box>
        <Box>⏰ 132 minutes</Box>
        <Box>⭐️ Average review</Box>
      </HStack>
    </Box>
  )
}
