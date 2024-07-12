import * as s from './HomeStyle.css';
import { Grid } from '@/shared/components/layout';
import HomeProductBox from './HomeProductBox';
import { BookAndLifeLogo, HappyMoneyLogo, NexonLogo, OliveYoungLogo } from '../../../public/svgs';
import { vars } from '@/shared/styles/theme.css';

const SALE_PRODUCTS = [
	{
		id: 1,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: BookAndLifeLogo,
	},
	{ id: 2, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: NexonLogo },
	{ id: 3, code: 'olive', name: '올리브영 상품권', card: 5, phone: 0.2, icon: OliveYoungLogo },
	{ id: 4, code: 'happy', name: '해피머니 상품권', card: 2, phone: 0.5, icon: HappyMoneyLogo },
	{
		id: 11,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: BookAndLifeLogo,
	},
	{ id: 12, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: NexonLogo },
	{ id: 13, code: 'olive', name: '올리브영 상품권', card: 5, phone: 0.2, icon: OliveYoungLogo },
	{ id: 14, code: 'happy', name: '해피머니 상품권', card: 2, phone: 0.5, icon: HappyMoneyLogo },
	{
		id: 21,
		code: 'book-life',
		name: '북앤라이프 도서상품권',
		card: 3,
		phone: 0,
		icon: BookAndLifeLogo,
	},
	{ id: 22, code: 'nexon', name: '넥슨카드', card: 2, phone: 1, icon: NexonLogo },
	{ id: 23, code: 'olive', name: '올리브영 상품권', card: 5, phone: 0.2, icon: OliveYoungLogo },
	{ id: 24, code: 'happy', name: '해피머니 상품권', card: 2, phone: 0.5, icon: HappyMoneyLogo },
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
