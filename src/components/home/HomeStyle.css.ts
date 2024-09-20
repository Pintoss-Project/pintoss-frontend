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

export const homePopularSection = style({
	'@media': {
		[responsive.desktop]: {
			marginTop: '80px',
		},
		[responsive.tabletSmall]: {
			marginTop: '0px',
		},
		[responsive.mobile]: {
			marginTop: '10px',
		},
	},
});

export const homeBanner = style([
	f.pRelative,
	f.wFull,
	{
		'height': '300px',
		'maxHeight': '300px',
		'marginBottom': '160px',
		'borderRadius': '0 15px 15px 15px',
		'@media': {
			[responsive.tablet]: {
				height: '280px',
				marginBottom: '90px',
			},
			[responsive.tabletSmall]: {
				height: '200px',
				marginBottom: '0',
			},
			[responsive.mobile]: {
				height: '160px',
				marginBottom: '0',
			},
			'(min-width: 1025px) and (max-width: 1350px)': {
				height: '270px',
				marginBottom: '80px',
			},
			'(min-width: 630px) and (max-width: 800px)': {
				height: '270px',
			},
			'(min-width: 530px) and (max-width: 768px)': {
				marginBottom: '40px',
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
		maxHeight: '150px',
		borderRadius: '0 15px 15px 15px',
	},
]);

export const categoryTitle = style({
	'padding': '0px 10px',
	'fontSize': '30px',
	'fontFamily': 'Pretendard-Regular sans-serif',
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
	'color': vars.color.lightGray,
	'fontFamily': 'Pretendard-Regular sans-serif',
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

export const homeServiceInfoContainer = style([
	f.wFull,
	{
		padding: '16px',
		backgroundColor: vars.color.white,
		borderRadius: '0 10px 10px 10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
]);

export const homeServiceInfoTitleBox = style([
	f.wFull,
	{
		padding: '20px',
	},
]);

export const homeServiceInfoH3Text = style({
	'marginBottom': '12px',
	'fontSize': '20px',
	'@media': {
		[responsive.tablet]: {
			fontSize: '16px',
		},
		[responsive.tabletSmall]: {
			fontSize: '17px',
		},
		[responsive.mobile]: {
			fontSize: '16px',
		},
		'only screen and (min-width: 1025px) and (max-width: 1331px)': {
			fontSize: '16px',
		},
		'only screen and (min-width: 1254px) and (max-width: 1331px)': {
			fontSize: '17px',
		},
	},
});

export const homeServiceInfoText = style({
	'fontSize': '16px',
	'lineHeight': '1.5',
	'@media': {
		[responsive.tablet]: {
			fontSize: '12px',
		},
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
		'only screen and (min-width: 1025px) and (max-width: 1331px)': {
			fontSize: '12px',
		},
		'only screen and (min-width: 1254px) and (max-width: 1331px)': {
			fontSize: '13px',
		},
	},
});

export const serviceText = style({
	'fontSize': '16px',
	'color': vars.color.blue,
	'@media': {
		[responsive.tablet]: {
			fontSize: '14px',
		},
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const homeServiceInfoTitle = style({
	'fontSize': '26px',
	'@media': {
		[responsive.tablet]: {
			fontSize: '24px',
		},
		[responsive.tabletSmall]: {
			fontSize: '24px',
		},
		[responsive.mobile]: {
			fontSize: '20px',
		},
	},
});

export const homeServiceInfoBox = style([
	f.wFull,
	{
		'display': 'grid',
		'gridTemplateColumns': 'repeat(2, 1fr)',
		'gap': '16px',
		'@media': {
			'screen and (min-width: 768px)': {
				gridTemplateColumns: 'repeat(4, 1fr)',
			},
		},
	},
]);

export const homeServiceInfoBoxContent = style([
	f.wFull,
	{
		'color': vars.color.white,
		'textAlign': 'center',
		'padding': '16px',
		'borderRadius': '8px',
		'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
		'@media': {
			[responsive.tablet]: {
				padding: '12px',
			},
			[responsive.tabletSmall]: {
				padding: '10px',
			},
			[responsive.mobile]: {
				padding: '6px',
			},
		},
	},
]);

export const homeServiceInfoIcon = style({
	width: '50%',
	height: '50%',
	maxHeight: '100px',
	color: vars.color.white,
	margin: '8px',
});

export const homeRecruitingBanner = style([
	homeServiceInfoBox,
	{
		paddingTop: '12%',
	},
]);

export const homeRecruitingBannerContent = style([homeServiceInfoBoxContent]);

export const homeAnnouncementsBoard = style({
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
			[responsive.mobile]: {
				height: '200px',
			},
		},
	},
]);

export const homeProductBoxWrap = style({
	'display': 'block',
	'@media': {
		[responsive.mobile]: {
			display: 'none',
		},
	},
});

export const homeProductMobileBoxWrap = style({
	'display': 'none',
	'@media': {
		[responsive.mobile]: {
			display: 'block',
		},
	},
});

export const homeProductMobileBox = style([
	f.pRelative,
	{
		height: '130px',
		backgroundColor: vars.color.white,
		borderRadius: '0 10px 10px 10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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

export const mobileBoxProductName = style({
	marginTop: '30px',
	fontSize: '14px',
	fontWeight: '600',
	textAlign: 'center',
	lineHeight: '1.3',
	wordBreak: 'keep-all',
	whiteSpace: 'normal',
	wordWrap: 'break-word',
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
		'(min-width: 1901px)': {
			gridTemplateColumns: 'repeat(5, 1fr)',
		},
		'(max-width: 1900px)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
		'(max-width: 1640px)': {
			gridTemplateColumns: 'repeat(3, 1fr)',
		},
		'(max-width: 620px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
	},
});

export const mobileBoxResponsiveGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: '5px',
	width: '100%',
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

export const arrowIconRotated = style({
	transform: 'rotate(180deg)',
	transition: 'transform 0.3s ease',
});

export const expandedContent = style({
	padding: '0',
	maxHeight: '0',
	backgroundColor: vars.color.whiteSmoke,
	transition: 'max-height 0.3s ease, padding 0.3s ease',
	overflow: 'hidden',
});

export const expandedContentVisible = style({
	maxHeight: '2000px',
	padding: '50px 45px',
});
