import { f } from '@/shared/styles/functions';
import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	'padding': '8px 20px',
	'backgroundColor': vars.color.background,
	'@media': {
		[responsive.tablet]: {
			padding: '8px 15px',
		},
		[responsive.tabletSmall]: {
			padding: '8px 0',
		},
	},
});

export const cartOrderListInfoBox = style({
	'border': `1px solid ${vars.color.lighterGray}`,
	'borderRadius': '0px 10px 10px 10px',
	'@media': {
		[responsive.mobile]: {
			backgroundColor: vars.color.whiteSmoke,
			border: 'none',
		},
	},
});

export const menuBarTitle = style({
	'display': 'flex',
	'alignItems': 'center',
	'height': '50px',
	'backgroundColor': vars.color.whiteSmoke,
	'@media': {
		[responsive.tabletSmall]: {
			display: 'none',
			fontSize: '14px',
		},
	},
});

export const cartOrderInfoFlexWrap = style({
	'display': 'flex',
	'@media': {
		[responsive.tabletSmall]: {
			flexDirection: 'column',
		},
	},
});

export const cartOrderEtcInfoBox = style({
	'flex': '1',
	'marginRight': '20px',
	'@media': {
		[responsive.tabletSmall]: {
			marginRight: '0',
		},
	},
});

export const cartOrderListItemBox = style({
	'display': 'flex',
	'alignItems': 'center',
	'height': '70px',
	'border': `1px solid ${vars.color.lightestGray}`,
	'@media': {
		[responsive.mobile]: {
			justifyContent: 'space-between',
			height: '115px',
			padding: '10px 4px',
			borderBottom: `1px solid ${vars.color.lighterGray}`,
		},
	},
});

export const cartOrderListItemLeftBox = style({
	'display': 'flex',
	'flex': 7,
	'alignItems': 'center',
	'@media': {
		[responsive.mobile]: {
			flex: 7,
			height: '100%',
			padding: '0 10px',
			flexDirection: 'column',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
		},
	},
});

export const cartOrderListItemLeftInnerBox = style({
	display: 'flex',
	flex: 5,
	alignItems: 'center',
});

export const cartOrderListItemLeftSecondInnerBox = style({
	'display': 'flex',
	'flex': 3,
	'alignItems': 'center',
	'@media': {
		[responsive.mobile]: {
			flexDirection: 'column',
		},
	},
});

export const cartOrderListItemRightBox = style({
	'display': 'flex',
	'flex': 3,
	'alignItems': 'center',
	'@media': {
		[responsive.mobile]: {
			flex: 3,
			height: '100%',
			marginTop: '10px',
			flexDirection: 'column-reverse',
			justifyContent: 'space-between',
		},
	},
});

export const cartOrderInstructionInfoBox = style({
	'padding': '30px',
	'backgroundColor': vars.color.whiteSmoke,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tabletSmall]: {
			padding: '15px',
		},
		[responsive.mobile]: {
			padding: '10px',
		},
	},
});

export const cartOrdererInfoInnerBox = style({
	padding: '15px',
	backgroundColor: vars.color.white,
	borderRadius: '0 10px 10px 10px',
});

export const cartOrdererInfoItem = style({
	padding: '15px',
});

export const cartOrdererInfoText = style({
	'color': vars.color.darkGray,
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '15px',
		},
		[responsive.mobile]: {
			fontSize: '14px',
		},
	},
});

export const cartOrdererInfoDivider = style({
	border: `1px dashed ${vars.color.paleGray}`,
});

export const boxflexItem1 = style({
	flex: 3,
});

export const flexItem1 = style({
	flex: 1,
});

export const flexItem2 = style({
	flex: 2.7,
});

export const flexItem3 = style({
	'flex': 1.3,
	'@media': {
		[responsive.mobile]: {
			flex: 1,
		},
	},
});

export const flexItem4 = style({
	'flex': 2,
	'@media': {
		[responsive.mobile]: {
			flex: 1,
			marginLeft: '10px',
		},
	},
});

export const flexItem5 = style({
	'flex': 2,
	'@media': {
		[responsive.mobile]: {
			flex: 1,
		},
	},
});

export const flexItem6 = style({
	flex: 1,
});

