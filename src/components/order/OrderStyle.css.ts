import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	padding: '8px 20px',
	backgroundColor: vars.color.background,
});

export const orderListInfoBox = style({
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '0px 10px 10px 10px',
});

export const loginHistoryInfoBox = style({
	marginRight: '20px',
	border: `1px solid ${vars.color['lighter-gray']}`,
	borderRadius: '0px 10px 10px 10px',
});

export const orderInstructionInfoBox = style({
	padding: '30px',
	backgroundColor: vars.color['white-smoke'],
	borderRadius: '0px 10px 10px 10px',
});

export const menuBarTitle = style({
	height: '50px',
	backgroundColor: vars.color['pale-gray'],
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
	flex: 1,
});

export const flexItem5 = style({
	flex: 2,
});

export const flexItem6 = style({
	flex: 2,
});

export const loginFlexItem1 = style({
	flex: 1,
	color: vars.color['dark-gray'],
	fontSize: '14px',
});

export const loginFlexItem2 = style({
	flex: 1,
	color: vars.color['dark-gray'],
	fontSize: '14px',
});

export const orderListItem = style({
	height: '55px',
	fontSize: '14px',
	borderBottom: `1px solid ${vars.color['lightest-gray']}`,
});

export const loginHistoryItem = style({
	height: '55px',
	fontSize: '14px',
	borderBottom: `1px solid ${vars.color['lightest-gray']}`,
});

export const orderInstructionCircle = style({
	width: '15px',
	height: '15px',
	marginRight: '5px',
	color: vars.color.white,
	fontSize: '10px',
	borderRadius: '50%',
	backgroundColor: vars.color['dark-blue'],
});

export const orderInstructionText = style({
	color: vars.color['dark-gray'],
	fontSize: '14px',
	textAlign: 'left',
});
