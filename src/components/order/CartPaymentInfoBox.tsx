import { Dispatch, SetStateAction } from 'react';
import InfoBox from '../InfoBox';
import CartPaymentInfoItemBox from './CartPaymentInfoItemBox';

interface Props {
	totalAmount: number;
	userId: number;
	selectedType: string;
	setSelectedType: Dispatch<SetStateAction<string>>;
}

const CartPaymentInfoBox = ({ totalAmount, userId, selectedType, setSelectedType }: Props) => {
	return (
		<div style={{ flex: '1' }}>
			<InfoBox
				title="결제 정보"
				info={
					<CartPaymentInfoItemBox
						totalAmount={totalAmount}
						userId={userId}
						selectedType={selectedType}
						setSelectedType={setSelectedType}
					/>
				}
			/>
		</div>
	);
};

export default CartPaymentInfoBox;
