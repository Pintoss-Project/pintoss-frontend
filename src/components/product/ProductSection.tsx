'use client';

import { fetchProductInfo } from '@/app/api/product/fetchProductInfo';
import { ProductInfo } from '@/models/product';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import ProductDetailMain from './ProductDetailMain';
import * as s from './ProductDetailStyle.css';

interface Props {
	id: number;
}

const ProductSection = ({ id }: Props) => {
	const { data: productDetail } = useQuery({
		queryKey: ['productDetails', id],
		queryFn: () => fetchProductInfo(id),
	});

	return (
		<section className={s.productDetailSection}>
			<h1 className={s.productDetailHeader}>{productDetail?.data.name}</h1>
			<Spacing margin="40px" />
			<main>
				<ProductDetailMain product={productDetail?.data as ProductInfo} />
			</main>
		</section>
	);
};

export default ProductSection;
