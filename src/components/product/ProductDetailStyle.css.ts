import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const productDetailSection = style({
	margin: '108px 2% 100px 0px',
	padding: '65px 60px 70px 40px',
	minHeight: '1400px',
	backgroundColor: vars.color.white,
});

export const productDetailHeader = style({
	fontSize: '35px',
	fontWeight: '500',
	textAlign: 'center',
});

export const productDetailLogoImageBox = style({
	padding: '7% 12%',
	backgroundColor: 'rgba(255, 99, 71, 0.1)',
	borderRadius: '0 10px 10px 10px',
});

export const productDetailImageInnerBox = style({
	backgroundColor: vars.color.white,
	borderRadius: '0 10px 10px 10px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const productDetailLogoImage = style({
	width: '35%',
	height: '40%',
});

export const noticeBox = style({
	padding: '4.5% 4%',
	backgroundColor: vars.color.whiteSmoke,
	borderRadius: '0 10px 10px 10px',
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
});

export const leftTabMenuBox = style([
	productInfoTabMenuBox,
	{
		color: vars.color.white,
		backgroundColor: vars.color.darkGray,
		borderRadius: '18px 0 0 0',
	},
]);

export const rightTabMenuBox = style([
	productInfoTabMenuBox,
	{
		color: vars.color.mediumGray,
		backgroundColor: vars.color.lightestGray,
		borderRadius: '0 18px  0 0',
	},
]);

export const productInfoListBox = style({
	minHeight: '400px',
	backgroundColor: vars.color.white,
	borderRadius: '0 0 18px 18px',
});

export const productDetailSelectAndPayBox = style({
	padding: '0 0 0 7%',
});

export const totalPayInfoBox = style({
	padding: '24px 20px',
	backgroundColor: vars.color.dimGray,
	borderRadius: '0 10px 10px 10px',
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
