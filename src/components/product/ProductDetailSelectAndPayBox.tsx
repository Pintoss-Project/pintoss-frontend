'use client';

import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './ProductDetailStyle.css';
import { Flex } from '@/shared/components/layout';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import PaymentMethodSelectBox from '../order/PaymentMethodSelectBox';
import ConfirmAndPayTheAmountBox from '../order/ConfirmAndPayTheAmountBox';
import { useEffect, useState } from 'react';
import ProductSelectBox from './ProductSelectBox';
import QuantitySelectBox from './QuantitySelectBox';

const ProductDetailSelectAndPayBox = () => {
	const [selectedType, setSelectedType] = useState<string>('card');
	const [saleRate, setSaleRate] = useState(0);
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [totalAmount, _] = useState(0);

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? 1.2 : 0);
	}, [selectedType]);

	return (
		<div className={s.productDetailSelectAndPayBox}>
			<div>
				<div className={s.darkerGrayText} style={{ fontSize: '16px' }}>
					상품 선택
				</div>
				<Spacing margin="9px" />
				<ProductSelectBox />
			</div>
			<Spacing margin="30px" />
			<div>
				<div className={s.darkerGrayText} style={{ fontSize: '16px' }}>
					수량 선택
				</div>
				<QuantitySelectBox />
			</div>
			<Spacing margin="30px" />
			<PaymentMethodSelectBox selectedType={selectedType} setSelectedType={setSelectedType} />
			<Spacing margin="30px" />
			<ConfirmAndPayTheAmountBox
				selectedType={selectedType}
				saleRate={saleRate}
				totalAmount={totalAmount}
			/>
			<Spacing margin="15px" />
			<Flex justify="space-between" className={s.totalPayInfoBox}>
				<span className={s.whiteBoldText} style={{ fontWeight: '400' }}>
					최종 결제 금액
				</span>
				<span className={s.whiteBoldText} style={{ fontWeight: '600' }}>
					{Number('9880').toLocaleString()}원
				</span>
			</Flex>
			<Spacing margin="15px" />
			<Flex style={{ width: '100%' }}>
				<Button
					color={vars.color.white}
					className={cs.lightBlueButton}
					style={{ fontSize: '18px', height: '60px' }}>
					바로 구매
				</Button>
				<div style={{ margin: '0 3px' }}></div>
				<Button color={vars.color.white} className={cs.lightGrayButton} style={{ height: '60px' }}>
					장바구니 담기
				</Button>
			</Flex>
		</div>
	);
};

export default ProductDetailSelectAndPayBox;
