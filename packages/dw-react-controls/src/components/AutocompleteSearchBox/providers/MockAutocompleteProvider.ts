import { ISuggestion } from "../models/ISuggestion";
const words = [
	"apple",
	"banana",
	"orange",
	"grape",
	"kiwi",
	"melon",
	"strawberry",
	"blueberry",
	"carrot",
	"broccoli",
	"tomato",
	"potato",
	"cucumber",
	"pepper",
	"onion",
	"garlic",
	"dog",
	"cat",
	"bird",
	"fish",
	"rabbit",
	"turtle",
	"hamster",
	"snake",
	"sun",
	"moon",
	"star",
	"cloud",
	"rain",
	"snow",
	"wind",
	"thunder",
	"mountain thunder valley island",
	"valley",
	"river",
	"ocean",
	"forest",
	"desert",
	"island",
	"cave",
	"computer",
	"keyboard",
	"mouse",
	"monitor",
	"printer",
	"scanner",
	"laptop",
	"tablet",
	"chair",
	"table",
	"lamp",
	"couch",
	"bed",
	"wardrobe",
	"mirror",
	"clock",
	"car",
	"bike",
	"bus",
	"train",
	"plane",
	"ship",
	"truck",
	"motorcycle",
	"book",
	"pen",
	"pencil",
	"notebook",
	"marker",
	"eraser",
	"scissors",
	"glue",
	"school",
	"teacher",
	"student",
	"classroom",
	"homework",
	"exam",
	"grade",
	"lesson",
	"movie",
	"music",
	"art",
	"dance",
	"theater",
	"sport",
	"game",
	"exercise",
	"happy",
	"sad",
	"funny",
	"serious",
	"exciting",
	"boring",
	"colorful",
	"plain",
	"big",
	"small",
	"fast",
	"slow",
	"hot"
];

export interface ICustomSuggestion extends ISuggestion {
	dayOfWeek: string;
}

export class MockAutocompleteProvider {
	getSuggestions(search: string, signal?: AbortSignal): Promise<string[]> {
		// Check if the signal is aborted
		if (signal?.aborted) {
			return Promise.reject(new DOMException("Aborted", "AbortError"));
		}

		// Filter the data based on the search string
		const filteredData = search.length > 0 ? words.filter((item) => item.startsWith(search)) : [];

		return new Promise((resolve, reject) => {
			// Create a abort handler
			let timeout: NodeJS.Timeout;
			const abortHandler = () => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			};
			timeout = setTimeout(() => {
				resolve(filteredData);
				signal?.removeEventListener("abort", abortHandler);
			}, 200);
			signal?.addEventListener("abort", abortHandler);
		});
	}
	getOnFocusSuggestions(signal?: AbortSignal): Promise<string[]> {
		if (signal?.aborted) {
			return Promise.reject(new DOMException("Aborted", "AbortError"));
		}

		return new Promise((resolve, reject) => {
			let timeout: NodeJS.Timeout;
			const abortHandler = () => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			};
			timeout = setTimeout(() => {
				resolve(["apple", "banana", "orange", "grape", "kiwi"]);
				signal?.removeEventListener("abort", abortHandler);
			}, 1000);
			signal?.addEventListener("abort", abortHandler);
		});
	}
	getCustomSuggestions(search: string, signal?: AbortSignal): Promise<ICustomSuggestion[]> {
		// Check if the signal is aborted
		if (signal?.aborted) {
			return Promise.reject(new DOMException("Aborted", "AbortError"));
		}

		// Filter the data based on the search string
		const filteredData = search.length > 0 ? words.filter((item) => item.startsWith(search)) : [];

		return new Promise((resolve, reject) => {
			// Create a abort handler
			let timeout: NodeJS.Timeout;
			const abortHandler = () => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			};
			timeout = setTimeout(() => {
				resolve(
					filteredData.map(
						(suggestion, index) =>
							({
								suggestion,
								index,
								dayOfWeek: new Date().toLocaleDateString("en-US", { weekday: "long" })
							} as ICustomSuggestion)
					)
				);
				signal?.removeEventListener("abort", abortHandler);
			}, 200);
			signal?.addEventListener("abort", abortHandler);
		});
	}
}
