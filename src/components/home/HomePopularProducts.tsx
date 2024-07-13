import { Grid } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import HomeProductBox from './HomeProductBox';
import * as s from './HomeStyle.css';

const POPULAR_PRODUCTS = [
	{
		id: 1,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: '/images/book-logo.png',
	},
	{ id: 2, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: '/images/nexon-logo.png' },
	{
		id: 3,
		code: 'olive',
		name: '올리브영 상품권',
		card: 5,
		phone: 0.2,
		icon: '/images/olive-logo.png',
	},
	{
		id: 4,
		code: 'happy',
		name: '해피머니 상품권',
		card: 2,
		phone: 0.5,
		icon: '/images/happy-logo.png',
	},
];

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomePopularProducts = () => {
	return (
		<Grid style={{ width: '100%' }} className={s.responsiveGrid}>
			{POPULAR_PRODUCTS.map((product, index) => (
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
