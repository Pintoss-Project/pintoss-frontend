'use client';

import { fetchPopularProductList } from '@/app/api/product/fetchPopularProductList';
import { Grid } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { useQuery } from '@tanstack/react-query';
import HomeProductBox from './HomeProductBox';
import * as s from './HomeStyle.css';

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomePopularProducts = () => {
	const { data: popularProductList } = useQuery({
		queryKey: ['popularProductList'],
		queryFn: fetchPopularProductList,
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
