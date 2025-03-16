'use client';

import { fetchProductInfo } from '@/controllers/product/fetchProductInfo';
import { ProductInfo } from '@/models/product';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import ProductDetailMain from './ProductDetailMain';
import * as s from './ProductDetailStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';
import { apiClient } from '@/controllers/new-api-service';
import { useMemo } from 'react';
import { VoucherProviderListResponse } from '@/types/api';
import usePaymentScript from './hooks/usePaymentScript';

interface Props {
	id: number;
}

const ProductSection = ({ id }: Props) => {

	const { data: products, isLoading } = useQuery({
		queryKey: ['provider-list'],
		queryFn: () => apiClient.getAllProviders(),
	});

	const productDetail = useMemo(() => {
		return products?.data.find((product: VoucherProviderListResponse) => product.id === id);
	}, [products, id]);

	usePaymentScript();

	return (
		<section className={s.productDetailSection}>
			<h1 className={s.productDetailHeader}>{productDetail?.name}</h1>
			<Spacing margin="40px" />
			{isLoading && <Spinner />}
			<main>
				{productDetail && <ProductDetailMain product={productDetail as VoucherProviderListResponse} />}
			</main>
		</section>
	);
};

export default ProductSection;
