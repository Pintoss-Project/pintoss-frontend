import * as s from './ProductDetailStyle.css';
import { Flex } from '@/shared/components/layout';
import Image from 'next/image';
import { BookAndLifeLogo } from '../../../public/svgs';
import Spacing from '@/shared/components/layout/Spacing';
import ProductInstructionItem from './ProductInstructionItem';
import ProductDetailInfoBox from './ProductDetailInfoBox';
import ProductDetailSelectAndPayBox from './ProductDetailSelectAndPayBox';

const ProductDetailMain = () => {
	return (
		<Flex justify="space-between">
			<div style={{ width: '58%' }}>
				<div className={s.productDetailLogoImageBox}>
					<Flex
						justify="center"
						align="center"
						className={s.productDetailImageInnerBox}
						style={{ minHeight: '300px' }}>
						<Image
							src={BookAndLifeLogo}
							alt="상품권 로고 이미지"
							className={s.productDetailLogoImage}
						/>
					</Flex>
				</div>
				<Spacing margin="15px" />
				<div className={s.noticeBox}>
					<ProductInstructionItem text="구매하실 권종과 수량을 선태해주세요. 여러상품 구매시 장바구니를 이용해주세요" />
					<Spacing margin="18px" />
					<ProductInstructionItem text="구매후 발송되어 노출된 상품권은 교환/환불이 불가능합니다." />
					<Spacing margin="18px" />
					<ProductInstructionItem text="신규회원은 구매 제한이 있을 수 있습니다. 카카오채널 고객센터로 문의 바랍니다." />
					<Spacing margin="18px" />
					<ProductInstructionItem text="365일 24시간 발송되며 대표몰/카드몰/휴대폰몰에서 다양한 결제수단을 지원 합니다." />
				</div>
				<Spacing margin="15px" />
				<div className={s.noticeBox}>
					<Flex>
						<div className={s.darkerGrayText}>발행업체</div>
						<div className={s.darkGrayText}>(주)한국문화진흥</div>
					</Flex>
					<Spacing margin="10px" />
					<Flex>
						<div className={s.darkerGrayText}>홈페이지</div>
						<div className={s.darkGrayText}>https://cultureland.co.kr</div>
					</Flex>
					<Spacing margin="10px" />
					<Flex>
						<div className={s.darkerGrayText}>고객센터</div>
						<div className={s.darkGrayText}>1577-2111</div>
					</Flex>
					<Spacing margin="25px" />
					<ProductDetailInfoBox />
				</div>
			</div>
			<div style={{ width: '42%' }}>
				<ProductDetailSelectAndPayBox />
			</div>
		</Flex>
	);
};

export default ProductDetailMain;
