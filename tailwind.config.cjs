/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			minWidth: {
				'1/2': '50%',
				'1/4': '25%',
				'1/5': '20%',
				'1/8': '12.5%'
			}
		}
	},
	plugins: []
}
