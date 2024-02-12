import { Movie } from "../MockData";
import {
	Box,
	Text,
	BoxProps,
	HStack,
	Heading,
	Img,
	Stack,
} from "@chakra-ui/react";

type MovieProps = BoxProps & {
	movieDef: Movie;
	myCase: "info" | "details";
};

export const MovieItem = ({ movieDef, myCase }: MovieProps) => {
	console.log("MOV", movieDef);
	const { ImdbID, Poster, Title, Year } = movieDef;
	return (
		<HStack gap={5} paddingBlock='1rem'>
			{Poster !== "N/A" ? (
				<Img w={20} src={Poster}></Img>
			) : (
				<Text pr="1rem" fontSize='3rem'>🤔</Text>
			)}

			<Stack gap={1} alignSelf='flex-start'>
				<Heading fontSize='1rem'>{Title}</Heading>
				{myCase === "info" ? (
					<Heading fontSize='1rem'>🗓️ ({Year})</Heading>
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
