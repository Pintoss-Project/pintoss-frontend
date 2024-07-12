import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export const headerColor = createVar();

export const homeSection = style({
	padding: '0px 60px 172px 45px',
	marginTop: '108px',
});

export const homeBanner = style([
	f.pRelative,
	f.wFull,
	{
		height: '0',
		paddingTop: '33.33%',
		backgroundColor: vars.color.lightBlue,
		borderRadius: '0 10px 10px 10px',
	},
]);

export const homeBannerContent = style([
	f.pAbsolute,
	f.wFull,
	f.hFull,
	{
		top: 0,
		left: 0,
	},
]);

export const categoryTitle = style({
	padding: '0px 10px',
	fontSize: '30px',
	fontWeight: '400',
});

export const selected = style({
	color: vars.color.black,
	fontWeight: '500',
});

export const filterMenu = style({
	padding: '0px 10px',
	marginRight: '20px',
	color: vars.color.mediumGray,
	fontSize: '25px',
	cursor: 'pointer',
	selectors: {
		'&:hover': {
			color: vars.color.black,
		},
		'&.selected': {
			color: vars.color.black,
			fontWeight: '500',
		},
	},
});

export const homeServiceInfoBox = style([
	homeBanner,
	{
		backgroundColor: vars.color.white,
	},
]);

export const homeServiceInfoBoxContent = style([homeBannerContent]);

export const homeRecruitingBanner = style([
	homeServiceInfoBox,
	{
		paddingTop: '12%',
	},
]);

export const homeRecruitingBannerContent = style([homeServiceInfoBoxContent]);

export const homeAnnouncementsBoard = style({
	height: '690px',
	padding: '50px',
	backgroundColor: vars.color.white,
	borderRadius: '0 10px 10px 10px',
});

export const flexItem1 = style({
	flex: 1,
});

export const flexItem2 = style({
	flex: 6,
});

export const flexItem3 = style({
	flex: 2,
});

export const flexItem4 = style({
	flex: 1,
});

export const announceMenuBox = style({
	height: '50px',
	backgroundColor: vars.color.paleGray,
});

export const announceContent = style({
	height: '70px',
	backgroundColor: vars.color.white,
	borderBottom: `1px solid ${vars.color.lightestGray}`,
});

export const announceTag = style([
	{
		width: '40px',
		height: '20px',
		color: vars.color.white,
		fontSize: '12px',
		backgroundColor: vars.color.skyBlue,
		borderRadius: '5px',
	},
]);

export const announceContentText = style([
	flexItem2,
	{
		textAlign: 'left',
	},
]);

export const announceDate = style([flexItem3]);

export const announceArrowIcon = style([
	flexItem4,
	{
		cursor: 'pointer',
	},
]);

export const moreButton = style({
	width: '96px',
	height: '35px',
	backgroundColor: vars.color.white,
	border: `1px solid ${vars.color.silver}`,
	borderRadius: '5px',
});

export const homeProductBox = style([
	f.pRelative,
	{
		width: '300px',
		height: '300px',
		backgroundColor: vars.color.white,
		borderRadius: '0 20px 20px 20px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
]);

export const homeProductBoxTop = style({
	height: '25%',
	backgroundColor: headerColor,
	opacity: 0.1,
	borderRadius: '0 20px 0 0',
});

export const purchaseButton = style({
	backgroundColor: vars.color.lightBlue,
});

export const rateBox = style({
	width: '50%',
	height: '100%',
	border: `1px solid ${vars.color.lightestGray}`,
	borderRadius: '8px',
});

export const rateGrayText = style({
	marginRight: '12px',
	color: vars.color.darkGray,
	fontSize: '18px',
});

export const rateRedText = style({
	color: vars.color.softRed,
	fontSize: '18px',
});

export const productName = style({
	fontSize: '24px',
	fontWeight: '600',
});

export const productIconBox = style([
	f.pAbsolute,
	{
		left: '50%',
		top: '5%',
		transform: 'translateX(-50%)',
		borderRadius: '50%',
	},
]);

export const responsiveGrid = style({
	'display': 'grid',
	'gridTemplateColumns': 'repeat(3, 1fr)',
	'gap': '16px',
	'width': '100%',
	'@media': {
		'(min-width: 1450px)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
	},
});
