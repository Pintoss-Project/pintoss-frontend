import { f } from '@/shared/styles/functions';
import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const customerSection = style({
	margin: '108px 2% 100px 0px',
	minHeight: '1400px',
	backgroundColor: vars.color.white,
});

export const customerHeader = style({
	padding: '60px 0 0 50px',
	fontSize: '35px',
	fontWeight: '500',
	textAlign: 'left',
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
	padding: '50px 45px',
	minHeight: '700px',
});
