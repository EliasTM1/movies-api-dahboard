import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type SearchProps = {
	onInputChange: (query: ChangeEvent<HTMLInputElement>) => void;
};

function handleQueryChange() {}
export const Search = ({ onInputChange }: SearchProps) => {
	return (
		<form onSubmit={handleQueryChange}>
			<Input
				border='1px solid gray'
				width='50%'
				placeholder='Look for your movie'
				onChange={evento => onInputChange(evento)}
			/>
			<Button type="submit"></Button>
		</form>
	);
};
