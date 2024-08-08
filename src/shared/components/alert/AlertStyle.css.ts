import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export const alertWidth = createVar();
export const alertHeight = createVar();

export const alertWrap = style([
	f.pAbsolute,
	{
		top: '50%',
		left: '50%',
		width: alertWidth,
		height: alertHeight,
		maxWidth: '600px',
		minWidth: '250px',
		minHeight: '200px',
		padding: '10px 12px',
		backgroundColor: 'white',
		borderRadius: '12px',
		transform: 'translate(-50%, -50%)',
		overflow: 'hidden',
		zIndex: '30',
	},
]);

export const alertFlexWrap = style({
	height: '100%',
	textAlign: 'center',
});

export const alertSubFlexWrap = style({
	width: '100%',
	padding: '0 5%',
	minHeight: '60px',
});

export const alertSubSecondFlexWrap = style({
	width: '100%',
	height: '55px',
});

export const alertTitle = style([
	f.wFull,
	{
		padding: '0 5%',
		fontSize: '18px',
		fontWeight: 'bold',
	},
]);

export const AlertMainTextWrap = style({
	width: '100%',
	margin: '10px 4px',
	padding: '16px 0',
});

export const AlertMainText = style({
	padding: '4px 8px',
	lineHeight: '1.3',
	textAlign: 'center',
});

export const AlertBlueButtonStyle = style({
	width: '33%',
	height: '50px',
	fontSize: '18px',
	backgroundColor: vars.color.lightBlue,
	borderRadius: '10px',
});

export const AlertSilverButtonStyle = style({
	width: '33%',
	height: '50px',
	fontSize: '18px',
	backgroundColor: vars.color.silver,
	borderRadius: '10px',
});
