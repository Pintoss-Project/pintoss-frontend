import { style } from '@vanilla-extract/css';
import { vars, responsive } from '@/shared/styles/theme.css';
import { f } from '@/shared/styles/functions';

export const navbarTopBox = style([
	f.wFull,
	f.pFixed,
	{
		'height': '100px',
		'padding': '0px 80px',
		'zIndex': 10,
		'@media': {
			[responsive.tablet]: {
				padding: '0px 50px',
			},
			[responsive.tabletSmall]: {
				padding: '0px 25px',
			},
			[responsive.mobile]: {
				padding: '0px 15px',
			},
		},
	},
]);

export const listItemStyle = style({
	width: '100px',
	color: vars.color.darkerGray,
	fontSize: '20px',
	cursor: 'pointer',
	selectors: {
		'&:hover': {
			color: vars.color.skyBlue,
		},
	},
});

export const navbarTopMenuBox = style({
	'position': 'fixed',
	'top': '0',
	'right': '20px',
	'display': 'none',
	'padding': '25px 40px',
	'backgroundColor': vars.color.white,
	'borderRadius': '0 0 15px 15px',
	'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
	'@media': {
		[responsive.desktop]: {
			display: 'block',
		},
	},
});

export const loginButton = style({
	padding: '9px 24px',
	marginLeft: '10px',
	color: vars.color.skyBlue,
	fontSize: '20px',
	border: `1px solid ${vars.color.skyBlue}`,
	borderRadius: '5px 0 5px 5px',
	selectors: {
		'&:hover': {
			color: vars.color.white,
			backgroundColor: vars.color.skyBlue,
		},
	},
});

export const sideBarContainer = style({
	'width': '349px',
	'height': '100%',
	'padding': '28px 22px 45px 22px',
	'margin': '108px 15px 0px 60px',
	'backgroundColor': vars.color.white,
	'borderRadius': '0px 15px 15px 15px',
	'@media': {
		[responsive.tablet]: {
			display: 'none',
		},
	},
});

export const grayText = style({
	color: '#7C8184',
	fontSize: '17px',
});

export const darkGrayText = style({
	marginLeft: '11px',
	color: vars.color.darkGray,
	fontSize: '16px',
});

export const darkBlueText = style({
	color: vars.color.darkGray,
	fontSize: '25px',
	fontWeight: 'bold',
});

export const brownText = style({
	marginLeft: '3px',
	color: vars.color.brown,
	fontWeight: '500',
});

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

export const cartDesktopIcon = style({
	width: '40px',
	height: '40px',
	marginLeft: '12px',
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

export const gradientMenuIconWrap = style({
	'display': 'none',
	'@media': {
		[responsive.tablet]: {
			display: 'block',
		},
	},
});

export const gradientMenuIcon = style({
	'cursor': 'pointer',
	'@media': {
		[responsive.tablet]: {
			display: 'block',
			width: '40px',
			height: '40px',
		},
		[responsive.tabletSmall]: {
			width: '35px',
			height: '35px',
		},
		[responsive.mobile]: {
			width: '30px',
			height: '30px',
		},
	},
});
