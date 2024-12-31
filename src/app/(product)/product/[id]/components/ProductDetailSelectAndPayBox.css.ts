import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
	'padding': '0 0 0 7%',
	'@media': {
		[responsive.tabletSmall]: {
			padding: '0 10px',
		},
	},
});
export const whiteBoldText = style({
	color: vars.color.white,
	fontSize: '20px',
});

export const totalPayInfoBox = style({
	'padding': '24px 20px',
	'backgroundColor': vars.color.dimGray,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tablet]: {
			padding: '20px',
			height: '60px',
		},
	},
});
