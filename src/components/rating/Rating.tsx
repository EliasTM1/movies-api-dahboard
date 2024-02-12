import { StarIcon } from "@chakra-ui/icons";
import { Box, BoxProps, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

type RatingProps = BoxProps & {
	maxRating?: number;
	color?: string;
	size?: number;
	messages?: string[];
    defaultRating?: number
    onSetRating?: (num : number) => void
};

export const Rating = ({
	maxRating = 5,
	color = "#fcc419",
	size = 5,
	messages = ["Trash", "Decent", "Nice", "Very Nice :)", "Perfecto"],
    // * It is not good practice to initalize state from props
    // * when you want to keep the state in sync with the when the props are changed
    // * ...
    // * In this case the props are not changing
    defaultRating = 5,
    onSetRating
}: RatingProps) => {
	const [rating, setRating] = useState<number>(defaultRating);
	const [temporalRating, setTemporalRating] = useState(0);
	console.log(setRating);

	function handleRating(rating: number) {
		setRating(rating);
        if(onSetRating) onSetRating(rating);
	}

	return (
		<HStack>
			{Array.from({ length: maxRating }, (_, i) => {
				console.log(_);
				console.log(i);
				return (
					<RatingStar
						key={i}
						onRate={() => handleRating(i + 1)}
						full={temporalRating ? temporalRating >= i + 1 : rating >= i + 1}
						onHoverIn={() => setTemporalRating(i + 1)}
						onHoverOut={() => setTemporalRating(0)}
						color={color}
						size={size}
					/>
				);
			})}
			<Text fontSize={size * 5}>
				{maxRating === messages.length
					? messages[temporalRating ? temporalRating - 1 : rating - 1]
					: temporalRating || rating || ""}{" "}
				{messages.length === maxRating ? "" : "/ limit"} 
			</Text>
		</HStack>
	);
};

// * Single star

type RatingStarProps = BoxProps & {
	color?: string;
	size?: number;
	full: boolean;
	onRate: () => void;
	onHoverIn: () => void;
	onHoverOut: () => void;
};

const RatingStar = ({
	color,
	size,
	full,
	onRate,
	onHoverIn,
	onHoverOut,
}: RatingStarProps) => {
	return (
		<Box
			role='button'
			onClick={onRate}
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}
		>
			{full ? (
				<StarIcon boxSize={size} color={color} stroke={color} />
			) : (
				<StarIcon boxSize={size} color='transparent' stroke={color} />
			)}
		</Box>
	);
};
