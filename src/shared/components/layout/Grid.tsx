import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { GridProps } from './types';
import { clsx } from 'clsx';

const Grid = (props: GridProps, ref: Ref<HTMLElement>) => {
	const {
		as = 'div',
		color,
		children,
		autoColumns,
		autoFlow,
		autoRows,
		columnGap,
		column,
		gap,
		row,
		rowGap,
		templateColumns,
		templateRows,
		templateAreas,
	} = props;

	return React.createElement(
		as,
		{
			...props,
			ref,
			className: clsx([props.className]),
			style: {
				display: 'grid',
				gridAutoColumns: autoColumns,
				gridAutoFlow: autoFlow,
				gridAutoRows: autoRows,
				gridColumnGap: columnGap,
				gridGap: gap,
				gridRowGap: rowGap,
				gridTemplateColumns: templateColumns,
				gridTemplateRows: templateRows,
				gridTemplateAreas: templateAreas,
				gridColumn: column,
				gridRow: row,
				color: color,
				...props.style,
			},
		},
		children,
	);
};

const _Grid = forwardRef(Grid);
export { _Grid as Grid };
