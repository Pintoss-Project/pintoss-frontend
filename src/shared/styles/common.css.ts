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

export const spacingStyle = style({
	width: spacingWidthVar,
	marginTop: spacingMarginVar,
});
