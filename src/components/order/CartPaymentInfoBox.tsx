import InfoBox from '../InfoBox';
import CartPaymentInfoItemBox from './CartPaymentInfoItemBox';

interface Props {
	totalAmount: number;
	userId: number;
}

const CartPaymentInfoBox = ({ totalAmount, userId }: Props) => {
	return (
		<div style={{ flex: '1' }}>
			<InfoBox
				title="결제 정보"
				info={<CartPaymentInfoItemBox totalAmount={totalAmount} userId={userId} />}
			/>
		</div>
	);
};

export default CartPaymentInfoBox;
