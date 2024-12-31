import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import clsx from 'clsx';
import * as s from './ProductDetailStyle.css';

interface Props {
	product: ProductInfo;
	onSelectCategory: (category: PriceCategoryInfo) => void;
}

const ProductSelectBox = ({ product, onSelectCategory }: Props) => {
	const sortedPriceCategories = (product?.priceCategories || []).sort((a, b) => a.price - b.price);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = sortedPriceCategories.find(
			(category) => category.id === parseInt(event.target.value, 10),
		);
		if (selectedCategory) {
			onSelectCategory(selectedCategory);
		}
	};

	return (
		<div className={s.selectContainer}>
			<select
				className={clsx(s.selectBox, s.mediumGrayText)}
				onChange={handleChange}
				defaultValue="">
				<option value="" disabled>
					상품을 선택해주세요.
				</option>
				{sortedPriceCategories.map((category) => (
					<option key={category.id} value={category.id}>
						{`${product.name} ${category.name} (카드할인 ${product.cardDiscount}% / 휴대폰할인 ${product.phoneDiscount}%)`}
					</option>
				))}
			</select>
		</div>
	);
};

export default ProductSelectBox;
