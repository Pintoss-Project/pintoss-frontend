export type ButtonProps = {
	color?: string;
	enableColor?: string;
	hoverColor?: string;
	activeColor?: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
