import Spacing from '@/shared/components/layout/Spacing';
import CartOrdererInfoItem from './CartOrdererInfoItem';
import * as s from './CartStyle.css';

const CartOrdererInfoBox = () => {
	return (
		<>
			<Spacing margin="8px" />
			<div className={s.cartOrderInstructionInfoBox}>
				<div className={s.cartOrdererInfoInnerBox}>
					<CartOrdererInfoItem title="이름" value="홍길동" />
					<div className={s.cartOrdererInfoDivider} />
					<CartOrdererInfoItem title="휴대폰" value="010-1234-5678" />
					<div className={s.cartOrdererInfoDivider} />
					<CartOrdererInfoItem title="이메일" value="abc@gmail.com" />
				</div>
			</div>
			<Spacing margin="30px" />
		</>
	);
};

export default CartOrdererInfoBox;
