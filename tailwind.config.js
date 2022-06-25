const Nth = require("tailwind-nth-child");
const nth3n = new Nth("3n", "3n+0"); // Sub-elements that are multiples of 3

const nth3 = new Nth("3n", "3n-2"); // The first five child elements

module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"nature-light": "url('/reef_img.jpg')",
			},
		},
	},
	variants: {
		// extend the backgroundColor variants
		extend: {
			borderWidth: ["nth-child-3n", "nth-child-3"],
		},
	},
	plugins: [nth3n.nthChild(), nth3.nthChild()],
};
