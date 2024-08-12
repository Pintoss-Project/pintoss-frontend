'use client';

import * as s from './HomeStyle.css';
import { Grid } from '@/shared/components/layout';
import HomeProductBox from './HomeProductBox';
import { vars } from '@/shared/styles/theme.css';
import HomeProductMobileBox from './HomeProductMobileBox';
import { useQuery } from '@tanstack/react-query';
import { getSimpleProductList } from '@/app/api/product/getProductList';

interface Props {
	category: string;
}

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomeProductsOnSale = ({ category }: Props) => {
	const productCategory = category === 'ALL' ? undefined : category;

	const { data: products } = useQuery({
		queryKey: ['simpleProductList', productCategory],
		queryFn: () => getSimpleProductList(productCategory),
	});

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
