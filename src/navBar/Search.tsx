import { Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
// import { useKey } from "../hooks/useKey";

type SearchProps = {
	currentQuery: string;
	onInputChange: (query: string) => void;
	onQuerySet: (query: string) => void;
};

export const Search = ({ onInputChange, currentQuery }: SearchProps) => {
	const myRef = useRef<HTMLInputElement>(null);

	// useKey("Enter", function () {
	// 	if (document.activeElement === myRef.current) return;
	// 	if (myRef.current) myRef.current.focus();
	// 	onQuerySet("")
	// })

	useEffect(function () {
		function callback(e: KeyboardEvent) {
			if (document.activeElement === myRef.current) return;
			if (e.code === "Enter") {
				if (myRef.current) myRef.current.focus();
			}
		}
		if (myRef.current) myRef.current.focus();

		return removeEventListener("keydown", callback);
	}, []);

	return (
		<form>
			<Input
				border='1px solid gray'
				color='white'
				width='50%'
				placeholder='Look for your movie'
				value={currentQuery}
				onChange={(evento) => onInputChange(evento.target.value)}
				w='350px'
				ref={myRef}
			/>
		</form>
	);
};
