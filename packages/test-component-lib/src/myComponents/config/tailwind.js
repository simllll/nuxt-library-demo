module.exports = {
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		colors: {
			'color-main': '#0fb1af',
			'color-main-hover': '#009896', // 10% darker of main

			'color-main-business': '#007f7e',
			'color-main-business-hover': '#006665', // 10% darker of main

			'color-blue': '#2a84e3',
			'color-blue-hover': '#116BCA', // 10% darker of blue

			'color-white': '#ffffff',
			'color-white-hover': '#f2f2f2', // 10% darker of white

			'color-yellow': '#fdd408',
			'color-yellow-hover': '#E4BB00', // 10% darker of yellow

			'color-purple': '#bd2297',
			'color-purple-hover': '#A4097E', // 10% darker of purple

			transparent: 'transparent',
			'color-main-light': '#d9f2f2',
			'color-main-lighter': '#F3FFFF',
			'color-blue-grey': '#334b65',
			'color-grey': '#9a9a9a',
			'color-grey-light': '#d6d6d6',
			'color-grey-lightest': '#f2f2f2',
			'color-text': '#596d83'
		},
		container: {
			center: true
		},
		fontFamily: {
			sans: [
				'system-ui',
				'BlinkMacSystemFont',
				'-apple-system',
				'Segoe UI',
				'Roboto',
				'Oxygen',
				'Ubuntu',
				'Cantarell',
				'Fira Sans',
				'Droid Sans',
				'Helvetica Neue',
				'sans-serif'
			],
			serif: [
				'Constantia',
				'Lucida Bright',
				'Lucidabright',
				'Lucida Serif',
				'Lucida',
				'DejaVu Serif',
				'Bitstream Vera Serif',
				'Liberation Serif',
				'Georgia',
				'serif'
			],
			mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
		},
		fontSize: {
			'2xs': '0.625rem', // 10px
			xs: '.75rem', // 12px
			sm: '.875rem', // 14px
			base: '1rem', // 16px
			lg: '1.125rem', // 18px
			xl: '1.25rem', // 20px
			'2xl': '1.5rem', // 24px
			'3xl': '1.875rem', // 30px
			'4xl': '2.25rem', // 36px
			'5xl': '3rem' // 48px
		},
		borderColor: theme => ({
			...theme('colors'),
			default: theme('colors.gray.300', 'currentColor'),
		}),
	},
	variants: {
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundColor: ['responsive', 'hover', 'focus'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		backgroundSize: ['responsive'],
		borderCollapse: [],
		borderColor: ['responsive', 'hover', 'focus'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidth: ['responsive'],
		cursor: ['responsive'],
		display: ['responsive'],
		flexDirection: ['responsive'],
		flexWrap: ['responsive'],
		alignItems: ['responsive'],
		alignSelf: ['responsive'],
		justifyContent: ['responsive'],
		alignContent: ['responsive'],
		flex: ['responsive'],
		flexGrow: ['responsive'],
		flexShrink: ['responsive'],
		float: ['responsive'],
		fontFamily: false,
		fontWeight: ['responsive', 'hover', 'focus'],
		height: ['responsive'],
		lineHeight: ['responsive'],
		listStylePosition: ['responsive'],
		listStyleType: ['responsive'],
		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		negativeMargin: ['responsive'],
		opacity: ['responsive'],
		outline: ['focus'],
		overflow: ['responsive'],
		padding: ['responsive'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		inset: ['responsive'],
		resize: ['responsive'],
		boxShadow: ['responsive', 'hover', 'focus'],
		fill: [],
		stroke: [],
		tableLayout: ['responsive'],
		textAlign: ['responsive'],
		textColor: ['responsive', 'hover', 'focus'],
		fontSize: ['responsive'],
		fontStyle: ['responsive', 'hover', 'focus'],
		fontSmoothing: ['responsive', 'hover', 'focus'],
		textDecoration: ['responsive', 'hover', 'focus'],
		textTransform: ['responsive', 'hover', 'focus'],
		letterSpacing: ['responsive'],
		userSelect: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		wordBreak: ['responsive'],
		width: ['responsive'],
		zIndex: ['responsive']
	}
};
