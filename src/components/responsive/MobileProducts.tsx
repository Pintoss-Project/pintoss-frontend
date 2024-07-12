import * as s from './ResponsiveStyle.css';
import { Grid } from '@/shared/components/layout';
import { BookAndLifeLogo } from '../../../public/svgs';
import MobileProductBox from './MobileProductBox';

const PRODUCTS = [
	{ id: 1, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 2, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 3, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 4, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 5, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 6, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 7, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 8, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 9, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 10, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 11, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 12, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 13, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 14, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 15, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
	{ id: 16, image: BookAndLifeLogo, name: '북앤라이프 도서상품권' },
];

const MobileProducts = () => {
	return (
		<div className={s.gridWrap}>
			<Grid className={s.responsiveGrid}>
				{PRODUCTS.map((product) => (
					<MobileProductBox key={product.id} name={product.name} image={product.image} />
				))}
			</Grid>
		</div>
	);
};

export default MobileProducts;
