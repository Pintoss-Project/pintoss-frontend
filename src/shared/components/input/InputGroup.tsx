import * as React from 'react';
import { InputGroupProps } from './types';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import { clsx } from 'clsx';

const InputGroup = (props: InputGroupProps, ref: React.Ref<HTMLDivElement>) => {
	const { children, className, color = 'gray', ...rest } = props;

	const childrenWithProps = Children.toArray(children);

	const inputStyle: React.CSSProperties = {};

	childrenWithProps.forEach((child) => {
		if (
			isValidElement(child) &&
			(child.type as React.ComponentType).displayName === 'InputLeftAddon'
		) {
			inputStyle.borderStartStartRadius = 0;
			inputStyle.borderEndStartRadius = 0;
		}
	});

	const inputGroupChildren = childrenWithProps.map((child) => {
		if (isValidElement(child) && child.type) {
			if ((child.type as React.ComponentType).displayName === 'Input') {
				return cloneElement(child, {
					...child.props,
					color,
					style: {
						...child.props.style,
						...inputStyle,
					},
				});
			}

			return cloneElement(child, { ...child.props, color });
		}

		return null;
	});

	return (
		<div {...rest} ref={ref} className={clsx([className])}>
			{inputGroupChildren}
		</div>
	);
};

const _InputGroup = React.forwardRef(InputGroup);
export { _InputGroup as InputGroup };
