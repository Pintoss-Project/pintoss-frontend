import { createGlobalTheme } from '@vanilla-extract/css';

export const colors = {
	skyBlue: '#00A0E9',
	lightBlue: '#54C3F6',
	blue: '#1E90FF',
	darkBlue: '#00499E',
	periwinkle: '#8894FF',
	lightRed: '#FF6347',
	softRed: '#F16767',
	limeGreen: '#32CD32',
	green: '#0DC75B',
	yellow: '#FFE613',
	brown: '#3B1E1E',
	black: '#000000',
	white: '#FFFFFF',
	darkerGray: '#333333',
	darkGray: '#555555',
	dimGray: '#444444',
	mediumGray: '#777777',
	lightGray: '#999999',
	lighterGray: '#D9D9D9',
	lightestGray: '#EEEEEE',
	paleGray: '#DDDDDD',
	silver: '#CCCCCC',
	whiteSmoke: '#F8F8F8',
	background: '#FAFAFA',
	accent: '#e53e3e',
	success: '#2ecc71',
	warning: '#f39c12',
	danger: '#e74c3c',
	info: '#3498db',
};

export const spacing = {
	xs: '4px',
	sm: '8px',
	md: '12px',
	lg: '16px',
	xl: '20px',
	x2l: '24px',
	x3l: '28px',
};

export const responsive = {
	mobile: 'only screen and (max-width: 430px)',
	tabletSmall: 'only screen and (max-width: 768px)',
	tablet: 'only screen and (max-width: 1024px)',
	desktop: 'only screen and (min-width: 1025px)',
};

export const vars = createGlobalTheme(':root', {
	color: colors,
	spacing: spacing,
});
