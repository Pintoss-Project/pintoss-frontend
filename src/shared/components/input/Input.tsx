'use client';

import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { InputProps } from './types';

import { clsx } from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { colorVariant, errorBorderColorVariant, focusBorderColorVariant } from './style.css';

const Input = (props: InputProps, ref: Ref<HTMLInputElement>) => {
	const {
		name = '',
		type = 'text',
		checked,
		placeholder = '',
		color = 'gray',
		variant = 'outline',
		errorBorderColor = '#E53E3E',
		focusBorderColor = '#3182CE',
		className,
		style,
		onChange,
		onBlur,
		value,
		...rest
	} = props;

	return (
		<input
			name={name}
			type={type}
			checked={checked}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			ref={ref}
			className={clsx([className])}
			style={{
				...assignInlineVars({
					[colorVariant]: color,
					[errorBorderColorVariant]: errorBorderColor,
					[focusBorderColorVariant]: focusBorderColor,
				}),
				color,
				...style,
			}}
		/>
	);
};

const _Input = forwardRef(Input);

_Input.displayName = 'Input';

export { _Input as Input };
