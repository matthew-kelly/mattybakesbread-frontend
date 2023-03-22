module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// backgroundImage: {
			// 	'page-background': `url('/static/mattybakesbread_background.svg')`,
			// 	'page-background-lg': `url('/static/mattybakesbread_background_large.svg')`
			// },
			borderRadius: {
				5: '5px',
			},
			borderWidth: {
				1: '1px',
			},
			boxShadow: {
				'block-2': '-2px 2px 0px #333333',
				'block-3': '-3px 3px 0px #333333',
				'block-5': '-5px 5px 0px #333333',
				blur: '0px 4px 16px rgba(0, 0, 0, 0.2)',
				'blur-lg': '0px 4px 16px rgba(0, 0, 0, 0.4)',
			},
			colors: {
				'primary-light': '#E8BB93',
				'primary-dark': '#784F2C',
				'secondary-light': '#C5F4E0',
				'secondary-dark': '#769588',
				accent: '#19381F',
				black: '#222222',
				white: '#FFFFFF',
			},
			fontSize: {
				h1: ['3.5rem', '4rem'],
				'h1-super': ['4rem', '4.75rem'],
				h2: ['2.5rem', '3rem'],
				h3: ['2rem', '2.5rem'],
				h4: ['1.5rem', '2rem'],
				h5: ['1.25rem', '1.5rem'],
				h6: ['1.1rem', '1.3rem'],
				'button-lg': ['28px', '28px'],
				'mobile-nav-logo': ['20px', '16px'],
			},
			transitionProperty: {
				size: 'width, height',
				spacing: 'margin, padding',
			},
		},
		fontFamily: {
			sans: ['"Work SansVariable"', 'sans-serif'],
			display: ['Chaney', 'sans-serif'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
