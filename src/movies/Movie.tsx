import { DeleteIcon } from "@chakra-ui/icons";
import { Movie, WatchedMovie } from "../MockData";
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
	movieDef: Movie | WatchedMovie;
	myCase: "info" | "details";
	handleIdChange?: (id: string) => void;
	handleDeleteMovie? : (id: string) => void;
};

export const MovieItem = ({ movieDef, myCase, handleIdChange , handleDeleteMovie}: MovieProps) => {
	const { Poster, Title, Year, imdbID } = movieDef;

	function handleClick(id: string) {
		if (handleIdChange) handleIdChange(id);
		return;
	}

	return (
		<HStack
			gap={5}
			borderRadius='1rem'
			padding='1rem'
			onClick={() => handleClick(imdbID)}
			cursor='pointer'
			_hover={{
				backgroundColor: "brand.95",
			}}
		>
			{Poster !== "N/A" ? (
				<Img w={20} src={Poster}></Img>
			) : (
				<Text pr='1rem' fontSize='3rem'>
					🍿
				</Text>
			)}

			<Stack gap={1} alignSelf='flex-start'>
				<Heading fontSize='1rem'>{Title}</Heading>
				{myCase === "info" ? (
					<>
						<Box as='span' fontSize='1rem'>
							🗓️ ({Year})
						</Box>
					</>
				) : (
					<HStack>
						<Box>⭐️ 8.8</Box>
						<Box>💡 90</Box>
						<Box>⏰ 145 min</Box>
						<DeleteIcon color="red" onClick={() => {
							if(handleDeleteMovie) {
								handleDeleteMovie(imdbID)
							}
						}}/>
					</HStack>
				)}
			</Stack>
		</HStack>
	);
};
