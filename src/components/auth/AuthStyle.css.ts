import { vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	padding: '8px 60px',
	backgroundColor: vars.color.background,
});

export const sectionStyle = style({
	width: '100%',
	height: '100%',
	// padding: '60px 20px 100px 20px',
	marginTop: '100px',
	backgroundColor: vars.color.white,
	borderRadius: '0px 8px 8px 8px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const innerWrap = style({
	width: '428px',
});

export const mainWrap = style({
	width: '100%',
});

export const footerWrap = style({
	width: '100%',
	marginTop: 'auto',
});

export const authHeader = style({
	fontSize: '30px',
	fontWeight: '600',
});
