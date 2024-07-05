import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const navbarTopBox = style([
	f.wFull,
	f.pFixed,
	{
		height: '100px',
		padding: '0px 80px',
	},
]);

export const listItemStyle = style({
	width: '100px',
	color: vars.color['darker-gray'],
	fontSize: '20px',
	selectors: {
		'&:hover': {
			color: vars.color['sky-blue'],
		},
	},
});

export const loginButton = style({
	padding: '9px 24px',
	marginLeft: '10px',
	color: vars.color['sky-blue'],
	fontSize: '20px',
	border: `1px solid ${vars.color['sky-blue']}`,
	borderRadius: '5px 0 5px 5px',
	selectors: {
		'&:hover': {
			color: vars.color.white,
			backgroundColor: vars.color['sky-blue'],
		},
	},
});
