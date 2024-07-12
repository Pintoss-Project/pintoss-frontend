interface Props {
	className?: string;
}

const GradientFiMenu = ({ className }: Props) => (
	<svg
		width={40}
		height={40}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}>
		<defs>
			<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: '#00499E', stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: '#54C3F6', stopOpacity: 1 }} />
			</linearGradient>
		</defs>
		<path
			d="M3 12H21M3 6H21M3 18H21"
			stroke="url(#grad1)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default GradientFiMenu;
