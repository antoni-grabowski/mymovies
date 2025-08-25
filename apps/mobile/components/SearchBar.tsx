import { Ionicons } from "@expo/vector-icons";
import { useRef, useState, type FC } from "react";
import {
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

// TODO: make responsive user prefered light/dark mode
// On ios clear button depends on mode (white button on white input is bad)

type SearchBarProps = {
	placeholder?: string;
	initialValue?: string;
	onSearchChange: (text: string) => void;
};

export const SearchBar: FC<SearchBarProps> = ({
	placeholder = "Search...",
	initialValue = "",
	onSearchChange,
}) => {
	const [searchQuery, setSearchQuery] = useState(initialValue);
	const inputRef = useRef<TextInput>(null);

	const handleContainerPress = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};
	const handleChangeText = (text: string) => {
		setSearchQuery(text);
		onSearchChange(text);
	};

	return (
		// TouchableWithoutFeedback used to make whole searchBar touchable
		// Otherwise user has to press specifically on TextInput
		<TouchableWithoutFeedback onPress={handleContainerPress}>
			<View style={styles.searchBarContainer}>
				<Ionicons name="search" size={20} style={styles.searchIcon} />
				<TextInput
					ref={inputRef}
					placeholder={placeholder}
					placeholderTextColor="#888"
					value={searchQuery}
					onChangeText={handleChangeText}
					// Ios clear button on right of TextInput
					clearButtonMode="while-editing"
					returnKeyType="search" // Android specific
					style={styles.textInput}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 25,
		paddingHorizontal: 15,
		height: 50,
		marginHorizontal: 20,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	searchIcon: {
		marginRight: 10,
		color: "#888",
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		color: "#333",
	},
});

