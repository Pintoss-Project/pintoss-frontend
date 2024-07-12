import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const loginMainContainer = style({
	width: '100%',
	maxWidth: '420px',
});

export const loginInputStyle = style({
	height: '50px',
	padding: '18px',
	border: `1px solid ${vars.color.paleGray}`,
	borderRadius: '5px',
});

export const grayText = style({
	fontSize: '14px',
	color: vars.color.lightGray,
});

export const blueText = style({
	marginLeft: '7px',
	fontSize: '14px',
	color: vars.color.lightBlue,
});

export const loginDivider = style({
	'width': '40%',
	'borderBottom': `1px solid ${vars.color.paleGray}`,
	'@media': {
		[responsive.mobile]: {
			width: '44%',
		},
	},
});
