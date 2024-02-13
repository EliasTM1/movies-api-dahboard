import { Text, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export function Loader() {
	const prefersReducedMotion = usePrefersReducedMotion();

	const animation = prefersReducedMotion
		? undefined
		: `${spin} infinite 1s linear`;

	return <Text animation={animation} fontSize="3rem">🌮</Text>;
}
