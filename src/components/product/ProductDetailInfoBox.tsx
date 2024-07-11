import * as s from './ProductDetailStyle.css';
import { Flex } from '@/shared/components/layout';

const ProductDetailInfoBox = () => {
	return (
		<div>
			<Flex>
				<Flex justify="center" align="center" className={s.leftTabMenuBox}>
					상품정보
				</Flex>
				<Flex justify="center" align="center" className={s.rightTabMenuBox}>
					유의사항
				</Flex>
			</Flex>
			<div className={s.productInfoListBox}></div>
		</div>
	);
};

export default ProductDetailInfoBox;
