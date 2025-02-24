import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import clsx from 'clsx';
import * as s from './ProductDetailStyle.css';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/controllers/new-api-service';
import { VoucherDetailResponse, VoucherProviderListResponse } from '@/types/api';

interface Props {
	product: VoucherProviderListResponse;
	onSelectCategory: (category: VoucherDetailResponse) => void;
}

const ProductSelectBox = ({ product, onSelectCategory }: Props) => {

	const {data, isLoading} = useQuery({
		queryKey: ['vouchers', product.id],
		queryFn: () => apiClient.getVouchersByProviderId(String(product.id)),
	});

	const sortedPriceCategories = (data?.data || []).sort((a, b) => a.price - b.price);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = sortedPriceCategories.find(
			(category) => category.voucherId === parseInt(event.target.value, 10),
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
					<option key={category.voucherId} value={category.voucherId}>
						{`${product.name} ${category.voucherName} (카드할인 ${product.discount.cardDiscount}% / 휴대폰할인 ${product.discount.phoneDiscount}%)`}
					</option>
				))}
			</select>
		</div>
	);
};

export default ProductSelectBox;
