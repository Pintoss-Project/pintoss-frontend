import { createVar, style } from '@vanilla-extract/css';
import { f } from './functions';
import { vars } from './theme.css';

export const spacingMarginVar = createVar();
export const spacingWidthVar = createVar();

export const darkBlueButton = style([
	f.wFull,
	{
		height: '56px',
		backgroundColor: vars.color.darkBlue,
		borderRadius: '5px',
	},
]);

export const lightBlueButton = style([
	f.wFull,
	{
		height: '56px',
		fontSize: '18px',
		backgroundColor: vars.color.lightBlue,
		borderRadius: '5px',
	},
]);

export const lightGrayButton = style([
	f.wFull,
	{
		height: '56px',
		fontSize: '18px',
		backgroundColor: vars.color.lightGray,
		borderRadius: '5px',
	},
]);

export const whiteAndBlueButton = style([
	f.wFull,
	{
		height: '50px',
		backgroundColor: vars.color.white,
		borderRadius: '5px',
		border: `1px solid ${vars.color.lightBlue}`,
	},
]);

export const naverButtonBox = style([
	f.pRelative,
	f.wFull,
	{
		height: '56px',
		backgroundColor: vars.color.green,
		borderRadius: '5px',
	},
]);

export const naverButtonStyle = style([
	f.wFull,
	{
		backgroundColor: 'transparent',
		fontSize: '18px',
	},
]);

export const kakaoButtonBox = style([
	f.pRelative,
	f.wFull,
	{
		height: '56px',
		backgroundColor: vars.color.yellow,
		borderRadius: '5px',
	},
]);

export const kakaoButtonStyle = style([
	f.wFull,
	{
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
