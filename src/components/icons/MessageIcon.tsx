interface Props {
	fill?: string;
}

const MessageIcon = ({ fill = '#959595' }: Props) => {
	return (
		<svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M26.1 0H2.9C1.305 0 0.0145 1.29375 0.0145 2.875L0 20.125C0 21.7062 1.305 23 2.9 23H26.1C27.695 23 29 21.7062 29 20.125V2.875C29 1.29375 27.695 0 26.1 0ZM26.1 20.125H2.9V5.75L14.5 12.9375L26.1 5.75V20.125ZM14.5 10.0625L2.9 2.875H26.1L14.5 10.0625Z"
				fill={fill}
			/>
		</svg>
	);
};

export default MessageIcon;