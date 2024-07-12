import { f } from '@/shared/styles/functions';
import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const tableMenuBox = style([f.wFull, f.hFull, {}]);

export const tableMenuNavBox = style([
	f.pRelative,
	f.wFull,
	{
		'height': '100px',
		'padding': '30px 80px',
		'@media': {
			[responsive.tablet]: {
				padding: '30px 50px',
			},
			[responsive.tabletSmall]: {
				padding: '30px 25px',
			},
			[responsive.mobile]: {
				padding: '30px 15px',
			},
		},
	},
]);

export const logoBox = style({
	'position': 'relative',
	'@media': {
		[responsive.desktop]: {
			width: '165px',
			height: '45px',
		},
		[responsive.tablet]: {
			width: '132px',
			height: '36px',
		},
		[responsive.mobile]: {
			width: '99px',
			height: '27px',
		},
	},
});

export const cartIcon = style({
	'position': 'relative',
	'display': 'none',
	'cursor': 'pointer',
	'@media': {
		[responsive.tablet]: {
			display: 'block',
			marginTop: '4px',
			width: '40px',
			height: '40px',
		},
		[responsive.tabletSmall]: {
			marginTop: '4px',
			width: '35px',
			height: '35px',
		},
		[responsive.mobile]: {
			width: '30px',
			height: '30px',
			marginTop: '4px',
		},
	},
});

export const menuButtonBox = style([
	f.wFull,
	{
		height: '63px',
		borderBottom: `1px solid ${vars.color.paleGray}`,
	},
]);

export const menuButton = style([
	f.hFull,
	{
		backgroundColor: vars.color.white,
		fontSize: '20px',
	},
]);