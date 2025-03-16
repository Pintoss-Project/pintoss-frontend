import { Dispatch, SetStateAction } from 'react';
import InfoBox from '../InfoBox';
import CartPaymentInfoItemBox from './CartPaymentInfoItemBox';

interface Props {
	totalAmount: number;
	selectedType: string;
	setSelectedType: Dispatch<SetStateAction<string>>;
	orderItems: any[];
}

const CartPaymentInfoBox = ({ totalAmount, selectedType, setSelectedType, orderItems }: Props) => {
	return (
		<div style={{ flex: '1' }}>
			<InfoBox
				title="결제 정보"
				info={
					<CartPaymentInfoItemBox
						totalAmount={totalAmount}
						selectedType={selectedType}
						setSelectedType={setSelectedType}
						orderItems={orderItems}
					/>
				}
			/>
		</div>
	);
};

export default CartPaymentInfoBox;
