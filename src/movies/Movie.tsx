import { Movie } from "../MockData";
import { Box, BoxProps, HStack, Heading, Img, Stack } from "@chakra-ui/react";

type MovieProps = BoxProps & {
	movieDef: Movie;
	myCase: "info" | "details";
};

export const MovieItem = ({ movieDef, myCase }: MovieProps) => {
	const { imdbID, poster, title, year } = movieDef;
	return (
		<HStack gap={5} paddingBlock='1rem'>
			<Img w={20} src={poster}></Img>

			<Stack gap={1} alignSelf='flex-start'>
				<Heading fontSize='1rem'>{title}</Heading>
				{myCase === "info" ? (
					<Heading fontSize='1rem'>🗓️ ({year})</Heading>
				) : (
					<HStack>
						<Box>⭐️ 8.8</Box>
						<Box>💡 90</Box>
						<Box>⏰ 145 min</Box>
					</HStack>
				)}
			</Stack>
		</HStack>
	);
};
