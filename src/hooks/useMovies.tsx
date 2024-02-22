import { useEffect, useState } from "react";
import { moviesApiKey } from "../keys";
import { Movie } from "../MockData";

export function useMovies(query: string) {
    const [movieList, setMovieList] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>()
    const [error, setError] = useState<string>()
    
    useEffect(
		function () {
            // callback?.()
			const controller = new AbortController();
			async function getMeMovies() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?s=${query}&apikey=${moviesApiKey}`,
						{ signal: controller.signal }
					);
					if (!res.ok) {
						throw new Error("Something went wrong fetching your data");
					}
					const data = await res.json();
					if (data.Response === "False") {
						throw new Error("Nothing found");
					}
					setMovieList(data.Search);
				} catch (error: Error) {
					if (error.name !== "AbortError") {
						if (error.message && query !== "") setError(error.message);
					}
					// * Set the error
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovieList([]);
				setError("");
				return;
			}
			// handleDetailReset();
			getMeMovies();
			return function () {
				controller.abort();
			};
		},
		[query]
	);
    return {movieList, isLoading, error}
}