import { BoxProps, HStack } from "@chakra-ui/react";

type NavBarProps = BoxProps & {
	mockProp?: string;
};

export const NavBar = ({ children }: NavBarProps) => {
	return <HStack>{children}</HStack>;
};
