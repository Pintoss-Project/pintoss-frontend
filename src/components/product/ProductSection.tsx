'use client';

import * as s from './ProductDetailStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import ProductDetailMain from './ProductDetailMain';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/app/api/product/getProduct';
import { ProductInfo } from '@/models/product';

interface Props {
	id: number;
}

const ProductSection = ({ id }: Props) => {
	const { data: productDetail } = useQuery({
		queryKey: ['productDetails', id],
		queryFn: () => getProduct(id),
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