export const logoFlexItem = style({
	flex: 0.7,
});

export const grayText = style({
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
	},
});

export const cartOrderProductName = style({
	'flex': 3,
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
		[responsive.mobile]: {
			marginBottom: '4px',
			fontSize: '14px',
			fontWeight: '600',
			color: vars.color.black,
		},
	},
});

export const cartOrderProductPrice = style({
	'flex': 1.3,
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
		[responsive.mobile]: {
			width: '100%',
			fontWeight: '600',
			textAlign: 'left',
		},
	},
});

export const smallGrayText = style({
	marginLeft: '12px',
	color: vars.color.mediumGray,
	fontSize: '12px',
	textAlign: 'left',
});

export const darkBlueText = style({
	'color': vars.color.darkBlue,
	'fontSize': '14px',
	'fontWeight': '600',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
	},
});

export const quantityLeftButton = style({
	width: '30px',
	height: '30px',
	fontSize: '20px',
	backgroundColor: vars.color.lightestGray,
	border: `1px solid ${vars.color.lighterGray}`,
});

export const quantityText = style({
	'width': '30px',
	'height': '30px',
	'color': vars.color.darkerGray,
	'fontSize': '14px',
	'border': `1px solid ${vars.color.lighterGray}`,
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
	},
});

export const quantityRightButton = style({
	width: '30px',
	height: '30px',
	fontSize: '20px',
	backgroundColor: vars.color.lighterGray,
	border: `1px solid ${vars.color.lighterGray}`,
});

export const cartOrderTotalInfoBox = style({
	'padding': '19px 20px 24px 46px',
	'@media': {
		[responsive.tabletSmall]: {
			padding: '10px',
		},
	},
});

export const orderTotalText = style({
	'fontSize': '20px',
	'fontWeight': '600',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '16px',
		},
	},
});

export const orderTotalPrice = style({
	'marginLeft': '10px',
	'color': vars.color.darkBlue,
	'fontSize': '20px',
	'fontWeight': '600',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '16px',
		},
	},
});

export const cartItemRemoveButton = style([
	{
		paddingBottom: '2px',
		fontSize: '12px',
		backgroundColor: vars.color.lighterGray,
		borderRadius: '50%',
	},
]);

export const cartRemoveButton = style({
	padding: '12px 20px',
	backgroundColor: vars.color.silver,
	borderRadius: '5px',
});

export const cartPaymentInfoItemBox = style({
	'padding': '30px 55px 52px 55px',
	'border': `1px solid ${vars.color.lightestGray}`,
	'@media': {
		[responsive.tabletSmall]: {
			padding: '30px 4px 30px 10px',
		},
	},
});

export const paymentMethodBox = style([
	f.wFull,
	{
		padding: '15px 10px',
		marginRight: '6px',
		border: `1px solid ${vars.color.paleGray}`,
		borderRadius: '0px 10px 10px 10px',
		cursor: 'pointer',
	},
]);

export const paymentMethodBoxSelected = style([
	paymentMethodBox,
	{
		border: `1px solid ${vars.color.skyBlue}`,
	},
]);

export const circleCheckIcon = style({
	width: '21px',
	height: '21px',
	color: vars.color.white,
	backgroundColor: vars.color.lightestGray,
	borderRadius: '50%',
});

export const circleCheckIconSelected = style([
	circleCheckIcon,
	{
		backgroundColor: vars.color.skyBlue,
		color: vars.color.white,
	},
]);

export const confirmAndPayTheAmountBox = style({
	padding: '25px 20px',
	backgroundColor: '#F9F9F9',
});

export const totalPayAmountBox = style({
	padding: '24px 20px',
	backgroundColor: vars.color.dimGray,
	borderRadius: '5px',
});

export const whiteText = style({
	'fontSize': '20px',
	'color': vars.color.white,
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '18px',
		},
	},
});

export const payInfoTitle = style({
	'fontWeight': '500',
	'textAlign': 'left',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
	},
});

export const responsiveLargeText = style({
	'fontSize': '20px',
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '18px',
		},
	},
});

export const responsiveText = style({
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const responsiveSmallText = style({
	'fontSize': '12px',
	'@media': {
		[responsive.mobile]: {
			fontSize: '10px',
		},
	},
});
