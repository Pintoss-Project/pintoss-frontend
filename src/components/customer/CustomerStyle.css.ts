import { f } from '@/shared/styles/functions';
import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const customerSection = style({
	margin: '108px 2% 100px 0px',
	minHeight: '1400px',
	backgroundColor: vars.color.white,
});

export const customerHeader = style({
	'padding': '60px 0 0 50px',
	'fontSize': '35px',
	'fontWeight': '500',
	'textAlign': 'left',
	'@media': {
		[responsive.tablet]: {
			fontSize: '30px',
		},
		[responsive.tabletSmall]: {
			fontSize: '28px',
			textAlign: 'center',
		},
		[responsive.mobile]: {
			fontSize: '25px',
			textAlign: 'center',
		},
	},
});

export const arrowIconRotated = style({
	transform: 'rotate(180deg)',
	transition: 'transform 0.3s ease',
});

export const expandedContent = style({
	padding: '0',
	maxHeight: '0',
	backgroundColor: vars.color.whiteSmoke,
	transition: 'max-height 0.3s ease, padding 0.3s ease',
	overflow: 'hidden',
});

export const expandedContentVisible = style({
	padding: '50px 45px',
	minHeight: '700px',
});

export const paginationBox = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
});

export const pageButton = style({
	padding: '8px 12px',
	fontSize: '14px',
	color: vars.color.darkGray,
	backgroundColor: vars.color.white,
	border: `1px solid ${vars.color.lightGray}`,
	borderRadius: '4px',
	cursor: 'pointer',
	selectors: {
		'&:hover': {
			backgroundColor: vars.color.lightGray,
		},
		'&:disabled': {
			backgroundColor: vars.color.lightGray,
			cursor: 'not-allowed',
		},
	},
});

export const activePageButton = style({
	backgroundColor: vars.color.skyBlue,
	color: vars.color.white,
	borderColor: vars.color.skyBlue,
	selectors: {
		'&:hover': {
			backgroundColor: vars.color.skyBlue,
		},
	},
});
