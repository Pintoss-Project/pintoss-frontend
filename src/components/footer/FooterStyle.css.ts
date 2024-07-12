import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const footerBox = style([
	f.wFull,
	{
		height: '273px',
		padding: '0px 80px',
		backgroundColor: vars.color.background,
	},
]);

export const pText = style({
	fontSize: '14px',
	color: vars.color.mediumGray,
});
