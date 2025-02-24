type OrderData = {
	[key: string]: string | number | boolean; // orderData는 문자열, 숫자, 또는 불리언 값을 가질 수 있는 객체
};

interface HiddenInputsProps {
	orderData: OrderData; // HiddenInputs 컴포넌트의 props
}

const HiddenInputs: React.FC<HiddenInputsProps> = ({ orderData }) => (
	<>
		{Object.entries(orderData).map(([key, value]) => (
			<input key={key} type="hidden" name={key} value={String(value)} />
		))}
	</>
);

export default HiddenInputs;
