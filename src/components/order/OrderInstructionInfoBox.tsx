import Spacing from '@/shared/components/layout/Spacing';
import OrderInstructionItem from './OrderInstructionItem';
import * as s from './OrderStyle.css';

const OrderInstructionInfoBox = () => {
	return (
		<div className={s.orderInstructionInfoBox}>
			<OrderInstructionItem text="구매하실 권종과 수량을 선택해주세요. 여러상품 구매시 장바구니를 이용해주세요" />
			<Spacing margin="18px" />
			<OrderInstructionItem text="구매후 발송되어 노출된 상품권은 교환/환불이 불가능합니다." />
			<Spacing margin="18px" />
			<OrderInstructionItem text="신규회원은 구매 제한이 있을 수 있습니다. 카카오채널 고객센터로 문의 바랍니다." />
			<Spacing margin="18px" />
			<OrderInstructionItem text="365일 24시간 발송되어 대표몰/카드몰/휴대폰몰에서 다양한 결제수단을 지원 합니다." />
		</div>
	);
};

export default OrderInstructionInfoBox;
