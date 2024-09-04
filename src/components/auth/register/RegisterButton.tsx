import * as cs from '@/shared/styles/common.css';

import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';

interface Props {
	disabled: boolean;
}

const RegisterButton = ({ disabled }: Props) => {
	return (
		<div>
			<Button
				form="register-form"
				className={cs.darkBlueButton}
				color={vars.color.white}
				type="submit"
				disabled={disabled}>
				회원가입
			</Button>
		</div>
	);
};

export default RegisterButton;
