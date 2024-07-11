import Spacing from '@/shared/components/layout/Spacing';
import RegisterAcceptTermsBox from './RegisterAcceptTermsBox';

const RegisterAcceptTermsInfo = () => {
	return (
		<div>
			<RegisterAcceptTermsBox label="핀토스 이용약관" />
			<Spacing margin="25px" />
			<RegisterAcceptTermsBox label="개인정보 처리방침" />
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterAcceptTermsInfo;
