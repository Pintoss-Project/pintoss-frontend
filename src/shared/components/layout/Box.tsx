import * as React from 'react';
import { BoxProps } from './types';
import { clsx } from 'clsx';
import { forwardRef, Ref } from 'react';

const Box = (props: BoxProps, ref: Ref<HTMLElement>) => {
	const { as = 'div', color, children } = props;

	return React.createElement(
		as,
		{
			...props,
			ref,
			className: clsx([props.className]),
			style: {
				color: color,
				...props.style,
			},
		},
		children,
	);
};

const _Box = forwardRef(Box);
export { _Box as Box };
