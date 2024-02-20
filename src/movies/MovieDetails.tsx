import { Text, HStack, Img, VStack, Heading, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { moviesApiKey } from "../keys";
import { MovieDetailsType, WatchedMovie } from "../MockData";
import { Rating } from "../components/rating/Rating";
import { CloseIcon } from "@chakra-ui/icons";
type MovieDetailsProps = {
	movieId: string;
	onDetailReset: () => void;
	onAddWatched: (movie: WatchedMovie) => void;
};

type Ratings = "G" | "PG" | "PG-13" | "R" | "NC-17" | "Not Rated";

function ratingTranslator(rating: Ratings) {
	let rateMeaning: string = "";
	switch (rating) {
		case "G":
			rateMeaning = "(General audiences)";
			break;
		case "PG":
			rateMeaning = "(Parental guidance suggested)";
			break;
		case "PG-13":
			rateMeaning = "(Parents strongly advice)";
			break;
		case "R":
			rateMeaning = "(Restricted)";
			break;
		case "NC-17":
			rateMeaning = "(No one under 17)";
			break;
			break;
		case "Not Rated":
			rateMeaning = "";
			break;
	}

	return rateMeaning;
}

export const MovieDetails = ({
	movieId,
	onDetailReset,
	onAddWatched,
}: MovieDetailsProps) => {
	const [details, setDetails] = useState<MovieDetailsType>(
		{} as MovieDetailsType
	);
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);
	const {
		Actors,
		Awards,
		Director,
		Genre,
		Plot,
		Poster,
		Rated,
		Released,
		Runtime,
		Title,
		imdbRating,
		imdbVotes,
		Year,
	} = details;

	function handleAdd() {
		const watchedMovie = {
			imdbID: movieId,
			Title,
			Year,
			Poster,
			imdbRating: Number(imdbRating),
			Runtime: Runtime.split(" ")[0],
			userRating,
		};

		onDetailReset();

		onAddWatched(watchedMovie);
	}
	function callback(e: KeyboardEvent) {
		if (e.code === "Escape") {
			onDetailReset();
		}
	}

	useEffect(function () {
		document.addEventListener("keydown", callback);

		return function () {
			document.removeEventListener("keydown", callback);
		};
	}, []);

	useEffect(
		function getDetails() {
			const controller = new AbortController();
			async function detailsCall() {
				try {
					setIsLoading(true);
					// setError("")
					const res = await fetch(
						`http://www.omdbapi.com/?i=${movieId}&apikey=${moviesApiKey}`,
						{ signal: controller.signal }
					);
					if (!res.ok) {
						throw new Error("Something went wrong fetching your data");
					}
					const data = await res.json();
					if (data.Response === "False") {
						throw new Error("Nothing found");
					}
					setDetails(data);
				} catch (error) {
					console.log(error)
				} finally {
					setIsLoading(false);
				}
			}
			detailsCall();
			return function () {
				controller.abort();
			};
		},
		[movieId]
	);

	useEffect(
		function () {
			if (!Title) return;
			document.title = Title;

			return function () {
				document.title = "Movie tender";
			};
		},
		[Title]
	);

	return isLoading ? (
		<Loader position='absolute' left='50%' />
	) : (
		<VStack position='relative'>
			<CloseIcon
				position='absolute'
				right='1rem'
				top='1rem'
				boxSize={6}
				onClick={onDetailReset}
				_hover={{
					cursor: "pointer",
				}}
			/>
			<HStack justifyContent='space-between' width='100%'>
				<Img src={Poster} borderTopLeftRadius='1rem' />
				<VStack width='100%'>
					<Heading>{Title}.</Heading>
					<Text>
						📆 <b>Released: </b>
						{Released}.
					</Text>
					<Text>
						🎭 <b> Genre: </b> {Genre}.
					</Text>
					<Text>
						🗳️ <b> IMDb votes: </b>
						{imdbVotes}.
					</Text>
					<Text>
						🏆 <b> Awards & Nominations: </b>
						{Awards}.
					</Text>
					<Text>
						👨‍👩‍👧‍👦 <b>Rated: </b>
						{Rated}. {ratingTranslator(Rated as Ratings)}
					</Text>
					<Text>
						⏱️ <b> Runtime: </b>
						{Runtime}.
					</Text>
				</VStack>
			</HStack>
			<VStack p='1rem'>
				{/* <Rating maxRating={10} defaultRating={Math.floor(Number(imdbRating))} onSetRating={(vale) => { */}
				<Rating
					maxRating={10}
					defaultRating={0}
					onSetRating={(vale) => {
						setUserRating(vale);
					}}
				/>

				{userRating > 0 && (
					<Button margin='1rem' onClick={handleAdd}>
						Add movie to watched list
					</Button>
				)}
				<Text fontSize='1.2rem' width='90%'>
					{Plot}
				</Text>

				<HStack>
					<Text>
						<b>Starring:</b>
					</Text>
					<Text>{Actors}.</Text>
				</HStack>
				<Text>
					<b>Director: </b>
					{Director}
				</Text>
			</VStack>
		</VStack>
	);
};
