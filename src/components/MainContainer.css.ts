import { responsive, vars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    padding: '0',
    margin: '0',
    display: 'flex',
	flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
	overflow: 'hidden',
	'@media': {
		[responsive.desktop]: {
			maxWidth: 'calc(100vw - 240px - 20px - 15px)',
			padding: '0',
			// backgroundColor: vars.color.periwinkle,
		},
		[responsive.tablet]: {
			padding: '0',
			// backgroundColor: vars.color.blue,
		},
		[responsive.tabletSmall]: {
			padding: '0',
			// backgroundColor: vars.color.green,
		},
		[responsive.mobile]: {
			padding: '0',
			// backgroundColor: vars.color.yellow,
		},
    },
});