'use client';

import { fetchProductInfo } from '@/app/api_n/product/fetchProductInfo';
import { ProductInfo } from '@/models/product';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import ProductDetailMain from './ProductDetailMain';
import * as s from './ProductDetailStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';

interface Props {
	id: number;
}

const ProductSection = ({ id }: Props) => {
	const { data: productDetail, isLoading } = useQuery({
		queryKey: ['productDetails', id],
		queryFn: () => fetchProductInfo(id),
	});

	if (isLoading) return <Spinner />;

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
