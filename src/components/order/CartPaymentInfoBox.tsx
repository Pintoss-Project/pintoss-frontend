import InfoBox from '../InfoBox';
import CartPaymentInfoItemBox from './CartPaymentInfoItemBox';

interface Props {
	totalAmount: number;
}

const CartPaymentInfoBox = ({ totalAmount }: Props) => {
	return (
		<div style={{ flex: '1' }}>
			<InfoBox title="결제 정보" info={<CartPaymentInfoItemBox totalAmount={totalAmount} />} />
		</div>
	);
};

export default CartPaymentInfoBox;
