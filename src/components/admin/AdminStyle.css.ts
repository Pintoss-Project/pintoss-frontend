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

export const blackMediumText = style([
	mediumText,
	{
		color: vars.color.black,
		fontWeight: 'semi-bold',
	},
]);

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

export const lightGrayMediumText = style([
	mediumText,
	{
		color: vars.color['light-gray'],
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

export const lightGrayButton = style({
	width: '100px',
	height: '36px',
	padding: '10px',
	backgroundColor: vars.color['lightest-gray'],
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '5px',
});

export const rateInputStyle = style({
	padding: '7px 0',
	border: 'none',
	outline: 'none',
	textAlign: 'center',
});

export const baseInputStyle = style([
	f.wFull,
	{
		padding: '6px 0',
		border: 'none',
		outline: 'none',
		textAlign: 'left',
	},
]);

export const dropImageBox = style([
	f.pAbsolute,
	{
		left: 0,
		top: 0,
		width: '100px',
		height: '100px',
		objectFit: 'cover',
		cursor: 'pointer',
	},
]);

export const dropzone = style({
	position: 'relative',
	flex: '8',
	marginLeft: '20px',
	borderRadius: '4px',
	height: '100px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	zIndex: 1,
});

export const customTextarea = style({
	width: '100%',
	height: '100px',
	padding: '10px',
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '4px',
	resize: 'none',
	fontFamily: 'inherit',
	fontSize: '10px',
	lineHeight: '1.3',
	boxSizing: 'border-box',
	selectors: {
		'&:focus': {
			outline: 'none',
			borderColor: vars.color.periwinkle,
			borderRadius: '4px',
		},
	},
});

export const customSelect = style({
	width: '100%',
	padding: '10px',
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '4px',
	backgroundColor: 'white',
	color: '#AAAAAA',
	fontSize: '14px',
	fontFamily: 'inherit',
	appearance: 'none',
	backgroundImage:
		"url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 10px center',
	backgroundSize: '10px',
	selectors: {
		'&:focus': {
			outline: 'none',
			borderColor: vars.color['blue'],
		},
	},
});
