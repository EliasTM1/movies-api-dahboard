import { Text, HStack, Img, VStack, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { moviesApiKey } from "../keys";
import { MovieDetailsType } from "../MockData";
import { Rating } from "../components/rating/Rating";
type MovieDetailsProps = {
	movieId: string;
};

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
	const [details, setDetails] = useState<MovieDetailsType>(
		{} as MovieDetailsType
	);
	console.log(details);
	const [isLoading, setIsLoading] = useState(false);
	const { Poster, Released, Genre, imdbVotes, UserRating, Plot, Title } = details;
	console.log(Genre, UserRating)
	useEffect(
		function getDetails() {
			async function actuallyGetDetails() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?i=${movieId}&apikey=${moviesApiKey}`
					);
					if (!res.ok) {
						throw new Error("Something went wrong fetching your data");
					}
					const data = await res.json();
					if (data.Response === "False") {
						throw new Error("Nothing found");
					}
					console.log(data, "From details");
					setDetails(data);
				} catch (error) {
					console.log(error);
				} finally {
					setIsLoading(false);
				}
			}
			actuallyGetDetails();
		},
		[movieId]
	);

	return isLoading ? (
		<Loader />
	) : (
		<Box>
			<HStack>
				<Img width="40%" src={Poster} />
				<VStack>
					<Heading>{Title}</Heading>
					<Text>{Released}</Text>
					<Text>{imdbVotes} IMDb</Text>
				</VStack>
			</HStack>
			<VStack p="1rem">
				<Rating />
				<Text>{Plot}</Text>
			</VStack>
		</Box>
	);
};
