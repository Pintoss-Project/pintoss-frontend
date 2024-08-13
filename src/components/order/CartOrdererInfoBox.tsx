import Spacing from '@/shared/components/layout/Spacing';
import CartOrdererInfoItem from './CartOrdererInfoItem';
import * as s from './CartStyle.css';
import { UserInfo } from '@/models/user';

interface Props {
	userInfo: UserInfo;
}

const CartOrdererInfoBox = ({ userInfo }: Props) => {
	return (
		<>
			<Spacing margin="8px" />
			<div className={s.cartOrderInstructionInfoBox}>
				<div className={s.cartOrdererInfoInnerBox}>
					<CartOrdererInfoItem title="이름" value={userInfo?.name} />
					<div className={s.cartOrdererInfoDivider} />
					<CartOrdererInfoItem title="휴대폰" value={userInfo?.phone} />
					<div className={s.cartOrdererInfoDivider} />
					<CartOrdererInfoItem title="이메일" value={userInfo?.email} />
				</div>
			</div>
			<Spacing margin="30px" />
		</>
	);
};

export default CartOrdererInfoBox;
