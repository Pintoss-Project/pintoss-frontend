interface Props {
	fill?: string;
}

const ManageProductIcon = ({ fill = '#A0A0A0' }: Props) => {
	return (
		<svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_1_4159)">
				<path
					d="M30.1481 0H6.875C5.29375 0 4.01437 1.29375 4.01437 2.875V8.625C5.59563 8.625 6.875 9.91875 6.875 11.5C6.875 13.0813 5.59563 14.375 4 14.375V20.125C4 21.7062 5.29375 23 6.875 23H29.875C31.4562 23 32.75 21.7062 32.75 20.125V2.875C32.75 1.29375 31.5856 0 30.1481 0ZM29.875 20.125H6.875V16.4737C8.58563 15.4819 9.75 13.6131 9.75 11.5C9.75 9.3725 8.6 7.51813 6.88938 6.52625L6.875 2.875H29.875V20.125Z"
					fill={fill}
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1_4159"
					x="0"
					y="0"
					width="36.75"
					height="31"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4159" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1_4159"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default ManageProductIcon;