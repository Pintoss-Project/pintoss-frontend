import clsx from 'clsx';
import * as s from './ProductDetailStyle.css';
import { ProductInfo } from '@/models/product';

interface Props {
	product: ProductInfo;
}

const ProductSelectBox = ({ product }: Props) => {
	return (
		<div className={s.selectContainer}>
			<select className={clsx(s.selectBox, s.mediumGrayText)}>
				{product?.priceCategories?.map((category) => (
					<option value={category.price}>
						{product.name} {category.name} (카드할인 {product.cardDiscount}% / 휴대폰할인{' '}
						{product.phoneDiscount}%)
					</option>
				))}
			</select>
		</div>
	);
};

export default ProductSelectBox;
