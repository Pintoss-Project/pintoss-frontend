import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import clsx from 'clsx';
import * as s from './ProductDetailStyle.css';

interface Props {
	product: ProductInfo;
	onSelectCategory: (category: PriceCategoryInfo) => void;
}

const ProductSelectBox = ({ product, onSelectCategory }: Props) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = product?.priceCategories?.find(
			(category) => category.id === parseInt(event.target.value),
		);
		if (selectedCategory) {
			onSelectCategory(selectedCategory);
		}
	};

	return (
		<div className={s.selectContainer}>
			<select className={clsx(s.selectBox, s.mediumGrayText)} onChange={handleChange}>
				{product?.priceCategories?.map((category) => (
					<option key={category.id} value={category.id}>
						{product.name} {category.name} (카드할인 {product.cardDiscount}% / 휴대폰할인{' '}
						{product.phoneDiscount}%)
					</option>
				))}
			</select>
		</div>
	);
};

export default ProductSelectBox;
