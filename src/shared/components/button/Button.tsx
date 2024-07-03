import { Ref, forwardRef } from 'react';
import { ButtonProps } from './types';
import { clsx } from 'clsx';
import { activeColorVariant, enableColorVariant, hoverColorVariant } from './style.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

const Button = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
	const {
		color = 'gray',
		children,
		className,
		style,
		enableColor,
		hoverColor,
		activeColor,
	} = props;

	return (
		<button
			ref={ref}
			className={clsx([className])}
			style={{
				...assignInlineVars({
					[enableColorVariant]: enableColor,
					[hoverColorVariant]: hoverColor,
					[activeColorVariant]: activeColor,
				}),
				color,
				...style,
			}}>
			<span>{children}</span>
		</button>
	);
};

const _Button = forwardRef(Button);
export { _Button as Button };
