import { ChangeEvent } from 'react';

export type InputProps = {
	name?: string;
	type?: string;
	step?: string | number;
	checked?: boolean;
	placeholder?: string;
	color?: string;
	variant?: 'outline' | 'filled';
	errorBorderColor?: string;
	focusBorderColor?: string;
	value?: string | number | readonly string[];
	disabled?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export type InputGroupProps = {
	color?: string;
	children: React.ReactNode[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
