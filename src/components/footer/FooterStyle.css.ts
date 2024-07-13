import { f } from '@/shared/styles/functions';
import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const footerBox = style([
	f.wFull,
	{
		'height': '273px',
		'padding': '0px 80px',
		'backgroundColor': vars.color.background,
		'@media': {
			[responsive.tablet]: {
				padding: '0px 20px',
			},
			[responsive.tabletSmall]: {
				padding: '0px 15px',
			},
			[responsive.mobile]: {
				padding: '0px 10px',
			},
		},
	},
]);

export const pText = style({
	'fontSize': '14px',
	'color': vars.color.mediumGray,
	'@media': {
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const footerFlexBox = style({
	'@media': {
		[responsive.tabletSmall]: {
			display: 'flex',
			flexDirection: 'column',
		},
	},
});

export const footerLeftBox = style({
	'@media': {
		[responsive.tablet]: {
			marginRight: '60px',
		},
		[responsive.tabletSmall]: {
			width: '100%',
			margin: '50px 0 80px 0',
			order: 2,
		},
	},
});

export const footerRightBox = style({
	'@media': {
		[responsive.desktop]: {
			display: 'flex',
			alignItems: 'flex-end',
		},
		[responsive.tabletSmall]: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			order: 1,
		},
	},
});

export const secureTransactionImage = style({
	width: '420px',
	height: '46px',
});
