import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	padding: '8px 20px',
	backgroundColor: vars.color.background,
});

export const cartOrderListInfoBox = style({
	border: `1px solid ${vars.color.lighterGray}`,
	borderRadius: '0px 10px 10px 10px',
});

export const menuBarTitle = style({
	height: '50px',
	backgroundColor: vars.color.whiteSmoke,
});

export const cartOrderListItemBox = style({
	height: '70px',
	border: `1px solid ${vars.color.lightestGray}`,
});

export const cartOrderInstructionInfoBox = style({
	padding: '30px',
	backgroundColor: vars.color.whiteSmoke,
	borderRadius: '0 10px 10px 10px',
});

export const cartOrdererInfoInnerBox = style({
	padding: '15px',
	backgroundColor: vars.color.white,
	borderRadius: '0 10px 10px 10px',
});

export const cartOrdererInfoItem = style({
	padding: '15px',
});

export const cartOrdererInfoDivider = style({
	border: `1px dashed ${vars.color.paleGray}`,
});

export const flexItem1 = style({
	flex: 1,
});

export const flexItem2 = style({
	flex: 2.7,
});

export const flexItem3 = style({
	flex: 1.3,
});

export const flexItem4 = style({
	flex: 2,
});

export const flexItem5 = style({
	flex: 2,
});

export const flexItem6 = style({
	flex: 1,
});

export const grayText = style({
	color: vars.color.darkGray,
	fontSize: '14px',
});

export const smallGrayText = style({
	marginLeft: '12px',
	color: vars.color.mediumGray,
	fontSize: '12px',
	textAlign: 'left',
});

export const darkBlueText = style({
	color: vars.color.darkBlue,
	fontSize: '14px',
	fontWeight: '600',
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

export const cartOrderTotalInfoBox = style({
	padding: '19px 20px 24px 46px',
});

export const orderTotalPrice = style({
	marginLeft: '10px',
	color: vars.color.darkBlue,
	fontSize: '20px',
	fontWeight: '600',
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
	padding: '30px 55px 52px 55px',
	border: `1px solid ${vars.color.lightestGray}`,
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
	fontSize: '20px',
	color: vars.color.white,
});
