import InfoBox from '../InfoBox';
import CartOrdererInfoBox from './CartOrdererInfoBox';
import CartOrderInstructionInfoBox from './CartOrderInstructionInfoBox';

const CartOrderEtcInfoBox = () => {
	return (
		<div style={{ flex: '1', marginRight: '20px' }}>
			<InfoBox title="주문 안내사항" info={<CartOrderInstructionInfoBox />} />
			<InfoBox title="주문자 정보" info={<CartOrdererInfoBox />} />
		</div>
	);
};

export default CartOrderEtcInfoBox;
