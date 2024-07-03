import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { FlexProps } from './types';
import { clsx } from 'clsx';

const Flex = (props: FlexProps, ref: Ref<HTMLElement>) => {
	const {
		as = 'div',
		color,
		align,
		basis,
		direction,
		grow,
		justify,
		shrink,
		wrap,
		gap,
		children,
	} = props;

	return React.createElement(
		as,
		{
			...props,
			ref,
			className: clsx([props.className]),
			style: {
				display: 'flex',
				alignItems: align,
				justifyContent: justify,
				flexDirection: direction,
				flexWrap: wrap,
				flexGrow: grow,
				flexShrink: shrink,
				flexBasis: basis,
				gap,
				color,
				...props.style,
			},
		},
		children,
	);
};

const _Flex = forwardRef(Flex);
export { _Flex as Flex };
