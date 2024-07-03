import { AsElementProps } from '../layout/core/types';

export type InputProps = AsElementProps & {
	type?: string;
	color?: string;
	variant?: 'outline' | 'filled';
	errorBorderColor?: string;
	focusBorderColor?: string;
	value?: string | number | readonly string[];
};

export type InputGroupProps = {
	color?: string;
	children: React.ReactNode[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
