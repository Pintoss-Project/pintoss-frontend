import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const adminLoginContainer = style({
	height: '80dvh',
});

export const adminLoginFlexWrap = style({
	width: '30%',
	minWidth: '380px',
	maxWidth: '420px',
});

export const adminPurpleColor = style({
	backgroundColor: vars.color.periwinkle,
});

export const adminLoginButton = style([
	f.wFull,
	adminPurpleColor,
	{
		height: '60px',
		padding: '17px',
		fontSize: '22px',
		fontWeight: 'bold',
		borderRadius: '5px',
	},
]);
