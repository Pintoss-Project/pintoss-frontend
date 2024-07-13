import * as s from './HomeStyle.css';
import { Grid } from '@/shared/components/layout';
import HomeProductBox from './HomeProductBox';
import { vars } from '@/shared/styles/theme.css';

const SALE_PRODUCTS = [
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
	{
		id: 11,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: '/images/book-logo.png',
	},
	{ id: 12, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: '/images/nexon-logo.png' },
	{
		id: 13,
		code: 'olive',
		name: '올리브영 상품권',
		card: 5,
		phone: 0.2,
		icon: '/images/olive-logo.png',
	},
	{
		id: 14,
		code: 'happy',
		name: '해피머니 상품권',
		card: 2,
		phone: 0.5,
		icon: '/images/happy-logo.png',
	},
	{
		id: 21,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: '/images/book-logo.png',
	},
	{ id: 22, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: '/images/nexon-logo.png' },
	{
		id: 23,
		code: 'olive',
		name: '올리브영 상품권',
		card: 5,
		phone: 0.2,
		icon: '/images/olive-logo.png',
	},
	{
		id: 24,
		code: 'happy',
		name: '해피머니 상품권',
		card: 2,
		phone: 0.5,
		icon: '/images/happy-logo.png',
	},
];

const COLORS = [vars.color.lightRed, vars.color.blue, vars.color.green, vars.color.yellow];

const HomeProductsOnSale = () => {
	return (
		<Grid style={{ width: '100%' }} className={s.responsiveGrid}>
			{SALE_PRODUCTS.map((product, index) => (
				<HomeProductBox
					key={product.id}
					headerColor={COLORS[index % COLORS.length]}
					product={product}
				/>
			))}
		</Grid>
	);
};

export default HomeProductsOnSale;
