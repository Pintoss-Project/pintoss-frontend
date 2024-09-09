import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
	to: {
		transform: 'rotate(360deg)',
	},
});

export const spinnerContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
});

export const spinner = style({
	border: '4px solid rgba(0, 0, 0, 0.1)',
	borderLeftColor: '#0070f3',
	borderRadius: '50%',
	width: '40px',
	height: '40px',
	animation: `${spin} 1s linear infinite`,
});
