import { f } from '@/shared/styles/functions';
import { responsive, vars } from '@/shared/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export const headerColor = createVar();

export const homeSection = style({
	'padding': '0px 60px 172px 45px',
	'marginTop': '108px',
	'@media': {
		[responsive.tablet]: {
			padding: '40px 30px',
			marginTop: '88px',
		},
		[responsive.tabletSmall]: {
			padding: '40px 20px',
			marginTop: '68px',
		},
		[responsive.mobile]: {
			padding: '40px 10px',
			marginTop: '48px',
		},
	},
});

export const homeBanner = style([
	f.pRelative,
	f.wFull,
	{
		'height': '0',
		'paddingTop': '33.33%',
		'backgroundColor': vars.color.lightBlue,
		'borderRadius': '0 10px 10px 10px',
		'@media': {
			[responsive.tablet]: {
				paddingTop: '40%',
			},
			[responsive.tabletSmall]: {
				paddingTop: '44%',
			},
			[responsive.mobile]: {
				paddingTop: '50%',
			},
		},
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
	'padding': '0px 10px',
	'fontSize': '30px',
	'fontWeight': '400',
	'@media': {
		[responsive.tablet]: {
			fontSize: '24px',
		},
		[responsive.tabletSmall]: {
			fontSize: '22px',
		},
		[responsive.mobile]: {
			fontSize: '20px',
		},
	},
});

export const selected = style({
	color: vars.color.black,
	fontWeight: '500',
});

export const filterMenu = style({
	'padding': '0px 10px',
	'marginRight': '20px',
	'color': vars.color.mediumGray,
	'fontSize': '25px',
	'cursor': 'pointer',
	'selectors': {
		'&:hover': {
			color: vars.color.black,
		},
		'&.selected': {
			color: vars.color.black,
			fontWeight: '500',
		},
	},
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '18px',
			padding: '0',
			marginRight: '18px',
		},
		[responsive.mobile]: {
			fontSize: '15px',
			padding: '0',
			marginRight: '10px',
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
	'height': '690px',
	'padding': '50px',
	'backgroundColor': vars.color.white,
	'borderRadius': '0 10px 10px 10px',
	'@media': {
		[responsive.tablet]: {
			padding: '40px 30px',
		},
		[responsive.tabletSmall]: {
			padding: '30px 15px',
		},
		[responsive.mobile]: {
			padding: '20px 10px',
		},
	},
});

export const flexItem1 = style({
	'flex': 1,
	'@media': {
		[responsive.tabletSmall]: {
			display: 'none',
		},
	},
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
		'textAlign': 'left',
		'@media': {
			[responsive.tabletSmall]: {
				marginLeft: '10px',
				fontSize: '14px',
			},
			[responsive.mobile]: {
				fontSize: '12px',
			},
		},
	},
]);

export const announceDate = style([
	flexItem3,
	{
		'@media': {
			[responsive.tabletSmall]: {
				fontSize: '14px',
			},
			[responsive.mobile]: {
				fontSize: '12px',
			},
		},
	},
]);

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
		'height': '300px',
		'backgroundColor': vars.color.white,
		'borderRadius': '0 20px 20px 20px',
		'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
		'@media': {
			[responsive.tablet]: {
				height: '260px',
			},
			[responsive.tablet]: {
				height: '230px',
			},
			[responsive.tablet]: {
				height: '200px',
			},
		},
	},
]);

export const homeProductBoxTop = style({
	height: '25%',
	backgroundColor: headerColor,
	opacity: 0.1,
	borderRadius: '0 20px 0 0',
});

export const purchaseButtonWrap = style({
	'height': '30%',
	'padding': '15px 16px',
	'@media': {
		[responsive.tablet]: {
			padding: '15px 12px',
		},
		[responsive.tabletSmall]: {
			padding: '15px 10px',
		},
		[responsive.mobile]: {
			padding: '15px 6px',
		},
	},
});

export const purchaseButtonText = style({
	'fontSize': '18px',
	'@media': {
		[responsive.tablet]: {
			fontSize: '16px',
		},
		[responsive.tablet]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const rateBox = style({
	width: '50%',
	height: '100%',
	border: `1px solid ${vars.color.lightestGray}`,
	borderRadius: '8px',
});

export const rateGrayText = style({
	'marginRight': '12px',
	'color': vars.color.darkGray,
	'fontSize': '18px',
	'@media': {
		[responsive.tablet]: {
			fontSize: '13px',
		},
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
		[responsive.mobile]: {
			fontSize: '10px',
		},
	},
});

export const rateRedText = style({
	'color': vars.color.softRed,
	'fontSize': '18px',
	'@media': {
		[responsive.tablet]: {
			fontSize: '13px',
		},
		[responsive.tabletSmall]: {
			fontSize: '12px',
		},
		[responsive.mobile]: {
			fontSize: '10px',
		},
	},
});

export const productName = style({
	'fontSize': '24px',
	'fontWeight': '600',
	'@media': {
		[responsive.tablet]: {
			fontSize: '20px',
		},
		[responsive.tabletSmall]: {
			fontSize: '16px',
		},
		[responsive.mobile]: {
			fontSize: '14px',
		},
	},
});

export const productIconBox = style([
	f.pAbsolute,
	{
		'left': '50%',
		'top': '5%',
		'width': '100px',
		'height': '100px',
		'transform': 'translateX(-50%)',
		'borderRadius': '50%',
		'@media': {
			[responsive.tablet]: {
				top: '20%',
				width: '73px',
				height: '73px',
			},
			[responsive.tabletSmall]: {
				top: '10%',
				width: '62px',
				height: '62px',
			},
			[responsive.tablet]: {
				width: '60px',
				height: '60px',
			},
		},
	},
]);

export const productIconImage = style({
	width: '100%',
	height: '100%',
});

export const responsiveGrid = style({
	'display': 'grid',
	'gridTemplateColumns': 'repeat(3, 1fr)',
	'gap': '16px',
	'width': '100%',
	'@media': {
		'(min-width: 1450px)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
		[responsive.tablet]: {
			gridTemplateColumns: 'repeat(3, 1fr)',
		},
		'(max-width: 620px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
	},
});

export const homeProductTextBox = style({
	'height': '45%',
	'margin': '0px 16px',
	'@media': {
		[responsive.tablet]: {
			margin: '0px 10px',
		},
		[responsive.tabletSmall]: {
			margin: '0px 6px',
		},
		[responsive.mobile]: {
			margin: '0px 4px',
		},
	},
});

export const rateBoxMarginBox = style({
	'margin': '0px 3px',
	'@media': {
		[responsive.tablet]: {
			margin: '0px 2px',
		},
		[responsive.mobile]: {
			margin: '0px 1px',
		},
	},
});
