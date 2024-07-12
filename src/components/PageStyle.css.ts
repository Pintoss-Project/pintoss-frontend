import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	'padding': '8px 20px',
	'backgroundColor': vars.color.background,
	'@media': {
		[responsive.tablet]: {
			padding: '8px 15px',
		},
		[responsive.tabletSmall]: {
			padding: '8px 0',
		},
	},
});

export const sectionStyle = style({
	'width': '100%',
	'height': '100%',
	'padding': '60px 50px 96px 50px',
	'marginTop': '100px',
	'backgroundColor': vars.color.white,
	'borderRadius': '0px 15px 15px 15px',
	'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
	'@media': {
		[responsive.tablet]: {
			padding: '60px 40px 70px 40px',
		},
		[responsive.tabletSmall]: {
			padding: '60px 10px 50px 10px',
		},
		[responsive.mobile]: {
			padding: '60px 10px 30px 10px',
		},
	},
});

export const pageHeader = style({
	'width': '100%',
	'color': vars.color.darkerGray,
	'fontSize': '30px',
	'fontWeight': '600',
	'textAlign': 'left',
	'@media': {
		[responsive.tablet]: {
			fontSize: '25px',
		},
		[responsive.tabletSmall]: {
			fontSize: '24px',
			textAlign: 'center',
		},
		[responsive.mobile]: {
			fontSize: '22px',
			textAlign: 'center',
		},
	},
});
