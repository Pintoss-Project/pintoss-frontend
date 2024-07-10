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

export const adminSideBarContainer = style({
	width: '25%',
	height: '100dvh',
	minWidth: '80px',
	backgroundColor: '#EAEAEA',
});

export const adminSideBarIconBox = style({
	height: '90px',
	selectors: {
		'&:hover': {
			width: '100%',
			backgroundColor: vars.color.white,
		},
	},
});

export const adminSideBarIconImage = style({
	width: '29px',
	height: '29px',
});

export const plusText = style([
	f.pAbsolute,
	{
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -75%)',
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#959595',
	},
]);

export const selectedText = style({
	color: vars.color.periwinkle,
});

export const selectedBg = style({
	width: '100%',
	backgroundColor: vars.color.white,
});

export const userSearchBox = style({
	padding: '35px 22px',
	border: `1px solid ${vars.color['lighter-gray']}`,
});

export const userSearchButton = style({
	width: '100px',
	height: '70px',
	backgroundColor: vars.color['lightest-gray'],
	border: `1px solid ${vars.color['light-gray']}`,
});

const microText = style({
	fontSize: '12px',
});

const smallText = style({
	fontSize: '14px',
});

const mediumText = style({
	fontSize: '18px',
});

const lighterGrayBorder = style({
	border: `1px solid ${vars.color['lighter-gray']}`,
});

export const darkGraySmallText = style([
	smallText,
	{
		color: vars.color['dark-gray'],
	},
]);

export const blackSmallText = style([
	smallText,
	{
		color: vars.color['dark-gray'],
	},
]);

export const lighterGrayInput = style([
	lighterGrayBorder,
	{
		padding: '10px',
	},
]);

export const userFlexItem1 = style({
	flex: 0.5,
});

export const userFlexItem2 = style({
	flex: 0.5,
});

export const userFlexItem3 = style({
	flex: 3,
});

export const userFlexItem4 = style({
	flex: 2,
});

export const userFlexItem5 = style({
	flex: 1,
});

export const userFlexItem6 = style({
	flex: 2,
});

export const userFlexItem7 = style({
	flex: 1,
});

export const checkbox = style({
	appearance: 'none',
	width: '14px',
	height: '14px',
	border: `1px solid ${vars.color.silver}`,
	borderRadius: '3px',
	position: 'relative',
	cursor: 'pointer',
	selectors: {
		'&:checked::before': {
			content: '✓',
			display: 'block',
			width: '90%',
			height: '90%',
			paddingBottom: '4px',
			color: vars.color.white,
			fontWeight: 'bold',
			backgroundColor: vars.color.periwinkle,
			border: `1px solid ${vars.color.periwinkle}`,
			borderRadius: '3px',
			textAlign: 'center',
		},
	},
});

export const paginationBox = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
});

export const pageButton = style({
	padding: '8px 12px',
	fontSize: '14px',
	color: vars.color['dark-gray'],
	backgroundColor: vars.color.white,
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '4px',
	cursor: 'pointer',
	selectors: {
		'&:hover': {
			backgroundColor: vars.color['light-gray'],
		},
		'&:disabled': {
			backgroundColor: vars.color['lighter-gray'],
			cursor: 'not-allowed',
		},
	},
});

export const activePageButton = style({
	backgroundColor: vars.color.periwinkle,
	color: vars.color.white,
	borderColor: vars.color.periwinkle,
	selectors: {
		'&:hover': {
			backgroundColor: vars.color.periwinkle,
		},
	},
});
