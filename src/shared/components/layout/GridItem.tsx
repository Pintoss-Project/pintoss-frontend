import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { GridItemProps } from './types';
import { clsx } from 'clsx';

const GridItem = (props: GridItemProps, ref: Ref<HTMLElement>) => {
	const {
		as = 'div',
		color,
		children,
		area,
		colEnd,
		colStart,
		colSpan,
		rowEnd,
		rowStart,
		rowSpan,
	} = props;

	return React.createElement(
		as,
		{
			...props,
			ref,
			className: clsx([props.className]),
			style: {
				gridArea: area,
				gridColumnEnd: colEnd,
				gridColumnStart: colStart,
				gridColumn: colSpan,
				gridRowEnd: rowEnd,
				gridRowStart: rowStart,
				gridRow: rowSpan,
				color: color,
				...props.style,
			},
		},
		children,
	);
};

const _GridItem = forwardRef(GridItem);
export { _GridItem as GridItem };
