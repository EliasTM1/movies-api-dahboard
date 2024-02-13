type ErrorMessageProps = {
	message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
	return (
		<p>
			<span>⛔️ {message}</span> 
		</p>
	);
}