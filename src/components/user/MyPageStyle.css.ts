import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const memberInfoBox = style({
	height: '207px',
	padding: '30px',
	marginRight: '20px',
	backgroundColor: vars.color['white-smoke'],
	borderRadius: '0px 10px 10px 10px',
});

export const memberInfoInnerBox = style({
	height: '100%',
	padding: '15px',
	backgroundColor: vars.color.white,
	borderRadius: '0px 10px 10px 10px',
});

export const snsInfoBox = style({
	height: '207px',
	padding: '30px',
	backgroundColor: vars.color['white-smoke'],
	borderRadius: '0px 10px 10px 10px',
});

export const authenticationInfoBox = style({
	padding: '35px 30px 40px 30px',
	backgroundColor: vars.color['white-smoke'],
	borderRadius: '0px 10px 10px 10px',
});

export const authenticationInfoInnerBox = style({
	height: '201px',
	padding: '24px',
	backgroundColor: vars.color.white,
	borderRadius: '0px 10px 10px 10px',
});

export const darkerGrayText = style({
	color: vars.color['darker-gray'],
});

export const darkGrayText = style({
	color: vars.color['dark-gray'],
});

export const whiteButton = style({
	width: '434px',
	height: '75px',
	backgroundColor: vars.color.white,
	border: `1px solid ${vars.color['light-gray']}`,
	borderRadius: '5px',
});

export const grayButton = style({
	width: '434px',
	height: '75px',
	backgroundColor: vars.color['white-smoke'],
	border: `1px solid ${vars.color['light-gray']}`,
	borderRadius: '5px',
});

export const authenticationInfoCircle = style({
	width: '15px',
	height: '15px',
	marginRight: '5px',
	color: vars.color.white,
	fontSize: '10px',
	borderRadius: '50%',
	backgroundColor: vars.color['dark-blue'],
});

export const authenticationInfoText = style({
	color: vars.color['dark-gray'],
	fontSize: '14px',
});

export const authenticationInfoSubText = style({
	marginLeft: '20px',
	color: vars.color['medium-gray'],
	fontSize: '14px',
	textAlign: 'left',
});

export const snsButtonCheckBox = style([
	f.pAbsolute,
	{
		top: '18px',
		right: '17px',
		width: '20px',
		height: '20px',
		borderRadius: '50%',
		backgroundColor: vars.color.white,
		color: vars.color['pale-gray'],
	},
]);
