import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const productDetailSection = style({
	'margin': '108px 2% 100px 0px',
	'padding': '65px 60px 70px 40px',
	'minHeight': '1400px',
	'backgroundColor': vars.color.white,
	'@media': {
		[responsive.tabletSmall]: {
			padding: '60px 15px',
		},
		[responsive.mobile]: {
			padding: '60px 10px',
		},
	},
});

export const productDetailFlexBox = style({
	'display': 'flex',
	'justifyContent': 'space-between',
	'@media': {
		[responsive.tabletSmall]: {
			display: 'flex',
			flexDirection: 'column',
		},
	},
});

export const productDetailLeftBox = style({
	'width': '58%',
	'@media': {
		[responsive.tabletSmall]: {
			width: '100%',
		},
	},
});

export const productDetailRightBox = style({
	'width': '42%',
	'@media': {
		[responsive.tabletSmall]: {
			width: '100%',
		},
	},
});

export const productDetailHeader = style({
	'fontSize': '35px',
	'fontWeight': '500',
	'textAlign': 'center',
	'@media': {
		[responsive.tablet]: {
			fontSize: '24px',
		},
	},
});

export const productDetailLogoImageBox = style({
	'padding': '7% 12%',
	'backgroundColor': 'rgba(255, 99, 71, 0.1)',
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tablet]: {
			height: '300px',
		},
		[responsive.mobile]: {
			height: '235px',
		},
	},
});

export const productDetailImageInnerBox = style({
	height: '100%',
	backgroundColor: vars.color.white,
	borderRadius: '0 10px 10px 10px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const productDetailLogoImage = style({});

export const noticeTopBox = style({
	'padding': '4.5% 4%',
	'backgroundColor': vars.color.whiteSmoke,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tabletSmall]: {
			marginBottom: '30px',
		},
	},
});

export const noticeBox = style({
	'padding': '4.5% 4%',
	'backgroundColor': vars.color.whiteSmoke,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tabletSmall]: {
			marginBottom: '30px',
		},
		[responsive.mobile]: {
			display: 'none',
		},
	},
});

export const productInfoBox = style([noticeBox, {}]);

export const productInstructionCircle = style({
	width: '15px',
	height: '15px',
	marginRight: '5px',
	color: vars.color.white,
	fontSize: '10px',
	borderRadius: '50%',
	backgroundColor: vars.color.softRed,
});

export const productInstructionText = style({
	color: vars.color.darkGray,
	fontSize: '14px',
	textAlign: 'left',
});

export const darkGrayText = style({
	color: vars.color.darkGray,
	fontSize: '14px',
});

export const darkerGrayText = style({
	marginRight: '20px',
	color: vars.color.darkerGray,
	fontSize: '14px',
	fontWeight: '600',
});

export const productInfoTabMenuBox = style({
	width: '50%',
	height: '47px',
	textAlign: 'center',
	cursor: 'pointer',
});

export const leftTabMenuBox = style([
	productInfoTabMenuBox,
	{
		borderRadius: '18px 0 0 0',
	},
]);

export const rightTabMenuBox = style([
	productInfoTabMenuBox,
	{
		borderRadius: '0 18px 0 0',
	},
]);

export const selectedTab = style({
	color: vars.color.white,
	backgroundColor: vars.color.darkGray,
});

export const unselectedTab = style({
	color: vars.color.mediumGray,
	backgroundColor: vars.color.lightestGray,
});

export const productInfoListBox = style({
	padding: '30px',
	minHeight: '400px',
	backgroundColor: vars.color.white,
	borderRadius: '0 0 18px 18px',
});

export const productDetailSelectAndPayBox = style({
	'padding': '0 0 0 7%',
	'@media': {
		[responsive.tabletSmall]: {
			padding: '0 10px',
		},
	},
});

export const totalPayInfoBox = style({
	'padding': '24px 20px',
	'backgroundColor': vars.color.dimGray,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tablet]: {
			padding: '20px',
			height: '60px',
		},
	},
});

export const whiteBoldText = style({
	color: vars.color.white,
	fontSize: '20px',
});

export const mediumGrayText = style({
	color: vars.color.mediumGray,
	fontSize: '14px',
});

export const selectContainer = style({
	width: '100%',
	padding: '15px',
	border: `1px solid ${vars.color.paleGray}`,
});

export const selectBox = style({
	width: '98%',
	border: 'none',
	outline: 'none',
});

export const quantityLeftButton = style({
	width: '30px',
	height: '30px',
	fontSize: '20px',
	backgroundColor: vars.color.lightestGray,
	border: `1px solid ${vars.color.lighterGray}`,
});

export const quantityText = style({
	width: '30px',
	height: '30px',
	color: vars.color.darkerGray,
	fontSize: '14px',
	border: `1px solid ${vars.color.lighterGray}`,
});

export const quantityRightButton = style({
	width: '30px',
	height: '30px',
	fontSize: '20px',
	backgroundColor: vars.color.lighterGray,
	border: `1px solid ${vars.color.lighterGray}`,
});
