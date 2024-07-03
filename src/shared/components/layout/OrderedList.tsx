import { forwardRef, Ref } from 'react';
import { OrderListProps } from './types';
import { Flex } from './Flex';

const OrderedList = (props: OrderListProps, ref: Ref<HTMLOListElement>) => {
	const { children, spacing = 3, ...rest } = props;

	return (
		<Flex
			{...rest}
			as="ol"
			ref={ref}
			direction="column"
			style={{ gap: spacing, listStyleType: 'decimal' }}>
			{children}
		</Flex>
	);
};

const _OrderedList = forwardRef(OrderedList);
export { _OrderedList as OrderedList };
