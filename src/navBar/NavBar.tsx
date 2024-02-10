import { BoxProps, HStack } from "@chakra-ui/react";
import { Logo } from "../navBar/Logo";

type NavBarProps = BoxProps & {
	mockProp?: string;
};

export const NavBar = ({ children }: NavBarProps) => {
	return (
		<HStack
			padding='1rem'
			justifyContent='space-between'
			backgroundColor='brand.10'
		>
			<Logo/>
			{children}
		</HStack>
	);
};
