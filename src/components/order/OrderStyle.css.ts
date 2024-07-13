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

export const orderListInfoBox = style({
	border: `1px solid ${vars.color.lighterGray}`,
	borderRadius: '0px 10px 10px 10px',
});

export const loginHistoryInfoBox = style({
	'marginRight': '20px',
	'border': `1px solid ${vars.color.lighterGray}`,
	'borderRadius': '0px 10px 10px 10px',
	'@media': {
		[responsive.tabletSmall]: {
			margin: '0 0 30px 0',
			order: 2,
		},
	},
});

export const orderInstructionInfoBox = style({
	'padding': '30px',
	'backgroundColor': vars.color.whiteSmoke,
	'borderRadius': '0px 10px 10px 10px',
	'@media': {
		[responsive.tabletSmall]: {
			margin: '0 0 30px 0',
			order: 1,
		},
	},
});

export const menuBarTitle = style({
	'height': '50px',
	'backgroundColor': vars.color.paleGray,
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const flexItem1 = style({
	flex: 3,
});

export const flexItem2 = style({
	flex: 1,
});

export const flexItem3 = style({
	flex: 1,
});

export const flexItem4 = style({
	'flex': 1,
	'@media': {
		[responsive.tabletSmall]: {
			display: 'none',
		},
	},
});

export const flexItem5 = style({
	'flex': 2,
	'@media': {
		[responsive.tabletSmall]: {
			display: 'none',
		},
	},
});

export const flexItem6 = style({
	flex: 2,
});

export const loginFlexItem1 = style({
	'flex': 1,
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'@media': {
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const loginFlexItem2 = style({
	'flex': 1,
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'@media': {
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const orderListItem = style({
	'height': '55px',
	'fontSize': '14px',
	'borderBottom': `1px solid ${vars.color.lightestGray}`,
	'@media': {
		[responsive.tabletSmall]: {
			fontSize: '14px',
		},
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const loginHistoryItem = style({
	height: '55px',
	fontSize: '14px',
	borderBottom: `1px solid ${vars.color.lightestGray}`,
});

export const orderInstructionCircle = style({
	width: '15px',
	height: '15px',
	marginRight: '5px',
	color: vars.color.white,
	fontSize: '10px',
	borderRadius: '50%',
	backgroundColor: vars.color.darkBlue,
});

export const orderInstructionText = style({
	'color': vars.color.darkGray,
	'fontSize': '14px',
	'textAlign': 'left',
	'@media': {
		[responsive.mobile]: {
			fontSize: '12px',
		},
	},
});

export const orderInstructionFlexBox = style({
	'@media': {
		[responsive.tabletSmall]: {
			display: 'flex',
			flexDirection: 'column-reverse',
		},
	},
});
