'use client';

import { fetchSimpleProductList } from '@/controllers/product/fetchSimpleProductList';
import { Grid } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { useQuery } from '@tanstack/react-query';
import HomeProductBox from './HomeProductBox';
import HomeProductMobileBox from './HomeProductMobileBox';
import * as s from './HomeStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';
import { apiClient } from '@/controllers/new-api-service';

interface Props {
	category: string;
}

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomeProductsOnSale = ({ category }: Props) => {
	const productCategory = category === 'ALL' ? undefined : category;

	const { data: products, isLoading } = useQuery({
		queryKey: ['provider-list', productCategory],
		// queryFn: () => fetchSimpleProductList(productCategory),
		queryFn: () => apiClient.getAllProviders(),
	});

	if (isLoading) return <Spinner />;

	return (
		<>
			<div className={s.homeProductBoxWrap}>
				<Grid style={{ width: '100%' }} className={s.responsiveGrid}>
					{products?.data.map((product, index) => (
						<HomeProductBox
							key={product.id}
							headerColor={COLORS[index % COLORS.length]}
							product={product}
						/>
					))}
				</Grid>
			</div>
			<div className={s.homeProductMobileBoxWrap}>
				<Grid style={{ width: '100%' }} className={s.mobileBoxResponsiveGrid}>
					{products?.data.map((product, index) => (
						<HomeProductMobileBox
							key={product.id}
							headerColor={COLORS[index % COLORS.length]}
							product={product}
						/>
					))}
				</Grid>
			</div>
		</>
	);
};

export default HomeProductsOnSale;
