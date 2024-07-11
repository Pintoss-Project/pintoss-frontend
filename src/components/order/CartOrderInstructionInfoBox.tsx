import Spacing from '@/shared/components/layout/Spacing';
import * as s from './CartStyle.css';

import OrderInstructionItem from './OrderInstructionItem';

const CartOrderInstructionInfoBox = () => {
	return (
		<>
			<Spacing margin="8px" />
			<div className={s.cartOrderInstructionInfoBox}>
				<OrderInstructionItem text="카드결제는 일시불만 가능합니다." />
				<Spacing margin="8px" />
				<p className={s.smallGrayText}>카드사 정책상 상품권은 할부 결제가 불가능합니다.</p>
				<Spacing margin="12px" />
				<OrderInstructionItem text="카드결제 월 한도는 카드 1개당 100만원입니다." />
				<Spacing margin="8px" />
				<p className={s.smallGrayText}>신용카드가 여러개이면 추가결제 가능합니다.</p>
				<Spacing margin="12px" />
				<OrderInstructionItem text="본인 사용 목적으로 구매하셔합니다." />
			</div>
			<Spacing margin="30px" />
		</>
	);
};

export default CartOrderInstructionInfoBox;
