import clsx from 'clsx';
import * as s from './ProductDetailStyle.css';

const ProductSelectBox = () => {
	return (
		<div className={s.selectContainer}>
			<select className={clsx(s.selectBox, s.mediumGrayText)}>
				<option value="ten-thousand">컬쳐랜드 1만원권 (카드할인 1.2% / 휴대폰할인 0%)</option>
			</select>
		</div>
	);
};

export default ProductSelectBox;
