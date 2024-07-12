interface Props {
	fill?: string;
}

const MenuIcon = ({ fill = '#959595' }: Props) => {
	return (
		<svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M29 12.8L6.44444 12.8L6.44444 16L29 16L29 12.8ZM29 6.4L6.44444 6.4L6.44444 9.6L29 9.6L29 6.4ZM29 3.8147e-06L6.44444 1.84283e-06L6.44444 3.2L29 3.2L29 3.8147e-06ZM3.22222 1.56113e-06L1.39876e-06 1.27944e-06L1.11901e-06 3.2L3.22222 3.2L3.22222 1.56113e-06ZM3.22222 16L3.22222 12.8L2.79753e-07 12.8L0 16L3.22222 16ZM3.22222 6.4L8.39259e-07 6.4L5.59506e-07 9.6L3.22222 9.6L3.22222 6.4Z"
				fill={fill}
			/>
		</svg>
	);
};

export default MenuIcon;