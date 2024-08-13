import * as cs from '@/shared/styles/common.css';

import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';

const RegisterButton = () => {
	return (
		<div>
			<Button
				form="register-form"
				className={cs.darkBlueButton}
				color={vars.color.white}
				type="submit">
				회원가입
			</Button>
		</div>
	);
};

export default RegisterButton;
