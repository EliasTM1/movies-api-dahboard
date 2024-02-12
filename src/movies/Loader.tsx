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

	// return <Image animation={animation} src={logo} />;
	return <Text animation={animation} fontSize="3rem">🌮</Text>;
}
