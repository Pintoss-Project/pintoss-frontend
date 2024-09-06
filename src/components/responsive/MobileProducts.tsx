import { fetchSimpleProductList } from '@/app/api/product/fetchSimpleProductList';
import { Grid } from '@/shared/components/layout';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import MobileProductBox from './MobileProductBox';
import * as s from './ResponsiveStyle.css';

interface Props {
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileProducts = ({ setIsMenuOpen }: Props) => {
	const { data: products } = useQuery({
		queryKey: ['simpleProductList'],
		queryFn: () => fetchSimpleProductList(),
	});

	return (
		<div className={s.gridWrap}>
			<Grid className={s.responsiveGrid}>
				{products?.data.map((product) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						style={{ color: 'black', textDecoration: 'none' }}
						onClick={() => setIsMenuOpen(false)}>
						<MobileProductBox name={product.name} image={'/images/book-logo.png'} />
					</Link>
				))}
			</Grid>
		</div>
	);
};

export default MobileProducts;
