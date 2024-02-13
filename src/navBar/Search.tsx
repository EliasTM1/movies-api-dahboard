import { Input } from "@chakra-ui/react";

type SearchProps = {
	currentQuery: string
	onInputChange: (query: string) => void;
};

export const Search = ({ onInputChange, currentQuery }: SearchProps) => {
	return (
		<form>
			<Input
				border='1px solid gray'
				width='50%'
				placeholder='Look for your movie'
				value={currentQuery}
				onChange={evento => onInputChange(evento.target.value)}
				w="350px"
			/>
		</form>
	);
};
