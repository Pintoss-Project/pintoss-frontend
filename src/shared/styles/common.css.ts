import { createVar, style } from '@vanilla-extract/css';
import { f } from './functions';
import { vars } from './theme.css';

export const spacingMarginVar = createVar();
export const spacingWidthVar = createVar();

export const darkBlueButton = style([
	f.wFull,
	{
		height: '56px',
		backgroundColor: vars.color['dark-blue'],
		borderRadius: '10px',
	},
]);

export const whiteAndBlueButton = style([
	f.wFull,
	{
		height: '50px',
		backgroundColor: vars.color.white,
		borderRadius: '5px',
		border: `1px solid ${vars.color['light-blue']}`,
	},
]);

export const spacingStyle = style({
	width: spacingWidthVar,
	marginTop: spacingMarginVar,
});
