import * as s from './ResponsiveStyle.css';
import { Grid } from '@/shared/components/layout';
import { BookAndLifeLogo } from '../../../public/svgs';
import MobileProductBox from './MobileProductBox';
import { useQuery } from '@tanstack/react-query';
import { getSimpleProductList } from '@/app/api/product/getProductList';

const MobileProducts = () => {
	const { data: products } = useQuery({
		queryKey: ['simpleProductList'],
		queryFn: () => getSimpleProductList(),
	});

	return (
		<div className={s.gridWrap}>
			<Grid className={s.responsiveGrid}>
				{products?.data.map((product) => (
					<MobileProductBox key={product.id} name={product.name} image={'/images/book-logo.png'} />
				))}
			</Grid>
		</div>
	);
};

export default MobileProducts;
