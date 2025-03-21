import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	'padding': '8px 20px',
	'backgroundColor': vars.color.background,
	'@media': {
		[responsive.mobile]: {
			padding: '0',
			backgroundColor: vars.color.white,
		},
		[responsive.tabletSmall]: {
			padding: '0 10px',
			backgroundColor: vars.color.white,
		},
	},
});

export const sectionStyle = style({
	// width: '100%',
	width: 'calc(100vw - 40px)',
	// height: '100%',
	marginTop: '100px',
	padding: '0 20px',
	backgroundColor: vars.color.white,
	borderRadius: '0px 15px 15px 15px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const innerWrap = style({
	'width': '100%',
	'maxWidth': '460px',
	'@media': {
		[responsive.mobile]: {
			width: '97%',
			padding: '0 10px',
		},
		[responsive.tabletSmall]: {
			width: '100%',
			padding: '0 10px',
		},
	},
});

export const mainWrap = style({
	width: '100%',
});

export const footerWrap = style({
	width: '100%',
	marginTop: 'auto',
});

export const authHeader = style({
	fontSize: '30px',
	fontWeight: '600',
});
