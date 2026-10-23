// Placeholder text for content that will be written later. Search for `lorem` to find
// every place that still needs real text.

const text =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const words = text.replace(/[.,]/g, '').toLowerCase().split(' ');

/** A paragraph of placeholder text. */
export const loremParagraph = text;

/** `count` placeholder words starting at `offset`, capitalised, without punctuation. */
export function loremWords(count: number, offset = 0): string {
	const picked = Array.from({ length: count }, (_, i) => words[(offset + i) % words.length]);
	const sentence = picked.join(' ');
	return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
