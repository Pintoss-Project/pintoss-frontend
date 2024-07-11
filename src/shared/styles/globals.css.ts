import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*', {
	boxSizing: 'border-box',
	padding: 0,
	margin: 0,
});

globalStyle('html, body', {
	maxWidth: '100vw',
	minHeight: '100vh',
	backgroundColor: vars.color.background,

	fontFamily: `
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
  `,
});
