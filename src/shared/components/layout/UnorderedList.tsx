import { forwardRef, Ref } from 'react';
import { UnorderedListProps } from './types';
import { Flex } from './Flex';

const UnorderedList = (props: UnorderedListProps, ref: Ref<HTMLOListElement>) => {
	const { listStyleType = 'disc', spacing = 3, children, ...rest } = props;

	return (
		<Flex
			{...rest}
			as="ul"
			ref={ref}
			direction="column"
			style={{ gap: spacing, listStyleType: listStyleType as string }}>
			{children}
		</Flex>
	);
};

const _UnorderedList = forwardRef(UnorderedList);
export { _UnorderedList as UnorderedList };
