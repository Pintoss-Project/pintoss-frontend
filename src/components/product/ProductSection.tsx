import { ReactNode } from 'react';
import * as s from './ProductDetailStyle.css';
import Spacing from '@/shared/components/layout/Spacing';

interface Props {
	header: string;
	main: ReactNode;
}

const headerMap: Record<string, string> = {
	'book-life': '북앤라이프 도서상품권',
	'nexon': '넥슨카드',
	'olive': '올리브영 상품권',
	'happy': '해피머니 상품권',
};

const ProductSection = ({ header, main }: Props) => {
	return (
		<section className={s.productDetailSection}>
			<h1 className={s.productDetailHeader}>{headerMap[header]}</h1>
			<Spacing margin="40px" />
			<main>{main}</main>
		</section>
	);
};

export default ProductSection;
