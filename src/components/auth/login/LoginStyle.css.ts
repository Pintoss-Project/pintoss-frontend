import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const loginMainContainer = style({
	width: '420px',
});

export const loginInputStyle = style({
	height: '50px',
	padding: '18px',
	border: `1px solid ${vars.color['pale-gray']}`,
	borderRadius: '5px',
});

export const grayText = style({
	fontSize: '14px',
	color: vars.color['light-gray'],
});

export const blueText = style({
	marginLeft: '7px',
	fontSize: '14px',
	color: vars.color['light-blue'],
});
