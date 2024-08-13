import * as s from './CartStyle.css';
import InfoBox from '../InfoBox';
import CartOrdererInfoBox from './CartOrdererInfoBox';
import CartOrderInstructionInfoBox from './CartOrderInstructionInfoBox';
import { UserInfo } from '@/models/user';

interface Props {
	userInfo: UserInfo;
}

const CartOrderEtcInfoBox = ({ userInfo }: Props) => {
	return (
		<div className={s.cartOrderEtcInfoBox}>
			<InfoBox title="주문 안내사항" info={<CartOrderInstructionInfoBox />} />
			<InfoBox title="주문자 정보" info={<CartOrdererInfoBox userInfo={userInfo} />} />
		</div>
	);
};

export default CartOrderEtcInfoBox;
