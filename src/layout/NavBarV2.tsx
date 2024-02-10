import { BoxProps, HStack, Heading } from "@chakra-ui/react";
import { Logo } from "../navBar/Logo";

type NavBarV2Props = BoxProps & {
  someProp?: string
}

export const NavBarV2 = ({children}: NavBarV2Props) => {
	return (
		<HStack
			padding='1rem'
			justifyContent='space-around'
			backgroundColor='brand.10'
		>
			<Logo></Logo>
			<Heading float="left" w="fit-content">Your Movies</Heading>
      {children}
		</HStack>
	);
};
