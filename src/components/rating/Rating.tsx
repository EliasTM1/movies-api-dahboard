import { StarIcon } from "@chakra-ui/icons";
import { Box, BoxProps, HStack, Heading,  VStack } from "@chakra-ui/react";
import { useState } from "react";

type RatingProps = BoxProps & {
	maxRating?: number;
	color?: string;
	size?: number;
	messages?: string[];
	defaultRating?: number;
	onSetRating?: (num: number) => void;
};

export const Rating = ({
	maxRating = 5,
	color = "#fcc419",
	size = 5,
	// messages = ["Trash", "Decent", "Nice", "Very Nice :)", "Perfecto"],
	// * It is not good practice to initalize state from props
	// * when you want to keep the state in sync with the when the props are changed
	// * ...
	// * In this case the props are not changing
	defaultRating = 5,
	onSetRating,
}: RatingProps) => {
	const [rating, setRating] = useState<number>(defaultRating);
	const [temporalRating, setTemporalRating] = useState(0);

	function handleRating(rating: number) {
		setRating(rating);
		if (onSetRating) onSetRating(rating);
	}
	return (
		<VStack justifyContent='space-between'>
			{rating &&<Heading>{rating} / {maxRating}</Heading>}
			{/* <Text fontSize={size * 5}>{messages[rating - 1]}</Text> */}

			<HStack>
				{Array.from({ length: maxRating }, (_, i) => {
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
			</HStack>
		</VStack>
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
