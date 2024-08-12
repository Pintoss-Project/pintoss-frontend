'use client';

import { Grid } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import HomeProductBox from './HomeProductBox';
import * as s from './HomeStyle.css';
import { useQuery } from '@tanstack/react-query';
import { getPopularProduct } from '@/app/api/product/getProductList';

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomePopularProducts = () => {
	const { data: popularProductList } = useQuery({
		queryKey: ['popularProductList'],
		queryFn: getPopularProduct,
	});

	return (
		<Grid style={{ width: '100%' }} className={s.responsiveGrid}>
			{popularProductList?.data.map((product, index) => (
				<HomeProductBox
					key={product.id}
					headerColor={COLORS[index % COLORS.length]}
					product={product}
				/>
			))}
		</Grid>
	);
};

export default HomePopularProducts;
