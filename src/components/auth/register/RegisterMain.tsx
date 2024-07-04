import { Divider } from '@/shared/components/layout';
import RegisterInfoBox from './RegisterInfoBox';
import { vars } from '@/shared/styles/theme.css';

const RegisterMain = () => {
	return (
		<div>
			<RegisterInfoBox subTitle="약관동의" info="" />
			<Divider color={vars.color['lighter-gray']} size={1} />
			<RegisterInfoBox subTitle="계정정보" info="" />
			<Divider color={vars.color['lighter-gray']} size={1} />
			<RegisterInfoBox subTitle="회원 개인정보" info="" />
		</div>
	);
};

export default RegisterMain;
