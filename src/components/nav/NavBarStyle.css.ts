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

export const sideBarContainer = style({
	width: '349px',
	height: '100%',
	padding: '28px 22px 45px 22px',
	margin: '108px 15px 0px 60px',
	backgroundColor: vars.color.white,
	borderRadius: '0px 15px 15px 15px',
});

export const grayText = style({
	color: '#7C8184',
	fontSize: '17px',
});

export const darkGrayText = style({
	marginLeft: '11px',
	color: vars.color['dark-gray'],
	fontSize: '16px',
});

export const darkBlueText = style({
	color: vars.color['dark-blue'],
	fontSize: '25px',
	fontWeight: 'bold',
});

export const brownText = style({
	marginLeft: '3px',
	color: vars.color.brown,
	fontWeight: '500',
});
