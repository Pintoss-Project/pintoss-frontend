import { responsive, vars } from '@/shared/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const subTitle = style({
	fontSize: '18px',
	fontWeight: '500',
	textAlign: 'left',
});

export const starStyle = style({
	margin: '0px 10px 0px 2px',
	fontSize: '14px',
	color: vars.color.skyBlue,
});

export const labelText = style({
	'width': '110px',
	'fontSize': '14px',
	'textAlign': 'left',
	'@media': {
		[responsive.mobile]: {
			display: 'block',
			width: '100%',
			marginBottom: '5px',
			textAlign: 'left',
		},
	},
});

export const label = style({
	width: '110px',
	fontSize: '14px',
	textAlign: 'left',
});

export const inputStyle = style({
	'width': '316px',
	'height': '40px',
	'padding': '10px',
	'fontSize': '12px',
	'border': `1px solid ${vars.color.lighterGray}`,
	'borderRadius': '5px',
	'@media': {
		[responsive.mobile]: {
			width: '100%',
		},
	},
});

export const pText = style({
	'width': '100%',
	'fontSize': '10px',
	'color': vars.color.mediumGray,
	'textAlign': 'right',
	'@media': {
		[responsive.mobile]: {
			textAlign: 'center',
			marginLeft: '40px',
		},
	},
});

export const phoneInfoBox = style({
	width: '100%',
	height: '153px',
	padding: '20px',
	backgroundColor: vars.color.whiteSmoke,
});

export const baseText = style({
	fontSize: '14px',
});

export const smallText = style({
	fontSize: '12px',
	color: vars.color.darkGray,
	textAlign: 'left',
});

export const skyBlueText = style({
	'marginLeft': '5px',
	'color': vars.color.skyBlue,
	'fontSize': '12px',
	'fontWeight': '500',
	'@media': {
		[responsive.mobile]: {
			width: '50px',
		},
	},
});

export const redText = style({
	fontSize: '12px',
	color: vars.color.softRed,
	textAlign: 'left',
});

export const acceptTermsBox = style({
	width: '100%',
	height: '110px',
	padding: '15px 12px',
	border: `1px solid ${vars.color.paleGray}`,
	borderRadius: '5px',
});

export const acceptTermsText = style({
	fontSize: '12px',
	color: vars.color.dimGray,
	lineHeight: '1.5',
	textAlign: 'left',
});

export const acceptTermsInnerWrap = style({
	width: '100%',
	height: '100%',
	paddingRight: '20px',
	overflowY: 'auto',
	boxSizing: 'border-box',
	selectors: {
		'&::-webkit-scrollbar': {
			width: '3px',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: vars.color.lighterGray,
			borderRadius: '3px',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			backgroundColor: vars.color.lightGray,
		},
		'&::-webkit-scrollbar-track': {
			backgroundColor: 'transparent',
		},
	},
});

export const hiddenCheckbox = style({
	position: 'absolute',
	opacity: 0,
	cursor: 'pointer',
	height: 0,
	width: 0,
});

export const customCheckboxContainer = style({
	display: 'inline-block',
	verticalAlign: 'middle',
	position: 'relative',
	width: '16px',
	height: '16px',
	borderRadius: '50%',
});

export const customCheckbox = style({
	width: '16px',
	height: '16px',
	backgroundColor: vars.color.lightestGray,
	borderRadius: '50%',
	position: 'relative',
	cursor: 'pointer',
	selectors: {
		'&::after': {
			content: '"✓"',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			color: 'white',
			fontSize: '14px',
			lineHeight: '20px',
			transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
		},
	},
});

export const checkboxLabel = style({
	cursor: 'pointer',
});

export const acceptTermsBoxChecked = style({
	border: `1px solid ${vars.color.skyBlue}`,
});

globalStyle(`${hiddenCheckbox}:checked + div > div`, {
	backgroundColor: vars.color.skyBlue,
});

globalStyle(`${hiddenCheckbox}:checked + div::after`, {
	transform: 'translate(-50%, -50%) scale(1)',
});

export const personalInfoInputBox = style({
	'@media': {
		[responsive.mobile]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			padding: '0 10px',
		},
	},
});
