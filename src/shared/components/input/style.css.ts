import { vars } from '@/shared/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export const errorBorderColorVariant = createVar();
export const focusBorderColorVariant = createVar();
export const colorVariant = createVar();

export const loginInputStyle = style({
	width: '100%',
	height: '50px',
	padding: '18px',
	border: `1px solid ${vars.color.paleGray}`,
	borderRadius: '5px',
});
