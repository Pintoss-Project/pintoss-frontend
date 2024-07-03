import { createGlobalTheme } from '@vanilla-extract/css';

export const colors = {
	'sky-blue': '#00A0E9',
	'light-blue': '#54C3F6',
	'blue': '#1E90FF',
	'dark-blue': '#00499E',
	'periwinkle': '#8894FF',
	'light-red': '#FF6347',
	'soft-red': '#F16767',
	'lime-green': '#32CD32',
	'green': '#0DC75B',
	'yellow': '#FFE613',
	'brown': '#3B1E1E',
	'black': '#000000',
	'white': '#FFFFFF',
	'darker-gray': '#333333',
	'dark-gray': '#555555',
	'dim-gray': '#444444',
	'medium-gray': '#777777',
	'light-gray': '#999999',
	'lighter-gray': '#D9D9D9',
	'lightest-gray': '#EEEEEE',
	'pale-gray': '#DDDDDD',
	'silver': '#CCCCCC',
	'white-smoke': '#F8F8F8',
	'accent': '#e53e3e',
	'success': '#2ecc71',
	'warning': '#f39c12',
	'danger': '#e74c3c',
	'info': '#3498db',
};

export const spacing = {
	'xs': '4px',
	'sm': '8px',
	'md': '12px',
	'lg': '16px',
	'xl': '20px',
	'2xl': '24px',
	'3xl': '28px',
};

export const responsive = {
	mobile: 'only screen and (max-width: 430px)',
	tabletSmall: 'only screen and (max-width: 820px)',
	tablet: 'only screen and (max-width: 1024px)',
	desktop: 'only screen and (min-width: 1025px)',
};

export const vars = createGlobalTheme(':root', {
	color: colors,
	spacing: spacing,
	responsive: responsive,
});
