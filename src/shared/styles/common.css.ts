import { createVar, style } from '@vanilla-extract/css';
import { f } from './functions';
import { responsive, vars } from './theme.css';

export const spacingMarginVar = createVar();
export const spacingWidthVar = createVar();

export const darkBlueButton = style([
	f.wFull,
	{
		'maxWidth': '420px',
		'height': '56px',
		'backgroundColor': vars.color.darkBlue,
		'borderRadius': '5px',
		'@media': {
			[responsive.desktop]: {
				width: '324px',
				height: '49px',
			},
			[responsive.tablet]: {
				width: '324px',
				height: '49px',
			},
			[responsive.tabletSmall]: {
				width: '324px',
				height: '49px',
			},
			[responsive.mobile]: {
				width: '100%',
			},
		},
	},
]);

export const lightBlueMediumButton = style([
	f.wFull,
	{
		'maxWidth': '420px',
		'height': '50px',
		'backgroundColor': vars.color.lightBlue,
		'borderRadius': '5px',
		'@media': {
			[responsive.tablet]: {
				height: '40px',
			},
			[responsive.tabletSmall]: {
				maxWidth: '100%',
				height: '37px',
			},
			[responsive.mobile]: {
				height: '34px',
			},
		},
	},
]);

export const lightBlueButton = style([
	f.wFull,
	{
		'maxWidth': '420px',
		'height': '50px',
		'backgroundColor': vars.color.lightBlue,
		'borderRadius': '5px',
		'@media': {
			[responsive.desktop]: {
				width: '324px',
				height: '49px',
			},
			[responsive.tablet]: {
				width: '324px',
				height: '49px',
			},
			[responsive.tabletSmall]: {
				width: '324px',
				height: '49px',
			},
			[responsive.mobile]: {
				width: '100%',
			},
		},
	},
]);

export const lightGrayButton = style([
	f.wFull,
	{
		maxWidth: '420px',
		height: '56px',
		fontSize: '18px',
		backgroundColor: vars.color.lightGray,
		borderRadius: '5px',
	},
]);

export const whiteAndBlueButton = style([
	f.wFull,
	{
		maxWidth: '420px',
		height: '50px',
		backgroundColor: vars.color.white,
		borderRadius: '5px',
		border: `1px solid ${vars.color.lightBlue}`,
		cursor: 'pointer',
	},
]);

export const whiteAndBlackButton = style([
	f.wFull,
	{
		'maxWidth': '420px',
		'height': '50px',
		'backgroundColor': vars.color.white,
		'borderRadius': '5px',
		'border': `1px solid ${vars.color.black}`,
		'@media': {
			[responsive.tablet]: {
				height: '40px',
			},
			[responsive.tabletSmall]: {
				maxWidth: '100%',
				height: '37px',
			},
			[responsive.mobile]: {
				height: '34px',
			},
		},
	},
]);

export const naverButtonBox = style([
	f.pRelative,
	f.wFull,
	{
		maxWidth: '420px',
		height: '56px',
		backgroundColor: vars.color.green,
		borderRadius: '5px',
	},
]);

export const naverButtonStyle = style([
	f.wFull,
	{
		maxWidth: '420px',
		backgroundColor: 'transparent',
		fontSize: '18px',
	},
]);

export const kakaoButtonBox = style([
	f.pRelative,
	f.wFull,
	{
		maxWidth: '420px',
		height: '56px',
		backgroundColor: vars.color.yellow,
		borderRadius: '5px',
	},
]);

export const kakaoButtonStyle = style([
	f.wFull,
	{
		maxWidth: '420px',
		backgroundColor: 'transparent',
		fontSize: '18px',
		fontWeight: '600',
	},
]);

export const snsLogoStyle = style({
	position: 'absolute',
	left: '20px',
	top: '18px',
});

export const spacingStyle = style({
	width: spacingWidthVar,
	marginTop: spacingMarginVar,
});
