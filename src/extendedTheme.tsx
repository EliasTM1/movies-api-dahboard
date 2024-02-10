// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		brand: {
			0: "#f7fafc",
			10: "#dee2e6",
			15: "#adb5bd",
			30: "#6741d9",
			35: "#7950f2",
			50: "#fa5252",
			55: "#e03131",
			90: "#343a40",
			95: "#2b3035",
			100: "#212529",
		},
	},
});
