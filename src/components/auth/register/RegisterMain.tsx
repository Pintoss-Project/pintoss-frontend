import { Divider } from '@/shared/components/layout';
import RegisterInfoBox from './RegisterInfoBox';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';

const RegisterMain = () => {
	return (
		<div>
			<Spacing margin="73px" />
			<RegisterInfoBox subTitle="약관동의" info="" />
			<Divider color={vars.color['lighter-gray']} size={1} />
			<Spacing margin="40px" />
			<RegisterInfoBox subTitle="계정정보" info="" />
			<Divider color={vars.color['lighter-gray']} size={1} />
			<Spacing margin="40px" />
			<RegisterInfoBox subTitle="회원 개인정보" info="" />
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterMain;
