import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { TextProps } from './types';
import { clsx } from 'clsx';

const Text = (props: TextProps, ref: Ref<HTMLElement>) => {
	const { as = 'p', color = 'gray', children } = props;

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

const _Text = forwardRef(Text);
export { _Text as Text };
